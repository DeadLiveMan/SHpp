<?php
    define('ROOT_DIRECTORY', dirname(__DIR__, 2) . DIRECTORY_SEPARATOR);
    return [
        'db' => [
            'dbhost' => 'localhost',
            'dbuser' => 'root',
            'dbpassword' => '',
            'dbname' => 'wd_ps6'
        ],
        'filePathLoginForm' => ROOT_DIRECTORY.'app'.DIRECTORY_SEPARATOR.'templates'.DIRECTORY_SEPARATOR.'login.php',
        'filePathChatForm' => ROOT_DIRECTORY.'app'.DIRECTORY_SEPARATOR.'templates'.DIRECTORY_SEPARATOR.'chat.php',
        'filePathLogoutForm' => ROOT_DIRECTORY.'app'.DIRECTORY_SEPARATOR.'templates'.DIRECTORY_SEPARATOR.'logout.php'
    ];