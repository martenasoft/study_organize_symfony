<?php

namespace App\Form;

use App\Entity\Calendar;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CalendarType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('about')
            ->add('color', ChoiceType::class, [
                'choices' => Calendar::getColorChoices(),
                "required" => false,
                'attr' => ['class' => 'hide']
            ])
            ->add('textColor', ChoiceType::class, [
                'choices' => Calendar::getColorChoices(),
                "required" => false,
                'attr' => ['class' => 'hide']
            ])

        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Calendar::class,
        ]);
    }
}
