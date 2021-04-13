<?php

namespace App\Controller\Traits;

use App\Entity\Calendar;
use App\Entity\User;
use App\Repository\CalendarRepository;
use Doctrine\ORM\QueryBuilder;

trait TraitGetCalendarItems
{
    private bool $isShowCalendarItemsActiveOnly = true;

    public function getCalendarQueryBuilder(
        User $user,
        ?QueryBuilder $queryBuilder = null,
        ?string $indexBy = null
    ): QueryBuilder
    {

        $queryBuilder = $this
            ->getCalendarRepository()
            ->getQueryBuilderByUser($user, $queryBuilder, $indexBy);

        if ($this->isShowCalendarItemsActiveOnly) {
            $queryBuilder
                ->andWhere($this->getCalendarRepository()->getAlias() . ".status=:status")
                ->setParameter("status", Calendar::STATUS_ACTIVE);
        }

        $queryBuilder->orderBy($this->getCalendarRepository()->getAlias() . ".start", "DESC");

        return $queryBuilder;
    }

    public function isActiveOnly(bool $val = true): void
    {
        $this->isShowCalendarItemsActiveOnly = $val;
    }

    public function getCalendarItems(User $user, ?QueryBuilder $queryBuilder = null, ?string $indexBy = null): ?array
    {
        return $this
            ->getCalendarQueryBuilder($user, $queryBuilder, $indexBy)
            ->getQuery()
            ->getArrayResult();
    }

    abstract protected function getCalendarRepository(): CalendarRepository;
}