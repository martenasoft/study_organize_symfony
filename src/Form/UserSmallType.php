<?php

namespace App\Form;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Validator\UserExists;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormError;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserSmallType extends AbstractType
{
    private UserRepository $userRepository;
    private User $user;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', EmailType::class)
            ->addEventListener(FormEvents::POST_SUBMIT, function (FormEvent $event) {
               /* $emailField = $event->getForm()->get('email');
                $user = $this->userRepository->getUserByEmail($emailField->getData());
                if (!$user) {
                    $emailField->addError(new FormError("User not found"));
                }
                $event->setData($user);*/
               // $event->getForm()->setData($user);
            })
        ;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
            [
                'data_class' => User::class,
            ]
        );
    }
}
