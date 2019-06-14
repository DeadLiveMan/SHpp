<?php

namespace App;

class Validator
{
    private const MIN_LOGIN_LENGTH = 3;
    private const MAX_LOGIN_LENGTH = 18;
    private const MIN_PASSWORD_LENGTH = 3;
    private const MAX_PASSWORD_LENGTH = 16;
    private const PASSWORD_INCORRECT_LENGTH = 'Incorrect password length';
    private const LOGIN_INCORRECT_LENGTH = 'Incorrect login length';
    private const LOGIN_INCORRECT = 'Incorrect login symbols';
    private const PASSWORD_INCORRECT = 'Incorrect password symbols';

    private const VALID_LOGIN = '/(^[a-zA-Z]+([a-zA-Z0-9][\s]?)*$)/';
    private const VALID_PASSWORD = '/(^[a-zA-Z0-9]+$)/';
    private const MAX_MESSAGE_LENGTH = 255;

    private $errorLogs;

    public function __construct(ErrorLogs $errorLogs)
    {
        $this->errorLogs = $errorLogs;
    }

    private function checkLogin($login)
    {
        if (!preg_match(self::VALID_LOGIN, $login)) {
            $this->errorLogs->setErrorLogin(self::LOGIN_INCORRECT);
        }
    }

    private function checkLoginLength($login)
    {
        if(mb_strlen($login) > self::MAX_LOGIN_LENGTH || mb_strlen($login) < self::MIN_LOGIN_LENGTH) {
            $this->errorLogs->setErrorLogin(self::LOGIN_INCORRECT_LENGTH);
        }
    }

    private function checkPassword($password)
    {
        if (!preg_match(self::VALID_PASSWORD, $password)) {
            $this->errorLogs->setErrorPassword(self::PASSWORD_INCORRECT);
        }
    }

    private function checkPasswordLength($password) {
        if(mb_strlen($password) > self::MAX_PASSWORD_LENGTH || mb_strlen($password) < self::MIN_PASSWORD_LENGTH) {
            $this->errorLogs->setErrorPassword(self::PASSWORD_INCORRECT_LENGTH);
        }
    }

    public function checkMessageLength($message) {
        if (mb_strlen($message) > self::MAX_MESSAGE_LENGTH) {
            $this->errorLogs->setServerError('Message to long, max symbols - ' . self::MAX_MESSAGE_LENGTH);
            return false;
        }
        return true;
    }

    public function isValid($login, $password)
    {
        $this->checkLogin($login);
        $this->checkPassword($password);
        $this->checkLoginLength($login);
        $this->checkPasswordLength($password);
        return !$this->errorLogs->isError();
    }
}
