<?php
    define('ROOT_DIRECTORY', dirname(__DIR__, 2) . DIRECTORY_SEPARATOR);
    return [
        'db' => [
            'dbhost' => 'localhost',
            'dbuser' => 'root',
            'dbpassword' => '',
            'dbname' => 'wd_ps6',
            'tableMessages' => 'message',
            'tableUsers' => 'users'
        ],

        'filePathLogin' => ROOT_DIRECTORY . 'public' . DIRECTORY_SEPARATOR . 'login.php',
        'filePathChat' => ROOT_DIRECTORY . 'public' . DIRECTORY_SEPARATOR . 'chat.php',

        'maxLoginLength' => 18,
        'maxMessageLength' => 255,
        'timeForOldPosts' => 3600000              //  in ms (3600s x 1000)
    ];