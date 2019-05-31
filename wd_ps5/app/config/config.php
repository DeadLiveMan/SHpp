<?php
    define('ROOT_DIRECTORY', dirname(__DIR__, 2) . DIRECTORY_SEPARATOR);
    return [
        'filePathUsers' => ROOT_DIRECTORY . 'db' . DIRECTORY_SEPARATOR . 'users.json',
        'filePathChat' => ROOT_DIRECTORY . 'db' . DIRECTORY_SEPARATOR . 'chat.json',

        'filePathLoginForm' => ROOT_DIRECTORY . 'public' . DIRECTORY_SEPARATOR . 'login.php',
        'filePathChatForm' => ROOT_DIRECTORY . 'public' . DIRECTORY_SEPARATOR . 'chat.php',
        'filePathLogoutForm' => ROOT_DIRECTORY . 'app' . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'logout.php',

        'maxLoginLength' => 18,
        'maxMessageLength' => 255,
        'timeForOldPosts' => 1              //  in hours
    ];
