<?php

namespace App\Repository;

use App\Entity\Checklist;
use App\Entity\User;
use App\Repository\Traits\TraitRepositoryGetFindTagsQueryBuilder;
use App\Repository\Traits\TraitRepositoryGetQueryBuilderByUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

class ChecklistRepository extends ServiceEntityRepository
{
    use TraitRepositoryGetQueryBuilderByUser, TraitRepositoryGetFindTagsQueryBuilder;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Checklist::class);
        $this->setAlias("cl");
    }

    public function getItemsByIds(User $user, ?array $items = []): ?array
    {
        return $this
            ->getQueryBuilderByUser($user)
            ->andWhere($this->getAlias().".id IN (:id)")
            ->setParameter("id", $items)
            ->getQuery()
            ->getResult();
    }

    public function getTags(User $user, ?string $string): ?array
    {
        if (empty($string)) {
            return null;
        }

        return $this
            ->getQueryBuilderByUser($user)
            ->andWhere($this->getAlias().".tags LIKE :tags")
            ->setParameter("tags", "%$string%")
            ->getQuery()
            ->getResult();
    }

    public function findByTitleAboutQueryBuilder(string $query, QueryBuilder $queryBuilder): void
    {
        $queryStr = "(".
            $this->getAlias().".title LIKE '%{$query}%' OR " .
            $this->getAlias().".about LIKE '%{$query}%'" .
            ")";

        $queryBuilder->andWhere($queryStr);
    }

}
