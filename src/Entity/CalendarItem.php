<?php

namespace App\Entity;

use App\Entity\Interfaces\ChangeDataDayInterface;
use App\Entity\Interfaces\ColorInterface;
use App\Entity\Interfaces\IconInterface;
use App\Entity\Interfaces\StatusInterface;
use App\Entity\Interfaces\TextColorInterface;
use App\Entity\Traits\ChangeDataDayTrait;
use App\Entity\Traits\ColorTrait;
use App\Entity\Traits\IconTrait;
use App\Entity\Traits\StatusTrait;
use App\Entity\Traits\TextColorTrait;
use App\Repository\CalendarItemRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CalendarItemRepository::class)
 */
class CalendarItem implements StatusInterface,IconInterface, ColorInterface, TextColorInterface, ChangeDataDayInterface
{
    use StatusTrait, IconTrait, ChangeDataDayTrait, ColorTrait, TextColorTrait;
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\ManyToOne(targetEntity=Calendar::class, inversedBy="calendarItems")
     */
    private ?Calendar $calendar;

    /**
     * @ORM\Column(type="datetime")
     */
    private ?\DateTimeInterface $start;

    /**
     * @ORM\Column(type="datetime")
     */
    private ?\DateTimeInterface $end;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private ?string $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private ?string $about;

    private ?string $dateRange;
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCalendar(): ?Calendar
    {
        return $this->calendar;
    }

    public function setCalendar(?Calendar $calendar): self
    {
        $this->calendar = $calendar;
        return $this;
    }

    public function getStart(): ?\DateTimeInterface
    {
        return $this->start;
    }

    public function setStart(\DateTimeInterface $start): self
    {
        $this->start = $start;
        return $this;
    }

    public function getEnd(): ?\DateTimeInterface
    {
        return $this->end;
    }

    public function setEnd(\DateTimeInterface $end): self
    {
        $this->end = $end;
        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function getAbout(): ?string
    {
        return $this->about;
    }

    public function setAbout(?string $about): self
    {
        $this->about = $about;
        return $this;
    }

    public function getDateRange(): ?string
    {
        return $this->dateRange;
    }

    public function setDateRange(?string $dateRange): self
    {
        $this->dateRange = $dateRange;
        return $this;
    }

}

