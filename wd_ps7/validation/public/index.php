<?php session_start() ?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>WD_PS7</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

<div class="content">
    <form action="handler.php" method="post" autocomplete="off">
        <div class="input">
            <label for="ip">IP: </label>
            <input class="on-validation ip" type="text" name="ip" id="ip" value="<?php echo $_SESSION['response']['values']['ip'] ?? ''; ?>">
        </div>

        <div class="input">
            <label for="url">URL: </label>
            <input class="on-validation url" type="text" name="url" id="url" value="<?php echo $_SESSION['response']['values']['url'] ?? ''; ?>">
        </div>

        <div class="input">
            <label for="email">EMAIL: </label>
            <input class="on-validation email" type="text" name="email" id="email" value="<?php echo $_SESSION['response']['values']['email'] ?? ''; ?>" autocomplete="off">
        </div>

        <div class="input">
            <label for="date">DATE: </label>
            <input class="on-validation date" type="text" name="date" id="date" value="<?php echo $_SESSION['response']['values']['date'] ?? ''; ?>">
        </div>

        <div class="input">
            <label for="time">TIME: </label>
            <input class="on-validation time" type="text" name="time" id="time" value="<?php echo $_SESSION['response']['values']['time'] ?? ''; ?>">
        </div>

        <div class="button">
            <input type="submit" value="Send">
        </div>
    </form>

</div>

<script src="js/script.js"></script>

</body>
</html>

<?php session_destroy();