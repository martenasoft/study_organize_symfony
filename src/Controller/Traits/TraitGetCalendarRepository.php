<?php

namespace App\Controller\Traits;

use App\Repository\CalendarRepository;

trait TraitGetCalendarRepository
{
    private CalendarRepository $calendarRepository;

    protected function getCalendarRepository(): CalendarRepository
    {
        return $this->calendarRepository;
    }
}