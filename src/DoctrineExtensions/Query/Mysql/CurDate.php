<?php

namespace App\DoctrineExtensions\Query\Mysql;

/**
 *  CurDate ::= "CURDATE" "(" Value ")"
 */
class CurDate extends AbstractFunctionNameOneArgument
{
    protected function getFunctionName(): string
    {
        return 'CURDATE';
    }
}