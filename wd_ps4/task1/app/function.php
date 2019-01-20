<?php

define('ERR_DEF_ARGS', "Wrong arguments");
define('ERR_EMPTY_INPUT', "Input is empty");
define('ERR_WHOLE_NUM', "Input only whole numbers");

function isEmpty(...$value)
{
    foreach ($value as $val) {
        if ($val === '') {
            return true;
        }
    }
    return false;
}

function task1()
{
    $firstNumber = $_POST['firstNumber'];
    $secondNumber = $_POST['secondNumber'];

    if (!isset($firstNumber,$secondNumber)) {
        return ERR_DEF_ARGS;
    }

    if (isEmpty($firstNumber, $secondNumber)) {
        return ERR_EMPTY_INPUT;
    }

    if(!is_numeric($firstNumber) || !is_numeric($secondNumber)) {
        return ERR_WHOLE_NUM;
    }

    if ($firstNumber > $secondNumber) {
        [$firstNumber, $secondNumber] = [$secondNumber, $firstNumber];
    }

    $result = 0;
    for ($i = $firstNumber; $i <= $secondNumber; $i++) {
        $result += $i;
    }
    return $result;
}

function task2()
{
    $firstNumber = $_POST['firstNumber'];
    $secondNumber = $_POST['secondNumber'];
    $filter = $_POST['filter'];

    $regFilter = "/^[0-9](,[0-9])*$/";

    if (!isset($firstNumber, $secondNumber, $filter)) {
        return ERR_DEF_ARGS;
    }

    if (isEmpty($firstNumber, $secondNumber, $filter)) {
        return ERR_EMPTY_INPUT;
    }

    if(!is_numeric($firstNumber) || !is_numeric($secondNumber)) {
        return ERR_WHOLE_NUM;
    }

    if (!preg_match($regFilter, $filter)) {
        return 'wrong filter';
    }

    $filter = explode(",", $filter);

    if ($firstNumber > $secondNumber) {
        [$firstNumber, $secondNumber] = [$secondNumber, $firstNumber];
    }

    $result = 0;
    for ($i = $firstNumber; $i <= $secondNumber; $i++) {
        if(in_array(abs($i % 10), $filter)) {
            $result += $i;
        }
    }
    return $result;
}

function task3()
{
    $heightTriangle = $_POST['heightTriangles'];

    if (!isset($heightTriangle)) {
        return ERR_DEF_ARGS;
    }

    if (isEmpty($heightTriangle)) {
        return ERR_EMPTY_INPUT;
    }

    if (!is_numeric($heightTriangle) || $heightTriangle < 0 ||$heightTriangle > 50) {
        return 'input only 0 to 50 numbers';
    }

    $result = '';
    for ($i = 1; $i <= $heightTriangle; $i++) {
        $result .= str_repeat("*", $i).'<br>';
    }
    return $result;
}

function task4()
{
    $sizeBoard = $_POST['sizeBoard'];

    if (!isset($sizeBoard)) {
        return ERR_DEF_ARGS;
    }

    if (isEmpty($sizeBoard)) {
        return ERR_EMPTY_INPUT;
    }

    $sizeBoard = mb_strtolower($sizeBoard);
    // replace cyrillic letter to latin
    $sizeBoard = str_replace('х', 'x', $sizeBoard);

    if (!preg_match("/^[0-9]+x[0-9]+$/", $sizeBoard)) {
        return 'wrong input size';
    }

    $size = explode('x', $sizeBoard);

    if ($size[0] > 50 || $size[1] > 50) {
        return 'wrong size, max 50';
    }

    $result = '<div class="board">';
    for ($i = 0; $i < $size[0]; $i++) {
        $result .= '<div class="board-column">';
        for ($j = 0; $j < $size[1]; $j++) {
            $result .= (($i + $j) % 2 === 0)? '<div class="square-odd"></div>' : '<div class="square-even"></div>';
        }
        $result .= '</div>';
    }
    $result .= '</div>';
    return $result;
}

function task5()
{
    $number = $_POST['firstNumber'];

    if (!isset($number)) {
        return ERR_DEF_ARGS;
    }

    if (isEmpty($number)) {
        return ERR_EMPTY_INPUT;
    }

    return array_sum(str_split($number));
}

function task6()
{

    $firstNumber = $_POST['firstNumber'];
    $secondNumber = $_POST['secondNumber'];

    if (!isset($firstNumber, $secondNumber)) {
        return ERR_DEF_ARGS;
    }

    if (isEmpty($firstNumber, $secondNumber)) {
        return ERR_EMPTY_INPUT;
    }

    if(!is_numeric($firstNumber) || !is_numeric($secondNumber)) {
        return ERR_WHOLE_NUM;
    }

    $massive = [];
    $result = '';

    for ($i = 0; $i < 100; $i++) {
        $massive[] = rand($firstNumber, $secondNumber);
    }

    $massive = array_unique($massive);
    sort($massive);
    $massive = array_reverse($massive);

    foreach ($massive as $numbers){
        $result .= $numbers.'<br>';
    }
    return $result;
}