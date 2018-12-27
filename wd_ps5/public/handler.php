<?php
define('APP_DIRECTORY', '..'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR);
$config = require APP_DIRECTORY.'config.php';
session_start();

// require classes
require APP_DIRECTORY.'Messenger.php';
require APP_DIRECTORY.'Auth.php';
require APP_DIRECTORY . 'JsonMessagesDataBase.php';
require APP_DIRECTORY . 'JsonUsersDataBase.php';

define('SHOW_MESSAGE_LAST_HOURS', 1);

$dbUsers = new JsonUsersDataBase($config['filePathUsers']);
$auth = new Auth($dbUsers);

$bdMessage = new JsonMessagesDataBase($config['filePathChat']);
$messenger = new Messenger($bdMessage);

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
    if ($lastMessageTime == 0) {
        $lastMessageTime = mktime(date('H') - SHOW_MESSAGE_LAST_HOURS,
                                        date('i'),
                                        date('s'),
                                        date("m"),
                                        date("d"),
                                        date("Y")) * 1000;
    }
    echo $messenger->readMessages($lastMessageTime);
    return;
}

// check for new messages and return current file size
if (isset($_POST['check'], $_SESSION['login'])) {
    echo $messenger->checkChanges($_POST['check']);
    return;
}