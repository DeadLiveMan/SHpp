<?php

if (isset($_SESSION['login'])) {
    header("Location:chat.php");
} else {
    header("Location:login.php");
}
