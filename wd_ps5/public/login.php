<?php
define('APP_DIRECTORY', dirname(__DIR__, 1) . DIRECTORY_SEPARATOR . 'app');
$config = require APP_DIRECTORY . DIRECTORY_SEPARATOR . 'config'. DIRECTORY_SEPARATOR . 'config.php';

session_start();
if (isset($_SESSION['login'])) {
    header("Location:chat.php");
    return;
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Easy Chat</title>
    <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
</head>
<body>
<div class="header">
    <div class="header-square"></div>
    <div class="header-square"></div>
    <div class="header-square"></div>
    <div class="header-square"></div>
    <div class="header-square"></div>

    <div class="header-square"></div>
    <div class="header-square"></div>
    <div class="header-square"></div>
    <div class="header-square"></div>
    <div class="header-square"></div>
</div>
<div class="content">
    <div class="main-text">
        Easy Chat
    </div>
    <div class="main-form">
        <form onsubmit="return false" autocomplete="off">
            <label for="login">Enter your name</label>
            <input id="login" class="valid" type="text" name="login" placeholder="Enter your name">
            <div id="login-info"></div>
            <label for="password">Enter your password</label>
            <input id="password" class="valid" type="password" name="pass" placeholder="Enter password">
            <div id="password-info"></div>
            <input id="submit" type="submit" value="Login">
        </form>
        <div class="gradient"></div>
    </div>
</div>
</body>
<script src='script/login.js'></script>
</html>
