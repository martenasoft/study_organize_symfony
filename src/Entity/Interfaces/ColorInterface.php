<?php

namespace App\Entity\Interfaces;

interface ColorInterface
{
    public const COLORS = [
        '#fff',
        '#f2f6f9',
        '#646871',
        '#ac725e',
        '#d06b64',
        '#f83a22',
        '#fa573c',
        '#ff7537',
        '#ffad46',
        '#42d692',
        '#16a765',
        '#7bd148',
        '#b3dc6c',
        '#fbe983',
        '#fad165',
        '#92e1c0',
        '#9fe1e7',
        '#9fc6e7',
        '#4986e7',
        '#9a9cff',
        '#b99aff',
        '#c2c2c2',
        '#cabdbf',
        '#cca6ac',
        '#f691b2',
        '#cd74e6',
        '#a47ae2',
        '#555'
    ];

    public function getColor(): ?string;
    public function setColor(?string $color): self;
    public static function getColorChoices() :array;
}