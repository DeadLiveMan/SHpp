<?php
class Auth
{

    private $filePathUsers;
    private const PASSWORD_WRONG = 'Wrong password';
    private const CORRECT_RESPONSE = '0';
    private const SERVICE_ERROR = 'Service is temporarily unavailable';
    private const LOGIN_INCORRECT = 'Incorrect login symbols';
    private const PASSWORD_INCORRECT = 'Incorrect password symbols';

    private const VALID_LOGIN = '/(^[a-zA-Z]+([a-zA-Z0-9][\s]?)*$)/';
    private const VALID_PASSWORD = '/(^[a-zA-Z0-9]+$)/';

    public function __construct(IUsersDataBase $filePathUsers)
    {
        $this->filePathUsers = $filePathUsers;
    }

    public function login($login, $pass)
    {
        $login = trim($login);
        if (!preg_match(self::VALID_LOGIN, $login)) {
            echo self::LOGIN_INCORRECT;
            return;
        }

        if (!preg_match(self::VALID_PASSWORD, $pass)) {
            echo self::PASSWORD_INCORRECT;
            return;
        }

        if(isset($login, $pass)) {
            if ($this->filePathUsers->checkUser($login)) {
                echo $this->auth($login, $pass);
            } else {
                echo $this->registration($login, $pass);
            }
        }
    }

    /*
     * Error = return error message
     * ok = return 0
     */
    private function auth($login, $pass)
    {
        if ($this->filePathUsers->read($login) !== $pass) {
            return self::PASSWORD_WRONG;
        }
        $_SESSION['login'] = $login;
        return self::CORRECT_RESPONSE;
    }

    /*
     * Error = return error message
     * ok = return 0
    */
    private function registration($login, $pass)
    {
        if ($this->filePathUsers->write($login, $pass)) {
            $_SESSION['login'] = $login;
            return self::CORRECT_RESPONSE;
        }
        return self::SERVICE_ERROR;
    }
}