<?php
require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'readStatistics.php';

$statistics = getStatistics();

if (isset($_POST['vote']) && array_key_exists($_POST['vote'], $statistics)) {
    $product = $_POST['vote'];
    $fileName = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'statistics.json';

    $statistics -> $product++;

    file_put_contents($fileName, json_encode($statistics, JSON_PRETTY_PRINT));
}

header('location:../public/piechart.php');