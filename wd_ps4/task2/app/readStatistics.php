<?php
function getStatistics() {
    $fileName = '..'.DIRECTORY_SEPARATOR.'public'.DIRECTORY_SEPARATOR.'statistics.json';

    if (!file_exists($fileName)) {
        $fw = fopen($fileName, 'w');
        fwrite($fw, json_encode(
            [   'Cactus' => 0,
                'Beans' => 0,
                'Blackberry' => 0,
                'Cannabis' => 0,
                'Strawberry' => 0
            ]));
        fclose($fw);
    }

    $statistics = false;
    if (filesize($fileName)) {
        $fr = fopen($fileName, 'r');
        $file = fread($fr, filesize($fileName));
        $statistics = json_decode($file);
        fclose($fr);
    }
    return $statistics;
}