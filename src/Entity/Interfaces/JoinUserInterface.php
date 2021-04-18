<?php

namespace App\Entity\Interfaces;

use App\Entity\User;

interface JoinUserInterface
{
    public function getUser(): ?User;
    public function setUser(?User $user): self;
}
