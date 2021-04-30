<?php

namespace App\Repository;

use App\Entity\Group;
use App\Entity\Interfaces\StatusInterface;
use App\Repository\Traits\TraitRepositoryAlias;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Form\FormError;
use Symfony\Component\Form\FormEvent;

class GroupRepository extends ServiceEntityRepository
{
    use TraitRepositoryAlias;

    private UserRepository $userRepository;

    public function __construct(ManagerRegistry $registry, UserRepository $userRepository)
    {
        $this->setAlias('g');
        $this->userRepository = $userRepository;
        parent::__construct($registry, Group::class);
    }

    public function getUserByEmails(array $emails): ?array
    {
        if (empty($emails)) {
            return null;
        }

        $queryBuilder = $this
            ->userRepository
            ->createQueryBuilder(
                $this->userRepository->getAlias(),
                $this->userRepository->getAlias() . '.email'
            )
            ->andWhere($this->userRepository->getAlias() . '.email IN(:emails)')
            ->setParameter('emails', $emails)
            ->andWhere($this->userRepository->getAlias() . '.status=:status')
            ->setParameter('status', StatusInterface::STATUS_ACTIVE);

        return $queryBuilder->getQuery()->getResult();
    }

    public function getUsersByGroupEntity(Group $group): ?array
    {
        $emails = [];
        foreach ($group->getUsers() as $index => $user) {
            if (empty($user->getId())) {
                $emails[] = $user->getEmail();
            }
        }

        return $this->getUserByEmails($emails);
    }

}
