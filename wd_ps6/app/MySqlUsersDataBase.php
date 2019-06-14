<?php
namespace App;
use PDO, PDOException;

class MySqlUsersDataBase implements IUsersDataBase
{
    private $pdo;
    private $success = true;

    public function __construct($params)
    {
        $dbHost = $params['dbhost'];
        $dbUser = $params['dbuser'];
        $dbPassword = $params['dbpassword'];
        $dbName = $params['dbname'];
        try {
            $this->pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPassword);
        } catch (PDOException $e) {
            $this->success = false;
        }
    }

    // return user password
    public function read($login)
    {
        $sql = 'SELECT password FROM users WHERE username=:login';
        $pre = $this->pdo->prepare($sql);
        $pre->execute(['login' => $login]);
        $result = $pre->fetch(PDO::FETCH_ASSOC);
        return $result['password'];
    }

    // write new user to db
    public function write($login, $pass)
    {
        $sql = 'INSERT INTO users (username, password) VALUES (:login, :pass)';
        $pre = $this->pdo->prepare($sql);
        $pre->execute([
            'login' => $login,
            'pass' => $pass
            ]);
        return $this->success;
    }

    // return true if user exist
    public function checkUser($login)
    {
        $sql = 'SELECT username FROM users WHERE username=:login';
        $pre = $this->pdo->prepare($sql);
        $pre->execute(['login' => $login]);
        $result = $pre->fetch(PDO::FETCH_ASSOC);

        return $result ? true : false;
    }
}