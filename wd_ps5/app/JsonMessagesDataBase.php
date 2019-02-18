<?php

namespace ps5;

require APP_DIRECTORY . 'IMessagesDataBase.php';

class JsonMessagesDataBase implements IMessagesDataBase
{

    private $filePath;
    private $messageDataBase;

    public function __construct($filePath)
    {
        $this->filePath = $filePath;
        $this->messageDataBase = file_get_contents($this->filePath);
    }

    public function read($timeLastMessage)
    {
        if (!$this->messageDataBase) {
            return false;
        }

        if ($timeLastMessage <= 0) {
            return $this->messageDataBase;
        }

        $messageDB = json_decode($this->messageDataBase);
        $messages = [];
        foreach ($messageDB as $value) {
            if ($value[0] > $timeLastMessage) {
                $messages[] = $value;
            }
        }
        return json_encode($messages);
    }

    public function write($login, $message)
    {
        if ($login === '') return false;
        if ($message === '') return false;

        // decode html special chars
        $message = htmlentities($message,ENT_QUOTES);

        $time = round(microtime(true) * 1000);

        $messageDB = json_decode($this->messageDataBase);
        // add new user in array
        $messageDB[] = [$time, $login, $message];
        // write to file new array
        return file_put_contents($this->filePath, json_encode($messageDB, JSON_PRETTY_PRINT));
    }

    public function checkChanges($lastTime)
    {
        $db = json_decode(file_get_contents($this->filePath), true);
        $currentTime = $db[count($db) - 1][0];
        if ($currentTime !== $lastTime) {
             $lastTime = $currentTime;
        }
        return $lastTime;
    }
}