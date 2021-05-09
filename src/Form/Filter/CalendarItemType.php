<?php

namespace App\Form\Filter;


use App\Entity\Calendar;
use App\Entity\Filter\CalendarItem;
use App\Entity\Interfaces\StatusInterface;
use App\Repository\CalendarRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CalendarItemType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('calendar', EntityType::class, [
            'class'=> Calendar::class,
            'choice_label' => function(Calendar $calendar) use ($options) {
                return $calendar->getTitle()
                    .' ('. (!empty($options['user']) && $options['user']->getId() == $calendar->getUser()->getId()
                       ? 'Your calendar' : $calendar->getUser()->getEmail()).')';
            },
            'required' => false,
            'empty_data' => null,
            'multiple' => true,
            'query_builder' => function(CalendarRepository $calendarRepository) use ($options) {
                return $calendarRepository->getItemsByUserQueryBuilder($options['user'], StatusInterface::STATUS_ACTIVE);
            }])
            ->add('title')
            ->add('dateStartEnd')
            ->setMethod("GET")
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
            [
                'csrf_protection' => false,
                'user' => null,
                'data_class' => CalendarItem::class,
            ]
        );
    }
}