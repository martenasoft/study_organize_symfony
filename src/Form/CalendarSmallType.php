<?php

namespace App\Form;

use App\Entity\Calendar;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CalendarSmallType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('start', HiddenType::class)
            ->add('end', HiddenType::class)
            ->add('title', HiddenType::class)
            ->add('about', HiddenType::class)
            ->add('color', HiddenType::class)
            ->add('status', HiddenType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'attr' => ['id' => 'calendar_small'],
            'data_class' => Calendar::class,
        ]);
    }
}
