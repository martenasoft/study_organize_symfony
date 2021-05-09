<?php

namespace App\DoctrineExtensions\Query\Mysql;

/**
 *  Month ::= "MONTH" "(" Value ")"
 */
class Month extends AbstractFunctionNameOneArgument
{
    protected function getFunctionName(): string
    {
        return 'MONTH';
    }
}