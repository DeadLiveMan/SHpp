<?php
    define('ROOT_DIRECTORY', '..'.DIRECTORY_SEPARATOR);

    return [
        'filePathUsers' => ROOT_DIRECTORY.'db'.DIRECTORY_SEPARATOR.'users.json',
        'filePathChat' => ROOT_DIRECTORY.'db'.DIRECTORY_SEPARATOR.'chat.json',

        'filePathLoginForm' => ROOT_DIRECTORY.'app'.DIRECTORY_SEPARATOR.'templates'.DIRECTORY_SEPARATOR.'login.php',
        'filePathChatForm' => ROOT_DIRECTORY.'app'.DIRECTORY_SEPARATOR.'templates'.DIRECTORY_SEPARATOR.'chat.php',
        'filePathLogoutForm' => ROOT_DIRECTORY.'app'.DIRECTORY_SEPARATOR.'templates'.DIRECTORY_SEPARATOR.'logout.php'
    ];