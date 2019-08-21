<?php
namespace App;
use PDO;

class MySqlUsersDataBase implements IUsersDataBase
{
    private $pdo;
    private $success = true;

    public function __construct($pdo)
    {
        if($pdo == null) {
            $this->success = false;
        }
        $this->pdo = $pdo;
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
        $pass = password_hash($pass, PASSWORD_DEFAULT);

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