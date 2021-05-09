<?php

namespace App\Entity;

use App\Repository\CalendarItemChecklistTagsRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CalendarItemChecklistTagsRepository::class)
 */
class CalendarItemChecklistTags
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $tag;

    /**
     * @ORM\ManyToOne(targetEntity=User::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=CalendarItem::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $calendarItem;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTag(): ?string
    {
        return $this->tag;
    }

    public function setTag(string $tag): self
    {
        $this->tag = $tag;

        return $this;
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
