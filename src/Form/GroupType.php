<?php

namespace App\Form;

use App\Entity\Group;
use App\Entity\User;
use App\Repository\GroupRepository;
use App\Service\CopyUserObject;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormError;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class GroupType extends AbstractType
{
    private GroupRepository $groupRepository;
    private CopyUserObject $copyUserObject;

    public function __construct(GroupRepository $groupRepository, CopyUserObject $copyUserObject)
    {
        $this->groupRepository = $groupRepository;
        $this->copyUserObject = $copyUserObject;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('about')
            ->add('isUserRead', CheckboxType::class)
            ->add('isUserWrite', CheckboxType::class)
            ->add('isGroupRead', CheckboxType::class)
            ->add('isGroupWrite', CheckboxType::class)
            ->add('users', CollectionType::class, [
                'label' => false,
                'entry_type' => UserSmallType::class,
                'allow_add' => true,
                'allow_delete' => true
            ])->addEventListener(FormEvents::POST_SUBMIT, function (FormEvent $event) {

                $users = $this->groupRepository->getUsersByGroupEntity($event->getData());

                foreach ($event->getData()->getUsers() as $index => $user) {
                    if (empty($users[$user->getEmail()])) {
                        $event
                            ->getForm()
                            ->get('users')[$index]
                            ->get('email')
                            ->addError(new FormError("User not found"));
                    } else {
                        $event->getData()->getUsers()[$index] = $users[$user->getEmail()];
                        unset($users[$user->getEmail()]);
                    }
                }

                if (!empty($users)) {
                    foreach ($users as $user) {
                        $user->removeGroup($event->getData());
                        $event->getData()->removeUser($user);
                    }
                }

            })
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Group::class,
        ]);
    }
}
