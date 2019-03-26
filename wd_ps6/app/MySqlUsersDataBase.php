<?php
namespace App;
use PDO;

class MySqlUsersDataBase implements IUsersDataBase
{
    private $pdo;
    private $success = true;

    public function __construct($params)
    {
        $dbhost = $params['dbhost'];
        $dbuser = $params['dbuser'];
        $dbpassword = $params['dbpassword'];
        $dbname = $params['dbname'];
        try {
            $this->pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpassword);

        } catch (\PDOException $e) {
            $this->success = false;
        }

    }

    // return user password
    public function read($login)
    {
        $sql = "SELECT password FROM users WHERE username='$login'";
        $pre = $this->pdo->prepare($sql);
        $pre->execute();
        $result = $pre->fetch(PDO::FETCH_ASSOC);
        return $result['password'];
    }

    // write new user to db
    public function write($login, $pass)
    {
        $sql = "INSERT INTO users (username, password) VALUES ('$login', '$pass')";
        $this->pdo->exec($sql);
        return $this->success;
    }

    // return true if user exist
    public function checkUser($login)
    {
        $sql = "SELECT username FROM users WHERE username='$login'";
        $pre = $this->pdo->prepare($sql);
        $pre->execute();
        $result = $pre->fetch(PDO::FETCH_ASSOC);

        return $result ? true : false;
    }
}