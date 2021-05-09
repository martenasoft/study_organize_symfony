<?php

namespace App\Entity\Traits;

trait AccessModeTrait
{
    private bool $isUserRead = false;
    private bool $isUserWrite = false;

    private bool $isGroupRead = false;
    private bool $isGroupWrite = false;

    public function isUserRead(): bool
    {
        return $this->isUserRead;
    }
    
    public function setIsUserRead(bool $isUserRead): self
    {
        $this->isUserRead = $isUserRead;
        return $this;
    }

    public function isUserWrite(): bool
    {
        return $this->isUserWrite;
    }
    
    public function setIsUserWrite(bool $isUserWrite): self
    {
        $this->isUserWrite = $isUserWrite;
        return $this;
    }

    public function isGroupRead(): bool
    {
        return $this->isGroupRead;
    }

    public function setIsGroupRead(bool $isGroupRead): self
    {
        $this->isGroupRead = $isGroupRead;
        return $this;
    }

    public function isGroupWrite(): bool
    {
        return $this->isGroupWrite;
    }

    public function setIsGroupWrite(bool $isGroupWrite): self
    {
        $this->isGroupWrite = $isGroupWrite;
        return $this;
    }
}
