<?php

namespace App\Repository;

use App\Entity\Interfaces\StatusInterface;
use App\Entity\User;
use App\Repository\Traits\TraitRepositoryAlias;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    use TraitRepositoryAlias;

    public function __construct(ManagerRegistry $registry)
    {
        $this->setAlias('u');
        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(UserInterface $user, string $newEncodedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newEncodedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
    }

    public function getUserByEmail(string $email): ?User
    {
        return $this
            ->createQueryBuilder($this->getAlias())
            ->andWhere($this->getAlias().'.email=:email')->setParameter("email", $email)
            ->andWhere($this->getAlias().'.status=:status')->setParameter("status", StatusInterface::STATUS_ACTIVE)
            ->getQuery()
            ->getOneOrNullResult();
    }

}
