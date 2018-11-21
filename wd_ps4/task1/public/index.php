<?php
session_start();
session_destroy();
const HANDLER_PATH = 'handler.php';
?>
<!DOCTYPE html>
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
            <form action="<?= HANDLER_PATH ?>" method="post" autocomplete="off">
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
            <form action="<?= HANDLER_PATH ?>" method="post" autocomplete="off">
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

        <div class="task">
            <form action="<?= HANDLER_PATH ?>" method="post" autocomplete="off">
                <label>
                    <span>
                        3) вывести на страницу список из 50 элементов вида:<br>*<br>* *<br>* * *<br>* * * *<br>…
                    </span>
                    <input type="text" name="heightTriangles" value="50">
                    <input type="hidden" name="task" value="task3">
                    <input type="submit" value="Вывести">
                </label>
            </form>
        </div>

        <div class="task">
            <form action="<?= HANDLER_PATH ?>" method="post" autocomplete="off">
                <label>
                    <span> 4) Шахматная доска</span>
                    <input type="text" name="sizeBoard" value="10x10">
                    <input type="hidden" name="task" value="task4">
                    <input type="submit" value="Вывести">
                </label>
            </form>
        </div>

        <div class="task">
            <form action="<?= HANDLER_PATH ?>" method="post" autocomplete="off">
                <label>
                    <span> 5) Найти сумму цифр введённого числа.</span>
                    <input type="text" name="number" value="123">
                    <input type="hidden" name="task" value="task5">
                    <input type="submit" value="Посчитать">
                </label>
            </form>
        </div>

        <div class="task">
            <form action="<?= HANDLER_PATH ?>" method="post" autocomplete="off">
                <label>
                    <span>
                        6) Сгенерировать массив рандомных целых чисел от 1 до 10, длинна массива 100.
                        Убрать из массива повторы, отсортировать и ревертнуть.
                    </span>
                    <input type="text" name="firstNumber" value="1">
                    <input type="text" name="secondNumber" value="10">
                    <input type="hidden" name="task" value="task6">
                    <input type="submit" value="Вывести">
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