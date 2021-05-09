<?php

namespace App\Service;

use App\Entity\CalendarItem;
use App\Entity\DailyChecklist;
use App\Entity\User;
use App\Repository\CalendarItemChecklistTagsRepository;
use App\Repository\ChecklistRepository;
use App\Repository\DailyChecklistRepository;

class CheckListCalendarItemService
{
    private CalendarItemChecklistTagsRepository $calendarItemChecklistTagsRepository;
    private DailyChecklistRepository $dailyChecklistRepository;
    private ChecklistRepository $checklistRepository;

    public function __construct(
        ChecklistRepository $checklistRepository,
        DailyChecklistRepository $dailyChecklistRepository,
        CalendarItemChecklistTagsRepository $calendarItemChecklistTagsRepository
    ) {
        $this->checklistRepository = $checklistRepository;
        $this->dailyChecklistRepository = $dailyChecklistRepository;
        $this->calendarItemChecklistTagsRepository = $calendarItemChecklistTagsRepository;
    }

    public function getHashTagItems(User $user, CalendarItem $calendarItem, int $limit = 10): ?array
    {
        return $this
            ->calendarItemChecklistTagsRepository
            ->getItemsByUserAndCalendarItemsQueryBuilder($user, $calendarItem)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }

    public function getChecklistLength(User $user, array $hashItems): int
    {
        $queryBuilder = $this
            ->checklistRepository
            ->getChecklistItemsByTagsArrayQueryBuilder($user, $hashItems);

        if (empty($queryBuilder)) {
            return 0;
        }

        return (int)
            $queryBuilder
            ->select("COUNT(".$this->checklistRepository->getAlias().")")
            ->getQuery()
            ->getSingleScalarResult()
            ;
    }

    public function getChecklistItems(User $user, array $hashItems, int $limit = 10): ?array
    {
        $queryBuilder = $this
            ->checklistRepository
            ->getChecklistItemsByTagsArrayQueryBuilder($user, $hashItems)
            ->setMaxResults($limit)
        ;

        if ($queryBuilder !== null) {
            return $queryBuilder->getQuery()->getResult();
        }

        return null;
    }

    public function getDailyChecklistsByTag(
        User $user,
        ?int $startTimestamp = null,
        ?int $endTimestamp = null
    ): ?array {

        return $this
            ->dailyChecklistRepository
            ->getByUserQueryBuilder(
                $user,
                DailyChecklist::CHECK_LIST_TYPE,
                !empty($startTimestamp) ? (new \DateTime())->setTimestamp($startTimestamp) : null,
                !empty($endTimestamp) ? (new \DateTime())->setTimestamp($endTimestamp) : null,
                $this
                    ->dailyChecklistRepository
                    ->getAlias() .'.recordId')
            ->getQuery()
            ->getResult();
    }
}