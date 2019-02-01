<?php

class UserHandler
{
    private $dbUsersHandler;

    public function __construct(IUsersDataBase $dbUsersHandler)
    {
        $this->dbUsersHandler = $dbUsersHandler;
    }

    public function userExist($login)
    {
        return $this->dbUsersHandler->checkUser($login);
    }

    public function authorize($login, $password)
    {
        return $this->dbUsersHandler->read($login) === $password;
    }

    public function registration($login, $password)
    {
        return $this->dbUsersHandler->write($login, $password);
    }
}