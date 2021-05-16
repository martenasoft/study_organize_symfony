<?php

namespace App\Form;

use App\Entity\Calendar;
use App\Entity\CalendarItem;
use App\Repository\CalendarItemRepository;
use App\Repository\CalendarRepository;
use App\Service\DateFormatService;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
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
    private CalendarItemRepository $calendarItemRepository;

    public function __construct(DateFormatService $dateFormatService, CalendarItemRepository $calendarItemRepository)
    {
        $this->dateFormatService = $dateFormatService;
        $this->calendarItemRepository = $calendarItemRepository;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('dateRange')
            ->add(
                'replaceType',
                ChoiceType::class,
                [
                    'choices' => CalendarItem::getReplaceTypes(),
                    "required" => false
                ]
            )
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
            )->addEventListener(
                FormEvents::PRE_SET_DATA,
                function (FormEvent $event) use ($options) {
                    if (isset($options['hide_calendar']) && $options['hide_calendar'] === true) {
                        return;
                    }
                    $form = $event->getForm();

                    if ($event->getData()->getId() === null) {
                        $form
                            ->add(
                                'calendars',
                                EntityType::class,
                                [
                                    'class' => Calendar::class,
                                    'choice_label' => 'title',
                                    'data' => $options['calendars'],
                                    'required' => false,
                                    'empty_data' => '',
                                    'multiple' => $options['isMultiple'],
                                    'query_builder' => function (CalendarRepository $calendarRepository) use ($options
                                    ) {
                                        return $calendarRepository->getItemsByUserQueryBuilder($options['user']);
                                    }
                                ]
                            );
                    } else {
                        $form
                            ->add(
                                'calendar',
                                EntityType::class,
                                [
                                    'class' => Calendar::class,
                                    'choice_label' => 'title',
                                    'required' => false,
                                    'empty_data' => '',
                                    'multiple' => false,
                                    'query_builder' => function (CalendarRepository $calendarRepository) use ($options
                                    ) {
                                        return $calendarRepository->getItemsByUserQueryBuilder($options['user']);
                                    }
                                ]
                            );
                    }
                }
            )->addEventListener(
                FormEvents::POST_SUBMIT,
                function (FormEvent $event) {
                    $data = $event->getData();
                    $dateRange = $this->dateFormatService->dateTimeRangeToDateObjectArray($data->getDateRange());

                    if (!empty($dateRange)) {
                        $data
                            ->setStart($dateRange['start'])
                            ->setEnd($dateRange['end']);
                    } else {
                        $event->getForm()->get('dateRange')->addError(new FormError('Error Format!'));
                    }
                }
            );
    }


    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
            [
                'hide_calendar' => null,
                'isMultiple' => true,
                'calendars' => null,
                'user' => null,
                'data_class' => CalendarItem::class,
            ]
        );
    }
}
