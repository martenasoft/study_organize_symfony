<?php

namespace App\Entity\Traits;

use App\Entity\Interfaces\ColorInterface;

trait ColorTrait
{
    /**
     * @ORM\Column(type="string", length=16, nullable=true)
     */
    private ?string $color = "";

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): self
    {
        $this->color = $color;

        return $this;
    }

    public static function getColorChoices() :array
    {
        $colorChoices = [];
        foreach (self::COLORS as $color) {
            $colorChoices[$color] = $color;
        }
        return $colorChoices;
    }
}
