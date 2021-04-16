<?php

namespace App\Entity;

class TagsSearch
{
    private ?string $query;

    public function getQuery(): ?string
    {
        return $this->query;
    }

    public function setQuery(?string $query): TagsSearch
    {
        $this->query = $query;
        return $this;
    }
}
