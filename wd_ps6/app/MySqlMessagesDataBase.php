<?php
namespace App;
use PDO;

class MySqlMessagesDataBase implements IMessagesDataBase
{
    private $pdo;
    private $success;

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

    public function read($timeLastMessage)
    {
        //$timeLastMessage = $timeLastMessage / 1000;
        $sql = "SELECT created_at, username, message FROM messages WHERE created_at > $timeLastMessage";
        $pre = $this->pdo->prepare($sql);
        $pre->execute();

        $messages = [];
        while ($result = $pre->fetch(PDO::FETCH_ASSOC)) {
            array_push($messages, [+$result['created_at'], $result['username'], $result['message'], $timeLastMessage]);
            //$messages = array_reverse($messages);
        }
        return json_encode($messages);
    }

    public function write($login, $message)
    {
        $time = round(microtime(true) * 1000);
        $sql = "INSERT INTO messages (username, message, created_at) VALUES ('$login', '$message', '$time')";
        return $this->pdo->exec($sql);
    }

    public function checkChanges($value)
    {
        $sql = "SELECT * FROM messages ORDER BY id DESC LIMIT 1";
        $pre = $this->pdo->prepare($sql);
        $pre->execute();
        $result = $pre->fetch(PDO::FETCH_ASSOC);
        return ($result['created_at'] != $value) ?? $result['created_at'];
    }
}