<?php

namespace App\Entity;

use App\Entity\Interfaces\AccessModeInterface;
use App\Entity\Interfaces\ChangeDataDayInterface;
use App\Entity\Interfaces\ColorInterface;
use App\Entity\Interfaces\JoinUserInterface;
use App\Entity\Interfaces\StatusInterface;
use App\Entity\Interfaces\TextColorInterface;
use App\Entity\Traits\AccessModeTrait;
use App\Entity\Traits\ChangeDataDayTrait;
use App\Entity\Traits\ColorTrait;
use App\Entity\Traits\JoinUserTrait;
use App\Entity\Traits\StatusTrait;
use App\Entity\Traits\TextColorTrait;
use App\Repository\CalendarRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CalendarRepository::class)
 */
class Calendar implements
    StatusInterface,
    ColorInterface,
    TextColorInterface,
    JoinUserInterface,
    ChangeDataDayInterface,
    AccessModeInterface
{
    use StatusTrait, ColorTrait, TextColorTrait, JoinUserTrait, ChangeDataDayTrait, AccessModeTrait;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private ?int $id = null;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private ?string $about = "";

    /**
     * @ORM\OneToMany(targetEntity=CalendarItem::class, mappedBy="calendar")
     */
    private $calendarItems;

    /**
     * @ORM\ManyToOne(targetEntity=User::class)
     */
    private User $user;

    public function __construct()
    {
        $this->calendarItems = new ArrayCollection();
        $this->updatedAt = null;
        $this->deletedAt = null;
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * @return Collection|CalendarItem[]
     */
    public function getCalendarItems(): Collection
    {
        return $this->calendarItems;
    }

    public function addCalendarItem(CalendarItem $calendarItem): self
    {
        if (!$this->calendarItems->contains($calendarItem)) {
            $this->calendarItems[] = $calendarItem;
            $calendarItem->setCalendar($this);
        }

        return $this;
    }

    public function removeCalendarItem(CalendarItem $calendarItem): self
    {
        if ($this->calendarItems->removeElement($calendarItem)) {
            // set the owning side to null (unless already changed)
            if ($calendarItem->getCalendar() === $this) {
                $calendarItem->setCalendar(null);
            }
        }

        return $this;
    }

}
