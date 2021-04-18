<?php

namespace App\Entity\Traits;

trait TextColorTrait
{
    /**
     * @ORM\Column(type="string", length=16, nullable=true)
     */
    private ?string $textColor = "";

    public function getTextColor(): ?string
    {
        return $this->textColor;
    }

    public function setTextColor(?string $textColor): self
    {
        $this->textColor = $textColor;
        return $this;
    }
}