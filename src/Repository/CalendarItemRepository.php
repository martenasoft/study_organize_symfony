<?php

namespace App\Repository;

use App\Entity\Calendar;
use App\Entity\CalendarItem;
use App\Entity\Interfaces\StatusInterface;
use App\Entity\User;
use App\Repository\Traits\TraitRepositoryGetQueryBuilderByUser;
use App\Service\DateFormatService;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Form\Form;

class CalendarItemRepository extends ServiceEntityRepository
{
    use TraitRepositoryGetQueryBuilderByUser;

    private DateFormatService $dateFormatService;

    public function __construct(
        ManagerRegistry $registry,
        DateFormatService $dateFormatService
    ) {
        $this->setAlias('ci');
        parent::__construct($registry, CalendarItem::class);
        $this->dateFormatService = $dateFormatService;
    }

    public function getItemsByUserQueryBuilder(User $user, Form $calendarFilterType): QueryBuilder
    {
        $queryBuilder = $this->getAllQueryBuilder();
        $queryBuilder
            ->addSelect('c')
            ->innerJoin($this->getAlias() . ".calendar", "c")
            ->innerJoin("c.user", "u")
            ->addSelect('u')
            ->andWhere('c.user=:user')
            ->setParameter("user", $user);

        if ($calendarFilterType->isSubmitted() && $calendarFilterType->isValid()) {
            $data = $calendarFilterType->getData();
            if (!empty($data->getCalendar())) {
                $ids = [];
                $data->getCalendar()->map(
                    function (Calendar $calendar) use (&$ids) {
                        $ids[] = $calendar->getId();
                    }
                );

                if (!empty($ids)) {
                    $queryBuilder
                        ->andWhere("c.id IN (:calendarIds)")
                        ->setParameter('calendarIds', $ids);
                }
                $ids = null;
            }

            if (!empty($data->getTitle())) {
                $queryBuilder
                    ->andWhere($this->getAlias() . '.title LIKE :title')
                    ->setParameter("title", $data->getTitle() . "%");
            }

            if (!empty($data->getDateStartEnd())) {
                $dateResult = $this->dateFormatService->dateTimeRangeToDateObjectArray($data->getDateStartEnd());
                if (!empty($dateResult['start']) && !empty($dateResult['end'])) {
                    $queryBuilder
                        ->andWhere($this->getAlias() . '.start>=:start AND ' . $this->getAlias() . '.end<=:end')
                        ->setParameter("start", $dateResult['start'])
                        ->setParameter("end", $dateResult['end']);
                }
            }
        }

        return $queryBuilder;
    }

    public function getLoadItems(
        ?User $user = null,
        ?array $calendar = null,
        ?\DateTimeInterface $start = null,
        ?\DateTimeInterface $end = null
    ): QueryBuilder {
        $queryBuilder = $this
            ->getAllQueryBuilder()
            ->innerJoin($this->getAlias() . '.calendar', 'c')
            ->addSelect('c')
            ->andWhere($this->getAlias() . ".status=:status")
            ->setParameter("status", StatusInterface::STATUS_ACTIVE);

        if (!empty($user)) {
            $queryBuilder
                ->innerJoin('c.user', 'u')
                ->addSelect('u')
                ->andWhere('c.user=:user')
                ->setParameter('user', $user);
        }

        if (!empty($calendar)) {
            $queryBuilder
                ->andWhere($this->getAlias() . ".calendar IN(:calendar)")
                ->setParameter('calendar', $calendar);
        }

        if (!empty($start)) {
            $queryBuilder
                ->andWhere($this->getAlias() . '.start>=:date1')
                ->setParameter('date1', $start);
        }

        if (!empty($end)) {
            $queryBuilder
                ->andWhere($this->getAlias() . '.start<=:date2')
                ->setParameter('date2', $end);
        }

        return $queryBuilder;
    }

    public function filterByReplace(QueryBuilder $queryBuilder): QueryBuilder
    {
        $alias = $this->getAlias();
        $queryBuilder
            ->andWhere("({$alias}.replaceType = :REPLACE_TYPE_NO")
            ->setParameter('REPLACE_TYPE_NO', CalendarItem::REPLACE_TYPE_NO)
            ->orWhere("{$alias}.replaceType = :REPLACE_TYPE_DAILY")
            ->setParameter('REPLACE_TYPE_DAILY', CalendarItem::REPLACE_TYPE_DAILY)
/*            ->orWhere("({$alias}.replaceType = :REPLACE_TYPE_IN_ONE_DAY AND DAYOFWEEK({$alias}.start) % 2 = 0 )")
            ->setParameter('REPLACE_TYPE_IN_ONE_DAY', CalendarItem::REPLACE_TYPE_IN_ONE_DAY)*/
            ->orWhere("({$alias}.replaceType = :REPLACE_TYPE_WORK_DAYS AND DAYOFWEEK({$alias}.start) <=5 )")
            ->setParameter('REPLACE_TYPE_WORK_DAYS', CalendarItem::REPLACE_TYPE_WORK_DAYS)
            ->orWhere("({$alias}.replaceType = :REPLACE_TYPE_WEEK_END AND DAYOFWEEK({$alias}.start) > 5 ))")
            ->setParameter('REPLACE_TYPE_WEEK_END', CalendarItem::REPLACE_TYPE_WEEK_END)
       /*     ->orWhere(
                "({$alias}.replaceType = :REPLACE_TYPE_IN_ONE_MONTH AND DATEFORMAT({$alias}.start, ':y') = DATEFORMAT(':now', ':y') )) "
            )
            ->setParameter('REPLACE_TYPE_IN_ONE_MONTH', CalendarItem::REPLACE_TYPE_IN_ONE_MONTH)
            ->setParameter('y', '%Y')
            ->setParameter('now', 'NOW()')*/

        ;
        return $queryBuilder;
    }
}
