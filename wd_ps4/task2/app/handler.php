<?php

require '..'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'readStatistics.php';

$index = $_POST["vote"];
$fileName = '..'.DIRECTORY_SEPARATOR.'public'.DIRECTORY_SEPARATOR.'statistics.json';
$statistics = getStatistics();

$statistics -> $index++;

$fw = fopen($fileName, 'w');
fwrite($fw, json_encode($statistics));
fclose($fw);

header("location:..".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."piechart.php");