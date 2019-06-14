<?php
namespace App;
use PDO, PDOException;

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

        } catch (PDOException $e) {
            $this->success = false;
        }
    }

    public function read($timeLastMessage)
    {
        $sql = 'SELECT created_at, username, message FROM messages WHERE created_at > :timeLastMessage';
        $pre = $this->pdo->prepare($sql);
        $pre->execute([
            'timeLastMessage' => $timeLastMessage
        ]);

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

        $sql = 'INSERT INTO messages (username, message, created_at) VALUES (:login, :message, :time)';
        $pre = $this->pdo->prepare($sql);
        $pre->execute([
            'login' => $login,
            'message' => $message,
            'time' => $time
                ]);
        return true;
    }
}