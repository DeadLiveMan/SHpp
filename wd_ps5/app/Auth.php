<?php
class Auth {

    private $filePathUsers;
    private const PASSWORD_WRONG = 'Wrong password';
    private const CORRECT_RESPONSE = '0';
    private const SERVICE_ERROR = 'Service is temporarily unavailable';

    public function __construct($filePathUsers) {
        $this->filePathUsers = $filePathUsers;
    }

    public function login($login, $pass) {
        if(isset($login, $pass)) {
            // read all users in array
            $dbUsers = json_decode(file_get_contents($this->filePathUsers), true);
            if (array_key_exists($login, $dbUsers)) {
                echo $this->auth($login, $pass, $dbUsers);
            } else {
                echo $this->registration($login, $pass, $dbUsers);
            }
        }
    }

    /*
     * Error = return error message
     * ok = return 0
     */
    private function auth($login, $pass, $dbUsers) {
        if ($dbUsers[$login] !== $pass) {
            return self::PASSWORD_WRONG;
        }
        $_SESSION['login'] = $login;
        return self::CORRECT_RESPONSE;
    }

    /*
     * Error = return error message
     * ok = return 0
    */
    private function registration($login, $pass, $dbUsers) {
        $dbUsers[$login] = $pass;
        $status = file_put_contents($this->filePathUsers, json_encode($dbUsers, JSON_PRETTY_PRINT));
        if ($status) {
            $_SESSION['login'] = $login;
            return self::CORRECT_RESPONSE;
        }
        return self::SERVICE_ERROR;
    }
}