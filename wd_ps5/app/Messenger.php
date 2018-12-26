<?php
class Messenger {

    private $filePathChat;
    private const SEND_ERROR = '-1';
    private const SEND_OK = '0';
    private const EMPTY_LOGIN = 'login is empty';
    private const EMPTY_MESSAGE = 'message is empty';
    public function __construct($filePathChat) {
        $this->filePathChat = $filePathChat;
    }

    /*
     * Error = return -1
     * ok = return message time in seconds
    */
    public function sendMessage($login, $message) {
        if (!$login) return self::EMPTY_LOGIN;
        if (!$message) return self::EMPTY_MESSAGE;

        $time = round(microtime(true) * 1000);
        $dbChat = json_decode(file_get_contents($this->filePathChat), true);
        // add new user in array
        $dbChat[] = [$time, $login, $message];
        // write to file new array
        $status = file_put_contents($this->filePathChat, json_encode($dbChat, JSON_PRETTY_PRINT));
        if ($status) {
            return self::SEND_OK;
        }
        return self::SEND_ERROR;
    }

    public function readMessages($timeLastMessage) {
        if ($timeLastMessage <= 0) {
            return file_get_contents($this->filePathChat);
        }
        $messages = [];
        foreach (json_decode(file_get_contents($this->filePathChat), true) as $value) {
            if ($value[0] > $timeLastMessage) {
                $messages[] = $value;
            }
        }
        return json_encode($messages);
    }

    public function getFileSize() {
        return filesize($this->filePathChat);
    }
}