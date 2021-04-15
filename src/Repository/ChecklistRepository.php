<?php

namespace App\Repository;

use App\Entity\Checklist;
use App\Entity\User;
use App\Repository\Traits\TraitRepositoryGetQueryBuilderByUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ChecklistRepository extends ServiceEntityRepository
{
    use TraitRepositoryGetQueryBuilderByUser;

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
}
