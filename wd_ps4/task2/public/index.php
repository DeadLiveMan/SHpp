<?php

require '..'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'readStatistics.php';

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <title>WD_PS4 Voting</title>
</head>
<body>

    <div class="main">
        <div class="content">
            <form action="../app/handler.php" method="post">
                <?php
                $check = 'checked';
                    foreach (getStatistics() as $key => $value) {
                        echo '<label><input type="radio" name="vote" value="'.$key.'" '.$check.'>'.$key.'</label>';
                        $check = '';
                    }
                ?>
                <label><input type="submit"></label>
            </form>
        </div>
    </div>
</body>
</html>
