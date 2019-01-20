<?php
function getStatistics()
{
    $fileName = '..'.DIRECTORY_SEPARATOR.'public'.DIRECTORY_SEPARATOR.'statistics.json';

    define('DEFAULT_STATISTIC',
        [
            'Cactus' => 0,
            'Beans' => 0,
            'Blackberry' => 0,
            'Cannabis' => 0,
            'Strawberry' => 0
        ]
    );

    if (!file_exists($fileName)) {
        file_put_contents($fileName, json_encode(DEFAULT_STATISTIC));
    }

    $statistics = false;
    if (filesize($fileName)) {
        $statistics = json_decode(file_get_contents($fileName));
    }
    return $statistics;
}