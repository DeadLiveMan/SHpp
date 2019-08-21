<?php

namespace App;

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
        return password_verify($password, $this->dbUsersHandler->read($login));
    }

    public function registration($login, $password)
    {
        return $this->dbUsersHandler->write($login, $password);
    }
}
