<?php
function getStatistics()
{
    define('FILE_NAME', '..'.DIRECTORY_SEPARATOR.'public'.DIRECTORY_SEPARATOR.'statistics.json');
    //$fileName = '..'.DIRECTORY_SEPARATOR.'public'.DIRECTORY_SEPARATOR.'statistics.json';

    define('DEFAULT_STATISTIC',
        [
            'Cactus' => 0,
            'Beans' => 0,
            'Blackberry' => 0,
            'Cannabis' => 0,
            'Strawberry' => 0
        ]
    );

    if (!file_exists(FILE_NAME)) {
        file_put_contents(FILE_NAME, json_encode(DEFAULT_STATISTIC));
    }

    $statistics = false;
    if (filesize(FILE_NAME)) {
        $statistics = json_decode(file_get_contents(FILE_NAME));
    }
    return $statistics;
}