<?php

namespace App\Repository;

use App\Entity\DailyChecklist;
use App\Entity\User;
use App\Repository\Traits\TraitRepositoryAlias;
use App\Repository\Traits\TraitRepositoryGetQueryBuilderByUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

class DailyChecklistRepository extends ServiceEntityRepository
{
    use TraitRepositoryGetQueryBuilderByUser;

    public function __construct(ManagerRegistry $registry)
    {
        $this->setAlias('dc');
        parent::__construct($registry, DailyChecklist::class);
    }

    public function getByUserQueryBuilder(
        User $user,
        ?int $dataType = null,
        ?\DateTimeInterface $dateStart = null,
        ?\DateTimeInterface $dateEnd = null,
        ?string $indexBy = null
    ): QueryBuilder {
        $dateStart = !empty($dateStart) ? $dateStart : new \DateTime('now');
        $dateEnd = !empty($dateEnd) ? $dateEnd : new \DateTime('now');

        $dateStart->setTime(0, 0, 0);
        $dateEnd->setTime(23, 59, 59);

        $queryBuilder = $this
            ->getQueryBuilderByUser($user, null, $indexBy)
            ->andWhere($this->getAlias() . '.datetime>=:date1 AND ' . $this->getAlias() . '.datetime<=:date2')

            ->setParameter('date1', $dateStart->format('U'))
            ->setParameter('date2', $dateEnd->format('U'))
            ;

        if ($dataType !== null) {
            $queryBuilder
                ->andWhere($this->getAlias() . '.datatype=:datatype')
                ->setParameter('datatype', $dataType)
            ;
        }
        return $queryBuilder;
    }

    public function save(DailyChecklist $dailyChecklist): void
    {
        $queryBuilder = $this
            ->getByUserQueryBuilder($dailyChecklist->getUser(), $dailyChecklist->getDatatype())
            ->andWhere($this->getAlias() . '.recordId=:recordId')
            ->andWhere($this->getAlias().'.datetime=:datetime')
            ->setParameter('recordId', $dailyChecklist->getRecordId())
            ->setParameter('datetime', $dailyChecklist->getDatatype())
        ;

        $item = $queryBuilder->getQuery()->getOneOrNullResult();

        if (!empty($item)) {
            $item->setStatus($dailyChecklist->getStatus());
        } else {
            $this->getEntityManager()->persist($dailyChecklist);
        }

        $this->getEntityManager()->flush();
    }
}

