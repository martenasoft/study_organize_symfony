<?php

namespace App\Repository\Traits;

use App\Entity\User;
use Doctrine\ORM\QueryBuilder;

trait TraitRepositoryByUserAndItemsIdsQueryBuilder
{
    use TraitRepositoryGetQueryBuilderByUser;

    public function getItemsByUserAndItemsIds(User $user, array $items): ?QueryBuilder
    {
        return $this
            ->getQueryBuilderByUser($user)
            ->andWhere($this->getAlias().".id IN (:id)")
            ->setParameter("id", $items);
    }
}