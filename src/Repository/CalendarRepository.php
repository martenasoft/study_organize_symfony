<?php

namespace App\Repository;

use App\Entity\Calendar;
use App\Entity\User;
use App\Repository\Traits\TraitRepositoryGetQueryBuilderByUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

class CalendarRepository extends ServiceEntityRepository
{
    use TraitRepositoryGetQueryBuilderByUser;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Calendar::class);
        $this->setAlias('c');
    }

    public function getStatistics(User $user): array
    {
        $sql = "SELECT
                    COUNT(*) AS total,
                    COUNT(CASE WHEN c.status = 1 THEN 1 ELSE NULL END) AS in_process,
                    COUNT(CASE WHEN  c.end > c.changed_status THEN 1 ELSE NULL END) AS finished
                FROM calendar c WHERE c.user_id=:user;
            ";

        $res = $this->getEntityManager()->getConnection()->fetchAssociative($sql, ["user" => $user->getId()]);
        $ret = [];

        if (!empty($res)) {
            $ret = $res;
            $ret['inProccess'] = $ret['total'] > 0 ? $ret['in_process'] / $ret['total'] * 100 : 0;
            $ret['inFinished'] = $ret['total'] > 0 ? $ret['finished'] / $ret['total'] * 100 : 0;
        }
        return $ret;
    }

    public function getLoadItems(User $user, \DateTimeInterface $start, \DateTimeInterface $end): QueryBuilder
    {
        return $this
            ->getQueryBuilderByUser($user)
            ->andWhere($this->getAlias() . '.start>:date1')->setParameter('date1', $start)
            ->andWhere($this->getAlias() . '.start<=:date2')->setParameter('date2', $end);
    }

}
