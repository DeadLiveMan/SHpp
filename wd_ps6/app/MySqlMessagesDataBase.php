<?php
namespace App;
use PDO;

class MySqlMessagesDataBase implements IMessagesDataBase
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

    public function read($timeLastMessage)
    {
        $sql = 'SELECT messages.created_at, messages.message, users.username
                FROM messages
                INNER JOIN users ON messages.user_id=users.id
                WHERE created_at > :timeLastMessage';

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
        $userId = $this->getUserId($login);
        if($userId == null) return false;

        $time = round(microtime(true) * 1000);

        $sql = 'INSERT INTO messages (user_id, message, created_at) 
                VALUES (:userId, :message, :time)';
        $pre = $this->pdo->prepare($sql);

        $pre->execute([
            'userId' => $userId,
            'message' => $message,
            'time' => $time
        ]);
        return true;
    }

    private function getUserId($login) {
        $sql = 'SELECT users.id
                FROM users WHERE users.username = :login';
        $pre = $this->pdo->prepare($sql);
        $pre->execute([
            'login' => $login
        ]);
        return $pre->fetch()[0];
    }
}