<?php

namespace App\Entity\Traits;

use App\Entity\User;

trait JoinUserTrait
{
    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;
        return $this;
    }
}