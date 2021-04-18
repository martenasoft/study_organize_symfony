<?php

namespace App\Form;

use App\Entity\Calendar;
use App\Entity\CalendarItem;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormError;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CalendarItemType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('dateRange')
            ->add(
                'color',
                ChoiceType::class,
                [
                    'choices' => CalendarItem::getColorChoices(),
                    "required" => false,
                    'attr' => ['class' => 'hide']
                ]
            )
            ->add(
                'textColor',
                ChoiceType::class,
                [
                    'choices' => CalendarItem::getColorChoices(),
                    "required" => false,
                    'attr' => ['class' => 'hide']
                ]
            )
            ->add('title')
            ->add('about')
            ->add(
                'icon',
                ChoiceType::class,
                [
                    'choices' => CalendarItem::getIconChoices(),
                    "required" => false,
                    'expanded' => 'radio',
                    'choice_attr' => ['label' => false],
                    'label' => false
                ]
            )->addEventListener(FormEvents::POST_SUBMIT, function (FormEvent $event) {
                $data = $event->getData();
                $dateRange = $data->getDateRange();
                $patterDateTime1 = '(\d{2})\/(\d{2})\/(\d{4})\s(\d{2})\:(\d{2})';
                $pattern = "/$patterDateTime1\s\-\s$patterDateTime1/";
                if (preg_match($pattern, $data->getDateRange(), $matches) && count($matches) == 11) {
                    $data->setStart(new \DateTime(
                        $matches[3]
                        .'-'
                        .$matches[2]
                        .'-'
                        .$matches[1]
                        .' '
                        .$matches[1]
                        .':'
                        .$matches[1]
                        .':00')
                    );

                    $data->setEnd(new \DateTime(
                        $matches[8]
                        .'-'
                        .$matches[7]
                        .'-'
                        .$matches[6]
                        .' '
                        .$matches[9]
                        .':'
                        .$matches[10]
                        .':00')
                    );
                } else {

                    $event->getForm()->get('dateRange')->addError(new FormError('Error Format!'));
                }

            });
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
            [
                'data_class' => CalendarItem::class,
            ]
        );
    }
}
