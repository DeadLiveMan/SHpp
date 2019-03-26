<?php

namespace App;

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
        $data = [];
        foreach ($messageDB as $value) {
            if ($value[0] > $timeLastMessage) {
                $data[] = [
                    'time' => $value[0],
                    'user' => $value[1],
                    'message' => htmlentities($value[2],ENT_QUOTES)
                ];
            }
        }
        return json_encode($data);
    }

    public function write($login, $message)
    {
        if ($login === '' || $message === '') return false;

        $time = round(microtime(true) * 1000);

        $messageDB = json_decode($this->messageDataBase);
        // add new user in array
        $messageDB[] = [$time, $login, $message];
        // write to file new array
        return file_put_contents($this->filePath, json_encode($messageDB, JSON_PRETTY_PRINT));
    }
}