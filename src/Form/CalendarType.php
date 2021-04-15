<?php

namespace App\Form;

use App\Entity\Calendar;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
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
            ->add('title', TextType::class, [
                'attr' => ['autofocus' => true]
            ])
            ->add('about', TextareaType::class, [
                "required" => false,
                'attr' => [
                    'rows' => 8
                ]
            ])
            ->add('start', DateType::class, [
                'widget' => 'single_text',
              //  'format' => 'dd/mm/yyyy',
                'attr' => [
                    'class' => 'date-picker'
                ],
                'html5' => false,
            ])
            ->add('end', DateType::class, [
                'widget' => 'single_text',
             //   'format' => 'dd/mm/yyyy',
                'input' => 'datetime',
                'attr' => [
                    'class' => 'date-picker'
                ],
                'html5' => false,
            ])

            ->add('color', ChoiceType::class, [
                'choices' => $colorChoices,
                "required" => false,
                'attr' => ['class' => 'hide']
            ])

            ->add('textColor', ChoiceType::class, [
                'choices' => $colorChoices,
                "required" => false,
                'attr' => ['class' => 'hide']
            ])

            ->add('iconColor', ChoiceType::class, [
                'choices' => $colorChoices,
                "required" => false,
                'attr' => ['class' => 'hide']
            ])

            ->add('iconTextColor', ChoiceType::class, [
                'choices' => $colorChoices,
                "required" => false,
                'attr' => ['class' => 'hide']
            ])

            ->add('icon', ChoiceType::class, [
                'choices' => $iconsChoices,
                "required" => false,
                'expanded' => 'radio',
                'choice_attr' => ['label' => false],
                'label' => false
            ])
            ->add('status', HiddenType::class)

        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Calendar::class,
        ]);
    }
}
