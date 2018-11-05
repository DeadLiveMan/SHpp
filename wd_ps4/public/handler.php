<?php
require dirname(__DIR__, 1).DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'function.php';
session_start();


$task = $_POST['task'];

switch($task) {
    case 'task1':
        $_SESSION['result'] = task1($_POST['firstNumber'], $_POST['secondNumber']);
        break;
    case 'task2':
        $_SESSION['result'] = task2($_POST['firstNumber'], $_POST['secondNumber'], $_POST['filter']);
        break;
    case 'task3':
        $_SESSION['result'] = task3($_POST['firstNumber'], $_POST['secondNumber'], $_POST['filter']);
        break;
}

header('location:index.php');
