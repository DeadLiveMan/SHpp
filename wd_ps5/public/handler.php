<?php

define('APP_DIRECTORY', dirname(__DIR__, 1) . DIRECTORY_SEPARATOR . 'app');
$config = require APP_DIRECTORY . DIRECTORY_SEPARATOR . 'config'. DIRECTORY_SEPARATOR . 'config.php';
session_start();

// classes autoloader
use App\{ ErrorLogs, Messenger, JsonMessagesDataBase, UserHandler, JsonUsersDataBase, Validator };
spl_autoload_register(function ($className) {
    require_once(dirname( __DIR__ ,1) . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR ,$className) . '.php');
});

define('SHOW_MESSAGE_LAST_HOURS', 1);
$errorLogs = new ErrorLogs();
$messenger = new Messenger(new JsonMessagesDataBase($config['filePathChat']));
$userHandler = new UserHandler(new JsonUsersDataBase($config['filePathUsers']));
$validator = new Validator($errorLogs);

if (isset($_POST['command'])) {
    switch ($_POST['command']) {
        case 'auth':
            $login = $_POST['login'] ?? '';
            $pass = $_POST['pass'] ?? '';
            $login = trim($login);

            if (!$validator->isValid($login, $pass)) {
                break;
            }

            if ($userHandler->userExist($login)) {
                if (!$userHandler->authorize($login, $pass)) {
                    $errorLogs->addErrorPassword('Wrong password');
                    break;
                }
            } else {
                if (!$userHandler->registration($login, $pass)) {
                    $errorLogs->addServerError('Error create new user');
                    break;
                }
            }

            $_SESSION['login'] = $login;
            break;
        case 'logout':
            session_destroy();
            break;
        case 'send':
            $login = $_SESSION['login'] ?? '';
            $message = $_POST['message'] ?? '';

            if ($login !== '' && $message !== '') {
                if (!$messenger->sendMessage($login, $message)) {
                    $errorLogs->addServerError('Message not send');
                };
            }
            break;
        case 'read':
            $lastMessageTime = $_POST['lastTime'] ?? '';
            $login = $_SESSION['login'] ?? '';

            if ($lastMessageTime !== '' && $login !== '') {
                if (+$lastMessageTime === 0) {
                    $lastMessageTime = mktime(
                            date('H') - SHOW_MESSAGE_LAST_HOURS,
                            date('i'),
                            date('s'),
                            date("m"),
                            date("d"),
                            date("Y")
                        ) * 1000;
                }
                echo $messenger->readMessages($lastMessageTime);
                return;
            }
            break;
        case 'check':
            $lastMessageTime = $_POST['lastTime'] ?? '';
            $login = $_SESSION['login'] ?? '';

            if ($lastMessageTime !== '' && $login !== '') {
                echo($messenger->checkChanges($lastMessageTime));
                return;
            }
            exit('logout');
            break;
        default:
            $errorLogs->addServerError('Error command');
            break;
    }
    echo(json_encode($errorLogs->getErrors()));
}