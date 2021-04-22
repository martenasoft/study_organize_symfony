<?php

namespace App\Form;

use App\Entity\Calendar;
use App\Entity\CalendarItem;
use App\Service\DateFormatService;
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
    private DateFormatService $dateFormatService;

    public function __construct(DateFormatService $dateFormatService) {
        $this->dateFormatService = $dateFormatService;
    }

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
                $dateRange = $this->dateFormatService->dateTimeRangeToDateObjectArray($data->getDateRange());

                if (!empty($dateRange)) {
                    $data
                        ->setStart($dateRange['start'])
                        ->setEnd($dateRange['end'])
                    ;
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
