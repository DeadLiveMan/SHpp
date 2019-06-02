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
        //$pre->bindParam(":message",$message);
        $pre->execute();

        $data = [];
        while ($result = $pre->fetch(PDO::FETCH_ASSOC)) {
            if (+$result['created_at'] > $timeLastMessage) {
                $data[] = [
                    'time' => +$result['created_at'],
                    'user' => $result['username'],
                    'message' => htmlentities($result['message'],ENT_QUOTES)
                ];
            }
        }
        return json_encode($data);
    }

    public function write($login, $message)
    {
        if ($login === '' || $message === '') return false;

        $time = round(microtime(true) * 1000);

        $sql = "INSERT INTO messages (username, message, created_at) VALUES ('$login', '$message', '$time')";
        return $this->pdo->exec($sql);
    }
}