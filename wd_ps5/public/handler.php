<?php

if (!$_POST) {
    http_response_code(404);
    return;
}

if (!isset($_POST['command'])) {
    return;
}

define('APP_DIRECTORY', dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app');
$config = require_once APP_DIRECTORY . DIRECTORY_SEPARATOR . 'config'. DIRECTORY_SEPARATOR . 'config.php';

session_start();

// classes autoloader
use App\{ ErrorLogs, Messenger, JsonMessagesDataBase, UserHandler, JsonUsersDataBase, Validator };
spl_autoload_register(function ($className) {
    require_once(
        dirname( __DIR__)
        . DIRECTORY_SEPARATOR
        . str_replace('\\', DIRECTORY_SEPARATOR ,$className)
        . '.php'
    );
});

$errorLogs = new ErrorLogs();
$messenger = new Messenger(new JsonMessagesDataBase($config['filePathChat']));
$userHandler = new UserHandler(new JsonUsersDataBase($config['filePathUsers']));
$validator = new Validator($errorLogs);

switch ($_POST['command']) {
    case 'auth':
        $login = $_POST['login'] ?? '';
        $pass = $_POST['pass'] ?? '';
        $login = trim($login);

        if (!$validator->isValid($login, $pass)) {
            break;
        }

        if (!$userHandler->userExist($login)) {
            if (!$userHandler->registration($login, $pass)) {
                $errorLogs->setServerError('Error create new user');
                break;
            }
        } else {
            if (!$userHandler->authorize($login, $pass)) {
                $errorLogs->setErrorPassword('Wrong password');
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
        if ($login == '' || $message == '') { break; }
        if (!$validator->checkMessageLength($message)) { break; }
        $message = trim($message);
        if (!$messenger->sendMessage($login, $message)) {
            $errorLogs->setServerError('Message not send');
        }
        break;
    case 'read':
        $lastMessageTime = $_POST['lastTime'] ?? '';
        $login = $_SESSION['login'] ?? '';

        if ($lastMessageTime !== '' && $login !== '') {
            if (+$lastMessageTime === 0) {
                $date = new DateTime();
                $lastMessageTime = round(microtime(true) * 1000) - $config['timeForOldPosts'];
            }
            echo $messenger->readMessages($lastMessageTime);
            return;
        }
        break;
    default:
        $errorLogs->setServerError('Error command');
        break;
}
echo(json_encode($errorLogs->getErrors()));
