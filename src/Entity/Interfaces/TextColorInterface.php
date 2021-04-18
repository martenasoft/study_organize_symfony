<?php

namespace App\Entity\Interfaces;

interface TextColorInterface
{
    public function getTextColor(): ?string;
    public function setTextColor(?string $textColor): self;
}