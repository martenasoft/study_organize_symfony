<?php

namespace App\Repository;

use App\Entity\Calendar;
use App\Entity\CalendarItem;
use App\Entity\Interfaces\StatusInterface;
use App\Entity\User;
use App\Repository\Traits\TraitRepositoryGetQueryBuilderByUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

class CalendarItemRepository extends ServiceEntityRepository
{
    use TraitRepositoryGetQueryBuilderByUser;

    public function __construct(ManagerRegistry $registry)
    {
        $this->setAlias('ci');
        parent::__construct($registry, CalendarItem::class);
    }

    public function getLoadItems(
        ?User $user = null,
        ?array $calendar = null,
        ?\DateTimeInterface $start = null,
        ?\DateTimeInterface $end = null
    ): QueryBuilder {
        $queryBuilder = $this
            ->getAllQueryBuilder()
            ->join($this->getAlias().'.calendar', 'calendar')

            ->andWhere($this->getAlias().".status=:status")
            ->setParameter("status", StatusInterface::STATUS_ACTIVE);

        if (!empty($user)) {
            $queryBuilder
                ->join('calendar.user', 'user')
                ->andWhere('user=:user')
                ->setParameter('user', $user)
            ;
        }
        if (!empty($calendar)) {
            $queryBuilder
                ->andWhere($this->getAlias() .".calendar IN(:calendar)")
                ->setParameter('calendar', $calendar);

        }

        if (!empty($start)) {
            $queryBuilder
                ->andWhere($this->getAlias() . '.start>=:date1')
                ->setParameter('date1', $start);
        }

        if (!empty($end)) {
            $queryBuilder
                ->andWhere($this->getAlias() . '.start<=:date2')
                ->setParameter('date2', $end);
        }

        return $queryBuilder;
    }
}
