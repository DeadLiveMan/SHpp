<?php

define('FILE_NAME', '..'.DIRECTORY_SEPARATOR.'public'.DIRECTORY_SEPARATOR.'statistics.json');

function getStatistics()
{
    if (file_exists(FILE_NAME)) {
        return json_decode(file_get_contents(FILE_NAME));
    }
    return [
        'Cactus' => 0,
        'Beans' => 0,
        'Blackberry' => 0,
        'Cannabis' => 0,
        'Strawberry' => 0
        ];
}