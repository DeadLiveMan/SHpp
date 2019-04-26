<?php
$config = require dirname(__DIR__, 1) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR  . 'config.php';
session_start();

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
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
<?php
    if (isset($_SESSION['login'])) {
        require($config['filePathLogoutForm']);
}
?>
<div class="content">
    <div class="main-text">
        Easy Chat
    </div>
    <div class="main-form">
        <?php
            if (isset($_SESSION['login'])) {
                require($config['filePathChatForm']);
            } else {
                require($config['filePathLoginForm']);
            }
        ?>
    </div>
</div>
</body>
</html>
