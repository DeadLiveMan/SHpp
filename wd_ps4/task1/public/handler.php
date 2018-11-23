<?php
session_start();
require dirname(__DIR__, 1).DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'function.php';
$task = $_POST['task'];
$_SESSION['result'] = (function_exists($task))? $task() : 'function not exist';
header('location:index.php');
