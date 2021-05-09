<?php

namespace App\DoctrineExtensions\Query\Mysql;

/**
*  DayOfWeek ::= "DAYOFWEEK" "(" Value ")"
*/
class DayOfWeek extends AbstractFunctionNameOneArgument
{
    protected function getFunctionName(): string
    {
        return 'DAYOFWEEK';
    }
}
