<?php

namespace App\Repository;

use App\Entity\CalendarItem;
use App\Entity\CalendarItemChecklistTags;
use App\Entity\Interfaces\StatusInterface;
use App\Entity\User;
use App\Repository\Traits\TraitRepositoryGetQueryBuilderByUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;


class CalendarItemChecklistTagsRepository extends ServiceEntityRepository
{
    use TraitRepositoryGetQueryBuilderByUser;

    public function __construct(ManagerRegistry $registry)
    {
        $this->setAlias('ct');
        parent::__construct($registry, CalendarItemChecklistTags::class);
    }

    public function getCountByUser(User $user, ?string $tag = null): int
    {
        $queryBuilder = $this
            ->getQueryBuilderByUser($user)
            ->innerJoin($this->getAlias().'.user', 'user')
            ->select("COUNT(".$this->getAlias().".id)");
        if (!empty($tag)) {
            $queryBuilder
                ->andWhere($this->getAlias().".tag=:tag")
                ->setParameter("tag", $tag)
            ;
        }
        return $queryBuilder->getQuery()->getSingleScalarResult();
    }

    public function getItemsByUserAndCalendarItemsQueryBuilder(User $user, CalendarItem $calendarItem): QueryBuilder
    {
        return $this
            ->getQueryBuilderByUser($user)
            ->innerJoin($this->getAlias().'.user', 'u')
            ->addSelect('u')
            ->innerJoin($this->getAlias().'.calendarItem', 'ci')
            ->addSelect('ci')
            ->andWhere('ci.id=:calendarItem')
            ->setParameter('calendarItem', $calendarItem)
            ->andWhere('ci.status != :deletedStatus')
            ->setParameter('deletedStatus', StatusInterface::STATUS_DELETED)
            ;
    }

}
