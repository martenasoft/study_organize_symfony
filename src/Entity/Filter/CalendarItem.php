<?php

namespace App\Entity\Filter;

use Doctrine\Common\Collections\ArrayCollection;

class CalendarItem
{
    private $calendar = null;
    private ?string $title = '';
    private ?string $dateStartEnd = '';

    public function getCalendar()
    {
        return $this->calendar;
    }

    public function setCalendar($calendar): self
    {
        $this->calendar = $calendar;
        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): CalendarItem
    {
        $this->title = $title;
        return $this;
    }

    public function getDateStartEnd(): ?string
    {
        return $this->dateStartEnd;
    }

    public function setDateStartEnd(?string $dateStartEnd): CalendarItem
    {
        $this->dateStartEnd = $dateStartEnd;
        return $this;
    }


}
