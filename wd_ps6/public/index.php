<?php
session_start();

if(!isset($_SESSION['login'])) {
    header('Location:login.php');
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
    <title>Welcome to Chat</title>
    <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">

</head>
<body>
<div class="header">
    <div class="header-square"></div>
    <div class="header-square"></div>
</div>
<div class="logout">
    <div id="logout-button">[Logout]</div>
</div>
<div class="content">
    <div id="main-text">
        <?= ("Hello $_SESSION[login]"); ?>
    </div>
    <div class="main-form">
        <div id="chat-box"></div>
        <form id="chat-form" onsubmit="return false" autocomplete="off" class="form-chat">
            <input id="message" type="text" name="message" placeholder="Enter Message">
            <input id="send-message" type="submit" value="Send">
        </form>
        <div class="error"></div>
    </div>
</div>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script src='script/chat.js'></script>
</body>
</html>
