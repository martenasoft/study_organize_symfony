<?php

namespace App\Entity\Traits;

use App\Entity\Calendar;
use App\Entity\CalendarItem;

trait IconTrait
{
    /**
     * @ORM\Column(type="string", length=16, nullable=true)
     */
    private ?string $icon = "";
    
    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function setIcon(?string $icon): self
    {
        $this->icon = $icon;
        return $this;
    }

    public static function getIconChoices() :array
    {
        $colorChoices = [];
        foreach (self::ICONS as $color) {
            $colorChoices[$color] = $color;
        }
        return $colorChoices;
    }
}
