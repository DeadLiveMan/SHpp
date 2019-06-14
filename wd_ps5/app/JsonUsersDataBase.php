<?php

namespace App;

class JsonUsersDataBase implements IUsersDataBase
{

    private $filePath;
    private $dbUsers;

    public function __construct($filePath)
    {
        $this->filePath = $filePath;
        $this->dbUsers = json_decode(file_get_contents($this->filePath), true);
    }

    public function read($login)
    {
        if ($this->checkUser($login)) {
            return $this->dbUsers[$login];
        }
        return false;
    }

    public function write($login, $pass)
    {
        $this->dbUsers[$login] = $pass;
        return file_put_contents($this->filePath, json_encode($this->dbUsers, JSON_PRETTY_PRINT));
    }

    public function checkUser($login)
    {
        return isset($this->dbUsers[$login]);
    }
}
