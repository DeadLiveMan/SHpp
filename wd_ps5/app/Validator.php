<?php

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

    private $errorLogs;

    public function __construct(ErrorLogs $errorLogs)
    {
        $this->errorLogs = $errorLogs;
    }

    private function checkLogin($login)
    {
        if (!preg_match(self::VALID_LOGIN, $login)) {
            $this->errorLogs->addErrorLogin(self::LOGIN_INCORRECT);
        }
    }

    private function checkLoginLength($login)
    {
        if(strlen($login) > self::MAX_LOGIN_LENGTH || strlen($login) < self::MIN_LOGIN_LENGTH) {
            $this->errorLogs->addErrorLogin(self::LOGIN_INCORRECT_LENGTH);
        }
    }

    private function checkPassword($password)
    {
        if (!preg_match(self::VALID_PASSWORD, $password)) {
            $this->errorLogs->addErrorPassword(self::PASSWORD_INCORRECT);
        }
    }

    private function checkPasswordLength($password) {
        if(strlen($password) > self::MAX_PASSWORD_LENGTH || strlen($password) < self::MIN_PASSWORD_LENGTH) {
            $this->errorLogs->addErrorPassword(self::PASSWORD_INCORRECT_LENGTH);
        }
    }

    public function isValid($login, $password)
    {
        $this->checkLogin($login);
        $this->checkPassword($password);
        $this->checkLoginLength($login);
        $this->checkPasswordLength($password);
        return $this->errorLogs->isSuccess();
    }

}