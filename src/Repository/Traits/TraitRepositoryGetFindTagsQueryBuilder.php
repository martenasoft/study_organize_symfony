<?php

namespace App\Repository\Traits;

use Doctrine\ORM\QueryBuilder;

trait TraitRepositoryGetFindTagsQueryBuilder
{
    abstract public function getAlias(): string;

    public function findTagQueryBuilder(string $query, QueryBuilder $queryBuilder, string $tagField = 'hashtag'): void
    {
        if (!preg_match_all('/\#[a-zA-Z-0-9]+/', $query, $matches) && !empty($matches[0])) {
            return;
        }

        $queryStr = '';
        foreach ($matches[0] as $tag) {
            if (empty($tag)) {
                continue;
            }
            $tag = (substr($tag, 0, 1) != '#' ? '#' : '') . $tag;
            $queryStr .= (!empty($queryStr) ? ' OR ' : '') .
                $this->getAlias() . ".{$tagField} LIKE '%$tag%'";
        }

        if (!empty($queryStr)) {
            $queryBuilder->andWhere($queryStr);
        }
    }
}