<?php

namespace App\Repository\Traits;

use App\Entity\User;
use Doctrine\ORM\QueryBuilder;

trait TraitRepositoryGetQueryBuilderByUser
{
    use TraitRepositoryGetQueryBuilder;

    public function getQueryBuilderByUser(
        User $user,
        ?QueryBuilder $queryBuilder = null,
        ?string $indexBy = null
    ): QueryBuilder {

        $queryBuilder = $this->getAllQueryBuilder($queryBuilder, $indexBy);
        return $queryBuilder
            ->andWhere($this->getAlias().".user=:user")
            ->setParameter("user", $user);
    }
}