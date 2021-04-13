<?php

namespace App\Form;

use App\Entity\Calendar;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CalendarType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('about')
            ->add('start', DateType::class, [
                'widget' => 'single_text',
                'attr' => [
                    'class' => 'date-picker'
                ],
                'html5' => false,
            ])
            ->add('end', DateType::class, [
                'widget' => 'single_text',
                'attr' => [
                    'class' => 'date-picker'
                ],
                'html5' => false,
            ])

            ->add('color')
            ->add('status')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Calendar::class,
        ]);
    }
}
