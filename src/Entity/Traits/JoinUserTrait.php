<?php

namespace App\Entity\Traits;

use App\Entity\User;

trait JoinUserTrait
{
    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="start")
     */
    private User $user;

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