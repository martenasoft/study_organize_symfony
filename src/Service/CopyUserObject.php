<?php

namespace App\Service;

use App\Entity\User;

class CopyUserObject
{
    public function getUser(User $user): User
    {
        $newUser = new User();
        foreach (get_class_methods($user) as $method) {
            if (substr($method, 0,3) == 'get' && !in_array($method, ['getId'])) {
                $setter = str_replace('get', 'set', $method);
                if (method_exists($newUser, $setter)) {
                    $newUser->$setter($user->$method());
                }
            }
        }
        return $newUser;
    }
}
