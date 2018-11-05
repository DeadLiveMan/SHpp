<?php
session_start();
$task = $_POST['task'];

function isEmpty($value) {
    for ($i = 0; $i < count($value); $i++ ) {
        if ($value[$i] == '') {
            return true;
        }
    }
    return false;
}

// Task 1
function task1() {
    $firstNumber = $_POST['firstNumber'];
    $secondNumber = $_POST['secondNumber'];

    if (!(isset($firstNumber) && isset($secondNumber))) {
        return 'something wrong in task1';
    }

    if (isEmpty([$firstNumber, $secondNumber])) {
        return 'inputs is empty';
    }

    if (!is_numeric($firstNumber) && !is_numeric($secondNumber)) {
        return 'input only numbers';
    }

    if($firstNumber != (int)$firstNumber || $secondNumber != (int)$secondNumber) {
        return 'input only whole numbers';
    }

    if ($firstNumber > $secondNumber) {
        $tempNumber = $firstNumber;
        $firstNumber = $secondNumber;
        $secondNumber = $tempNumber;
    }

    $result = 0;
    for ($i = $firstNumber; $i <= $secondNumber; $i++) {
        $result += $i;
    }
    return $result;
}

// Task 2
function task2() {
    $firstNumber = $_POST['firstNumber'];
    $secondNumber = $_POST['secondNumber'];
    $filter = $_POST['filter'];

    if (!(isset($firstNumber) && isset($secondNumber)) && isset($filter)) {
        return 'something wrong in task1';
    }

    if (isEmpty([$firstNumber, $secondNumber, $filter])) {
        return 'inputs is empty';
    }

    $filter = explode(",", $filter);

    if (!is_numeric($firstNumber) && !is_numeric($secondNumber)) {
        return 'input only numbers';
    }

    if($firstNumber != (int)$firstNumber || $secondNumber != (int)$secondNumber) {
        return 'input only whole numbers';
    }

    if ($firstNumber > $secondNumber) {
        $tempNumber = $firstNumber;
        $firstNumber = $secondNumber;
        $secondNumber = $tempNumber;
    }

    $result = 0;
    for ($i = $firstNumber; $i <= $secondNumber; $i++) {
        if(in_array(abs($i % 10), $filter)) {
            $result += $i;
        }
    }
    return $result;
}



$_SESSION['result'] = $task();
header('location:public/index.php');