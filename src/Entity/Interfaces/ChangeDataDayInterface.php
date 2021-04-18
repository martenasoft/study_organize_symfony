<?php

namespace App\Entity\Interfaces;

interface ChangeDataDayInterface
{
    public function getCreatedAt(): ?\DateTimeInterface;
    public function setCreatedAt(?\DateTimeInterface $createdAt): self;

    public function getUpdatedAt(): ?\DateTimeInterface;
    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self;

    public function getDeletedAt(): ?\DateTimeInterface;
    public function setDeletedAt(?\DateTimeInterface $deletedAt): self;
}