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
        ?\DateTimeInterface $end = null,
        ?callable $queryBuildUserFunction = null
    ): array {
        $queryBuilder = $this->getLoadItemsQueryBuilder($user, $calendar, $start, $end);
        $startDateTime = (!empty($start) ? clone $start : (new \DateTime())->modify("- 10 year"));

        $startDateTime->setTime(0, 0, 0);
        $endDateTime = (!empty($end) ? clone $end : (new \DateTime('now'))->modify("+10 year"));
        $endDateTime->setTime(23, 59, 59);
        $diff = $endDateTime->diff($startDateTime);
        $ret = [];

        if ($queryBuildUserFunction !== null) {
            $queryBuildUserFunction($queryBuilder, $this->getAlias());
        }

        $items = $queryBuilder->getQuery()->getResult();

        for ($i = 0; $i < $diff->days; $i++) {
            $dateTimeC = clone $startDateTime;
            $dateTimeC->modify("+$i day");
            $uModifyCurrent = $dateTimeC->format('U');
            $dayOfWeekModifyCurrent = $dateTimeC->format('w');


            foreach ($items as $item) {
                $itemData = [
                    "id" => $item->getId(),
                    "calendarId" => $item->getCalendar()->getId(),
                    "calendarTitle" => $item->getCalendar()->getTitle(),
                    "title" => $item->getTitle(),
                    "tagsCount" => $item->getTagsCount(),
                    "color" => (!empty($item->getColor()) ? $item->getColor() : $item->getCalendar()->getColor()),
                    "calendarColor" => $item->getCalendar()->getColor(),
                    "textColor" => (!empty($item->getTextColor()) ? $item->getTextColor() : $item->getCalendar()->getTextColor()),
                    "calendarTextColor" => $item->getCalendar()->getTextColor(),

                    "about" => $item->getAbout(),
                    "className" => "label-important",
                    "start" => $item->getStart()->format('Y-m-d H:i:s'),
                    "end" => $item->getEnd()->format('Y-m-d H:i:s'),
                ];

                $uStart = $item->getStart()->format('U');
                $dayOfWeekStart = $item->getStart()->format('w');

                $isDateIntervalOnly = ($item->getReplaceType() == CalendarItem::REPLACE_TYPE_NO);

                $isDaily = ($item->getReplaceType() == CalendarItem::REPLACE_TYPE_DAILY);

                $isWorkDays = ($item->getReplaceType() == CalendarItem::REPLACE_TYPE_WORK_DAYS);

                $isInOnDays = ($item->getReplaceType() == CalendarItem::REPLACE_TYPE_IN_ONE_DAY);

                $isWeekendDay = ($item->getReplaceType() == CalendarItem::REPLACE_TYPE_WEEK_END);
                $isInOneMonth = ($item->getReplaceType() == CalendarItem::REPLACE_TYPE_IN_ONE_MONTH);

                if ($isDateIntervalOnly && empty($ret[$uStart])) {
                    $ret[$uStart] = $itemData;
                } elseif ($isDaily || $isWorkDays || $isInOnDays || $isWeekendDay || $isInOneMonth) {

                    $newDateStart = clone $item->getStart();
                    $newDateEnd = clone $item->getEnd();

                    if (!$isDateIntervalOnly && !$isInOneMonth) {
                        $itemData['start'] = $newDateStart->setDate(
                            $dateTimeC->format('Y'),
                            $dateTimeC->format('m') ,
                            $dateTimeC->format('d')
                        )->format('Y-m-d H:i:s');


                        $itemData['end'] = $newDateEnd->setDate(
                            $dateTimeC->format('Y'),
                            $dateTimeC->format('m'),
                            $dateTimeC->format('d')
                        )->format('Y-m-d H:i:s');
                    } elseif ($isInOneMonth) {
                        $itemData['start'] = $newDateStart->setDate(
                            $dateTimeC->format('Y'),
                            $dateTimeC->format('m') + ($isInOneMonth ? 1 : 0),
                            $newDateStart->format('d')
                        )->format('Y-m-d H:i:s');


                        $itemData['end'] = $newDateEnd->setDate(
                            $dateTimeC->format('Y'),
                            $dateTimeC->format('m') + ($isInOneMonth ? 1 : 0),
                            $newDateEnd->format('d')
                        )->format('Y-m-d H:i:s');

                        $key = $item->getId().'-'.$itemData['start'].'-'.$itemData['end'];
                        if (empty($ret[$key])) {
                            $ret[$key] = $itemData;
                        }
                    }

                    if ($isInOnDays) {

                        $key = $item->getId().'-'.$itemData['start'];

                        if (empty($ret[$key])) {

                            $itemData['$key'] = $key;
                            $itemData['$dayOfWeekModifyCurrent'] = $dayOfWeekModifyCurrent;
                            $itemData['$dayOfWeekStart'] =$dayOfWeekStart;

                           //  $ret[] = $itemData;
                            if ($dayOfWeekStart % 2 == 0 && $dayOfWeekModifyCurrent % 2 == 0) {
                                $ret[$key] = $itemData;
                            }

                            if ($dayOfWeekStart % 2 == 1 && $dayOfWeekModifyCurrent % 2 == 1) {
                                $ret[$key] = $itemData;
                            }

                        }
                    }

                    if (!$isInOneMonth && !$isInOnDays && ($isDaily ||
                            ($isWorkDays && $dayOfWeekModifyCurrent > 0 && $dayOfWeekModifyCurrent < 6) ||
                            ($isWeekendDay && $dayOfWeekModifyCurrent == 0 || $dayOfWeekModifyCurrent == 6) )
                    ) {

                        $ret[] = $itemData;
                    }

                }
            }
        }

        return array_values($ret);
    }

    public function getLoadItemsQueryBuilder(
        ?User $user = null,
        ?array $calendar = null,
        ?\DateTimeInterface $start = null,
        ?\DateTimeInterface $end = null
    ): QueryBuilder {

        $alias = $this->getAlias();

        $queryBuilder = $this
            ->getAllQueryBuilder()
            ->innerJoin(  "{$alias}.calendar", 'c')
            ->addSelect('c')
            ->andWhere("{$alias}.status=:status");

        if (!empty($end)) {
            $queryBuilder->andWhere("{$alias}.createdAt<=:createdAt")
            ->setParameter('createdAt', (clone $end)->setTime(0,0));
        }

        $queryBuilder->setParameter("status", StatusInterface::STATUS_ACTIVE);


        if (!empty($user)) {
            $queryBuilder
                ->innerJoin('c.user', 'u')
                ->addSelect('u')
                ->andWhere('c.user=:user')
                ->setParameter('user', $user);
        }

        if (!empty($calendar)) {
            $queryBuilder
                ->andWhere("{$alias}.calendar IN(:calendar)")
                ->setParameter('calendar', $calendar);
        }

        if (!empty($start) && !empty($end)) {
            $queryBuilder->andWhere("(({$alias}.start>=:date1 AND {$alias}.start<=:date2) OR {$alias}.replaceType > 0)" );
            $queryBuilder->setParameter('date1', $start);
            $queryBuilder->setParameter('date2', $end);
        }

        if (!empty($start) && empty($end)) {
            $queryBuilder->andWhere("({$alias}.start>=:date1 OR {$alias}.replaceType > 0)" );
            $queryBuilder->setParameter('date1', $start);
        }

        if (empty($start) && !empty($end)) {
            $queryBuilder->andWhere("({$alias}.start<=:date2 OR {$alias}.replaceType > 0)" );
            $queryBuilder->setParameter('date2', $end);
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
