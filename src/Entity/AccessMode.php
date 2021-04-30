<?php

namespace App\Entity;

use App\Entity\Interfaces\AccessModeInterface;
use App\Entity\Traits\AccessModeTrait;

class AccessMode implements AccessModeInterface
{
    use AccessModeTrait;
}