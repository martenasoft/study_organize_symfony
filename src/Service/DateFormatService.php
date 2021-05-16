<?php

namespace App\Service;

class DateFormatService
{
    public function dateTimeRangeToDateObjectArray(string $dateTime): ?array
    {
        $patterDateTime1 = '(\d{2})\/(\d{2})\/(\d{4})\s(\d{2})\:(\d{2})';
        $pattern = "/$patterDateTime1\s\-\s$patterDateTime1/";

        if (preg_match($pattern, $dateTime, $matches) && count($matches) == 11) {
            $dateStart = $matches[3] . '-' . $matches[2] . '-' . $matches[1] . ' ' . $matches[4] . ':' . $matches[5] . ':00';
            $dateEnd = $matches[8] . '-' . $matches[7] . '-' . $matches[6] . ' ' . $matches[9] . ':' . $matches[10] . ':00';

            return [
                'start' => new \DateTime($dateStart),
                'end' => new \DateTime($dateEnd)

            ];
        }

        return null;
    }
}