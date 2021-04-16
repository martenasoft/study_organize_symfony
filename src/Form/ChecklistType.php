<?php

namespace App\Form;

use App\Entity\Calendar;
use App\Entity\Checklist;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ChecklistType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $colorChoices = [];
        foreach (Calendar::COLORS as $color) {
            $colorChoices[$color] = $color;
        }

        $builder
            ->add('title', TextType::class, [
                'attr' => ['autofocus' => true]
            ])
            ->add('about')
            ->add('externalLink')
            ->add('color', ChoiceType::class, [
                'choices' => $colorChoices,
                "required" => false,
                'attr' => ['class' => 'hide']
            ])

            ->add('hashtag')
            ->add('status', HiddenType::class)

        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'label' => false,
            'data_class' => Checklist::class,
        ]);
    }
}
