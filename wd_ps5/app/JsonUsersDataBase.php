<?php
require APP_DIRECTORY . 'IUsersDataBase.php';

class JsonUsersDataBase implements IUsersDataBase {

    private $filePath;
    private $dbUsers;

    public function __construct($filePath) {
        $this->filePath = $filePath;
        $this->dbUsers = json_decode(file_get_contents($this->filePath), true);
    }

    public function read($login) {
        if ($this->checkUser($login)) {
            return $this->dbUsers[$login];
        } else {
            return false;
        }
    }

    public function write($login, $pass) {
        $this->dbUsers[$login] = $pass;
        $status = file_put_contents($this->filePath, json_encode($this->dbUsers, JSON_PRETTY_PRINT));
        if ($status) {
            return true;
        }
        return false;
    }

    public function checkUser($login) {
        return array_key_exists($login, $this->dbUsers);
    }
}