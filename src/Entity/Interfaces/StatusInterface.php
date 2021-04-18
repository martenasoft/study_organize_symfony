<?php

namespace App\Entity\Interfaces;

interface StatusInterface
{
    public const STATUS_ACTIVE = 1;
    public const STATUS_DONE = 2;
    public const STATUS_DELETED = 3;

    public function getStatus(): ?int;
    public function setStatus(int $status): self;
}