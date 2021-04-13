<?php

namespace App\Form;

use App\Entity\Calendar;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CalendarType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $colorChoices = [];
        foreach (Calendar::COLORS as $color) {
            $colorChoices[$color] = $color;
        }

        $iconsChoices = [];
        foreach (Calendar::ICONS as $icon) {
            $iconsChoices[$icon] = $icon;
        }

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

            ->add('color', ChoiceType::class, [
                'choices' => $colorChoices,
                'attr' => ['class' => 'hide']
            ])

            ->add('icon', ChoiceType::class, [
                'choices' => $iconsChoices,
                'expanded' => 'radio',
                'choice_attr' => ['label' => false],
                'label' => false
            ])
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
