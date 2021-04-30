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

    public function __construct(ManagerRegistry $registry, DateFormatService $dateFormatService)
    {
        $this->setAlias('ci');
        parent::__construct($registry, CalendarItem::class);
        $this->dateFormatService = $dateFormatService;
    }

    public function getItemsByUserQueryBuilder(User $user, Form $calendarFilterType): QueryBuilder
    {
        $queryBuilder = $this->getAllQueryBuilder();
        $queryBuilder
            ->addSelect('c')
            ->innerJoin($this->getAlias().".calendar", "c")

            ->innerJoin("c.user", "u")
            ->addSelect('u')
            ->andWhere('c.user=:user')
            ->setParameter("user", $user)
        ;

        if ($calendarFilterType->isSubmitted() && $calendarFilterType->isValid()) {
            $data = $calendarFilterType->getData();
            if (!empty($data->getCalendar())) {
                $ids = [];
                $data->getCalendar()->map(function(Calendar $calendar) use (&$ids) {
                    $ids[] = $calendar->getId();
                });

                if (!empty($ids)) {
                    $queryBuilder
                        ->andWhere("c.id IN (:calendarIds)")
                        ->setParameter('calendarIds', $ids)
                    ;
                }
                $ids = null;
            }

            if (!empty($data->getTitle())) {
                $queryBuilder
                    ->andWhere($this->getAlias().'.title LIKE :title')
                    ->setParameter("title", $data->getTitle()."%")
                ;
            }

            if (!empty($data->getDateStartEnd())) {
                $dateResult = $this->dateFormatService->dateTimeRangeToDateObjectArray($data->getDateStartEnd());
                if (!empty($dateResult['start']) && !empty($dateResult['end'])) {
                    $queryBuilder
                        ->andWhere($this->getAlias().'.start>=:start AND '.$this->getAlias().'.end<=:end')
                        ->setParameter("start", $dateResult['start'])
                        ->setParameter("end", $dateResult['end'])
                    ;
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
            ->join($this->getAlias().'.calendar', 'calendar')

            ->andWhere($this->getAlias().".status=:status")
            ->setParameter("status", StatusInterface::STATUS_ACTIVE);

        if (!empty($user)) {
            $queryBuilder
                ->join('calendar.user', 'user')
                ->andWhere('user=:user')
                ->setParameter('user', $user)
            ;
        }
        if (!empty($calendar)) {
            $queryBuilder
                ->andWhere($this->getAlias() .".calendar IN(:calendar)")
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
}
