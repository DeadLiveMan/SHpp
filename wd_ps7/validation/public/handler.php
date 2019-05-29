<?php
session_start();

$data = [
    'ip' => [
        'value' => $_POST['ip'] ?? '',
        'reg' => '/^((([0-1]?\d?\d)|(2[0-5]{2}))\.){3}(([0-1]?\d?\d)|(2[0-5]{2}))$/'
    ],
    'url' => [
        'value' => $_POST['url'] ?? '',
        'reg' => '/^(http[s]?:\/\/)?(www\.)?(\w+\.)\w+(\.\w+)*((\/.*)?)*$/'
    ],
    'email' => [
        'value' => $_POST['email'] ?? '',
        'reg' => '/\w+(\.\w+)*@\w+(\.\w+)+/'
    ],
    'date' => [
        'value' => $_POST['date'] ?? '',
        'reg' => '/^((0[1-9])|(1[0-2]))\/((0[1-9])|([1-2][0-9])|(3[0-1]))\/[0-9]{4}$/'
    ],
    'time' => [
        'value' => $_POST['time'] ?? '',
        'reg' => '/^(([0-1][0-9])|(2[0-3]))(:([0-5][0-9])){2}$/'
    ]
];


$validData  = [
    'isValid' => true,
    'values' => [],
    'errors' => []
];

foreach ($data as $key => $value) {
    $validData = isValid($key, $value, $validData);
}

//var_dump($validData);
$_SESSION['response'] = $validData;
header('Location: index.php');


function isValid($key, $value, $validData) {
    if (!$value['value']) {
        $validData['isValid'] = false;
        $validData['errors'][$key] = 'empty ' . $key;
    } elseif (!preg_match($value['reg'], $value['value'])) {
        $validData['isValid'] = false;
        $validData['errors'][$key] = 'wrong ' . $key;
    }
    $validData['values'][$key] = $value['value'];
    return $validData;
}