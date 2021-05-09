<?php

namespace App\DoctrineExtensions\Query\Mysql;

/**
 *  Now ::= "NOW" "(" Value ")"
 */
class Now extends AbstractFunctionNameOneArgument
{
    protected function getFunctionName(): string
    {
        return 'NOW';
    }
}