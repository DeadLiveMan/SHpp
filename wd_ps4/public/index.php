<?php //require __DIR__.DIRECTORY_SEPARATOR.'function.php'
session_start();
session_destroy();
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PHP</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="content">
    <div class="tasks">

        <div class="task">
            <form action="function.php" method="post" autocomplete="off">
                <label>
                    <span>1) посчитать сумму чисел от -1000 до 1000</span>
                    <input type="text" name="firstNumber" value="-1000">
                    <input type="text" name="secondNumber" value="1000">
                    <input type="hidden" name="task" value="task1">
                    <input type="submit" value="Посчитать">
                </label>
            </form>
        </div>

        <div class="task">
            <form action="function.php" method="post" autocomplete="off">
                <label>
                    <span>2) посчитать сумму чисел от -1000 до 1000, суммируя только числа которые заканчиваются на 2,3, и 7</span>
                    <input type="text" name="firstNumber" value="-1000">
                    <input type="text" name="secondNumber" value="1000">
                    <input type="text" name="filter" value="2,3,7">
                    <input type="hidden" name="task" value="task2">
                    <input type="submit" value="Посчитать">
                </label>
            </form>
        </div>


    </div>
    <div class="result">
        <?php
        if(isset($_SESSION['result'])) {
            echo $_SESSION['result'];
        }
        ?>
    </div>
</div>

</body>
</html>