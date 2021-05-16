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
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CalendarItemRepository::class)
 */
class CalendarItem implements StatusInterface,IconInterface, ColorInterface, TextColorInterface, ChangeDataDayInterface
{
    public const REPLACE_TYPE_NO = 0;
    public const REPLACE_TYPE_DAILY = 1;
    public const REPLACE_TYPE_IN_ONE_DAY = 2;
    public const REPLACE_TYPE_WORK_DAYS = 3;
    public const REPLACE_TYPE_WEEK_END = 4;
    public const REPLACE_TYPE_IN_ONE_MONTH = 5;

    use StatusTrait, IconTrait, ChangeDataDayTrait, ColorTrait, TextColorTrait;
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private ?int $id = null;

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

    private $calendars;

    /**
     * @ORM\Column(type="integer", options={"default":0})
     */
    private int $tagsCount = 0;

    /**
     * @ORM\Column(type="smallint", options={"default":0})
     */
    private $replaceType = 0;


    public function __construct()
    {
        $this->calendars = new ArrayCollection();
    }
    
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

    public function getCalendars()
    {
        return $this->calendars;
    }


    public function setCalendars($calendars)
    {
        $this->calendars = $calendars;
        return $this;
    }

    public function getTagsCount(): ?int
    {
        return $this->tagsCount;
    }

    public function setTagsCount(int $tagsCount): self
    {
        $this->tagsCount = $tagsCount;

        return $this;
    }

    public function getReplaceType(): ?int
    {
        return $this->replaceType;
    }

    public function setReplaceType(int $replaceType): self
    {
        $this->replaceType = $replaceType;

        return $this;
    }

    public static function getReplaceTypes(): array
    {
        return [
            'Only selected dates' => self::REPLACE_TYPE_NO,
            'Daily' => self::REPLACE_TYPE_DAILY,
            'In one day' => self::REPLACE_TYPE_IN_ONE_DAY,
            'Work days' => self::REPLACE_TYPE_WORK_DAYS,
            'Weekend' => self::REPLACE_TYPE_WEEK_END,
            'Every month' => self::REPLACE_TYPE_IN_ONE_MONTH

        ];
    }
}

