<?php

function isEmpty($value) {
    for ($i = 0; $i < count($value); $i++ ) {
        if ($value[$i] == '') {
            return true;
        }
    }
    return false;
}

// Task 1
function task1($firstNumber, $secondNumber) {
    $regWholeNumber = "/^[-]?[0-9]+$/";

    if (!(isset($firstNumber) && isset($secondNumber))) {
        return 'something wrong';
    }

    if (isEmpty([$firstNumber, $secondNumber])) {
        return 'inputs is empty';
    }

    if(!preg_match($regWholeNumber, $firstNumber) || !preg_match($regWholeNumber,$secondNumber)) {
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
function task2($firstNumber, $secondNumber, $filter) {
    $regWholeNumber = "/^[-]?[0-9]+$/";
    $regFilter = "/^[0-9](,[0-9])*$/";

    if (!(isset($firstNumber) && isset($secondNumber)) && isset($filter)) {
        return 'something wrong';
    }

    if (isEmpty([$firstNumber, $secondNumber, $filter])) {
        return 'inputs is empty';
    }

    if(!preg_match($regWholeNumber, $firstNumber) || !preg_match($regWholeNumber,$secondNumber)) {
        return 'input only whole numbers';
    }

    if (!preg_match($regFilter, $filter)) {
        return 'wrong filter';
    }

    $filter = explode(",", $filter);

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

function task3($heightTriangle) {
    $regWholeNumberPositive = "/^[0-9]+$/";

    if (!isset($heightTriangle)) {
        return 'something wrong';
    }

    if (isEmpty([$heightTriangle])) {
        return 'inputs is empty';
    }

    if (!is_numeric($heightTriangle)) {
        return 'input only numbers';
    }

    if(!preg_match($regWholeNumberPositive, $heightTriangle)) {
        return 'input only whole positive numbers';
    }

    if($heightTriangle > 50) {
        return 'input only 0 to 50 numbers';
    }

    $result = '';

    for ($i = 1; $i <= $heightTriangle; $i++) {
        $result .= str_repeat("*", $i).'<br>';
    }

    return $result;
}

function task4($sizeBoard) {

    $result = '';
    $size = explode('x', $sizeBoard);
    $width = $size[0];
    $height = $size[1];

    $result .= '<div class="board">';
    for($i = 0; $i < $width; $i++) {
        $result .= '<div class="board-column">';
        for($j = 0; $j < $height; $j++) {
            if (($i + $j) % 2 == 0) {
                $result .= '<div class="square-odd"></div>';
            } else {
                $result .= '<div class="square-even"></div>';
            }
        }
        $result .= '</div>';
    }
    $result .= '</div>';



    return $result;
}

function task5($number) {


    $result = 0;
    $digits = str_split($number);
    for ($i = 0; $i < count($digits); $i++) {
        $result += $digits[$i];
    }
    return $result;
}

function task6($firstNumber, $secondNumber) {

    $massive = [];
    $result = '';

    for ($i = 0; $i < 100; $i++) {
        $massive[$i] = rand($firstNumber, $secondNumber);
    }

    $massive = array_unique($massive);
    sort($massive);
    $massive = array_reverse($massive);

    for ($i = 0; $i < count($massive); $i++){
        $result .= $massive[$i].'<br>';
    }

    return $result;
}

