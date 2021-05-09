<?php

namespace App\Entity;

use App\Repository\DailyChecklistRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=DailyChecklistRepository::class)
 */
class DailyChecklist
{
    public const CHECK_LIST_TYPE = 1;
    public const CALENDAR_ITEM_TYPE = 2;
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="smallint")
     */
    private $datatype;

    /**
     * @ORM\Column(type="integer")
     */
    private $datetime;

    /**
     * @ORM\Column(type="integer")
     */
    private $recordId;

    /**
     * @ORM\Column(type="smallint")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=CalendarItem::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $calendarItem;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getDatatype(): ?int
    {
        return $this->datatype;
    }

    public function setDatatype(int $datatype): self
    {
        $this->datatype = $datatype;

        return $this;
    }

    public function getDatetime(): ?int
    {
        return $this->datetime;
    }

    public function setDatetime(int $datetime): self
    {
        $this->datetime = $datetime;

        return $this;
    }

    public function getRecordId(): ?int
    {
        return $this->recordId;
    }

    public function setRecordId(int $recordId): self
    {
        $this->recordId = $recordId;

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): self
    {
        $this->color = $color;

        return $this;
    }

    public function getCalendarItem(): ?CalendarItem
    {
        return $this->calendarItem;
    }

    public function setCalendarItem(?CalendarItem $calendarItem): self
    {
        $this->calendarItem = $calendarItem;

        return $this;
    }

}
