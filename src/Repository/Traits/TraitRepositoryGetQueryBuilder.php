<?php

namespace App\Repository\Traits;

use Doctrine\ORM\QueryBuilder;

trait TraitRepositoryGetQueryBuilder
{
    use TraitRepositoryAlias;

    public function getAllQueryBuilder(?QueryBuilder $queryBuilder = null, ?string $indexBy = null): QueryBuilder
    {
        if ($queryBuilder === null) {
            $queryBuilder = $this->createQueryBuilder($this->getAlias(), $indexBy);
        }

        return $queryBuilder;
    }
}