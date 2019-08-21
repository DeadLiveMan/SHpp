<?php
namespace App;
use PDO, PDOException;

class MySqlMessagesDataBase implements IMessagesDataBase
{
    private $pdo;
    private $success;

    public function __construct($db)
    {
        $dbHost = $db['dbhost'];
        $dbUser = $db['dbuser'];
        $dbPassword = $db['dbpassword'];
        $dbName = $db['dbname'];
        try {
            $this->pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPassword);

        } catch (PDOException $e) {
            $this->success = false;
        }
    }

    public function read($timeLastMessage)
    {
        //$sql = 'SELECT created_at, message, user_id FROM messages LEFT JOIN users USING (id) WHERE id = user_id AND created_at > :timeLastMessage';
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