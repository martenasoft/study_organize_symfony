<?php

namespace App\Validator;

use App\Entity\User;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class UserExistsValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint)
    {

        /* @var $constraint \App\Validator\UserExists */

        if (null === $value || '' === $value) {
            return;
        }

        // TODO: implement the validation here
        if ($value instanceof User && empty($value->getId())) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ value }}', $value)
                ->addViolation();
        }
    }
}
