<?php
class Auth
{

    private $filePathUsers;
    private const PASSWORD_WRONG = 'Wrong password';
    private const CORRECT_RESPONSE = '0';
    private const SERVICE_ERROR = 'Service is temporarily unavailable';

    public function __construct(IUsersDataBase $filePathUsers)
    {
        $this->filePathUsers = $filePathUsers;
    }

    public function login($login, $pass)
    {
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