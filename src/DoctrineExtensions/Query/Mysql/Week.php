<?php

namespace App\DoctrineExtensions\Query\Mysql;

/**
 *  Week ::= "WEEK" "(" Value ")"
 */
class Week extends AbstractFunctionNameOneArgument
{
    protected function getFunctionName(): string
    {
        return 'WEEK';
    }
}
