<?php
define('APP_DIRECTORY', '..'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR);
$config = require APP_DIRECTORY.'config.php';
session_start();

// require classes
require APP_DIRECTORY.'Messenger.php';
require APP_DIRECTORY.'Auth.php';

$auth = new Auth($config['filePathUsers']);
$messenger = new Messenger($config['filePathChat']);

if (isset($_POST['logout'])) {
    session_destroy();
    return;
}

// for send message
if (isset($_POST['message'], $_SESSION['login'])) {
    $message = $_POST['message'];
    if($message) {
        $messenger->sendMessage($_SESSION['login'],$message);
        return;
    }
    return;
}

// for auth/registration
if (isset($_POST['login'], $_POST['pass'])) {
    $login = $_POST['login'];
    $pass = $_POST['pass'];

    if ($login && $pass) {
        $auth->login($login, $pass);
        return;
    }
    return;
}

// for read message
if (isset($_POST['read'], $_SESSION['login'])) {
    $lastMessageTime = $_POST['read'];
    echo $messenger->readMessages($lastMessageTime);
    return;
}

// check for new messages and return current file size
if (isset($_POST['check'], $_SESSION['login'])) {
    $fileSize = $messenger->getFileSize();
    if($fileSize != $_POST['check']) {
        echo $fileSize;
    }
    return false;
}