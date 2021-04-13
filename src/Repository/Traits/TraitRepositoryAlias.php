<?php

namespace App\Repository\Traits;

trait TraitRepositoryAlias
{
    private string $alias;

    public function getAlias(): string
    {
        return $this->alias;
    }

    public function setAlias(string $alias): self
    {
        $this->alias = $alias;
        return $this;
    }
}