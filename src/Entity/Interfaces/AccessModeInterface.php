<?php

namespace App\Entity\Interfaces;

interface AccessModeInterface
{
    public function isUserRead(): bool;
    public function setIsUserRead(bool $isUserRead): self;

    public function isUserWrite(): bool;
    public function setIsUserWrite(bool $isUserWrite): self;

    public function isGroupRead(): bool;
    public function setIsGroupRead(bool $isUserRead): self;

    public function isGroupWrite(): bool;
    public function setIsGroupWrite(bool $isUserWrite): self;
}