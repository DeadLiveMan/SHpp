<?php
require APP_DIRECTORY . 'IMessagesDataBase.php';

class JsonMessagesDataBase implements IMessagesDataBase {

    private $filePath;
    private $messageDataBase;
    private const SEND_ERROR = '-1';
    private const SEND_OK = '0';
    private const EMPTY_LOGIN = 'login is empty';
    private const EMPTY_MESSAGE = 'message is empty';

    public function __construct($filePath) {
        $this->filePath = $filePath;
        $this->messageDataBase = json_decode(file_get_contents($this->filePath), true);
    }

    public function read($timeLastMessage) {
        if ($timeLastMessage <= 0) {
            return file_get_contents($this->filePath);
        }
        $messages = [];
        foreach ($this->messageDataBase as $value) {
            if ($value[0] > $timeLastMessage) {
                $messages[] = $value;
            }
        }
        return json_encode($messages);
    }

    public function write($login, $message) {
        if (!$login) return self::EMPTY_LOGIN;
        if (!$message) return self::EMPTY_MESSAGE;

        $time = round(microtime(true) * 1000);
        // add new user in array
        $this->messageDataBase[] = [$time, $login, $message];
        // write to file new array
        if (file_put_contents($this->filePath, json_encode($this->messageDataBase, JSON_PRETTY_PRINT))) {
            return self::SEND_OK;
        }
        return self::SEND_ERROR;
    }

    // if changed - return true
    public function checkChanges($value) {
        return filesize($this->filePath) !== $value;
    }
}