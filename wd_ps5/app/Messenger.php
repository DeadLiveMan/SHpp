<?php

namespace App;

class Messenger
{
    private $dbMessageHandler;

    public function __construct(IMessagesDataBase $dbMessageHandler)
    {
        $this->dbMessageHandler = $dbMessageHandler;
    }

    public function sendMessage($login, $message)
    {
        return $this->dbMessageHandler->write($login, $message);
    }

    public function readMessages($timeLastMessage)
    {
        return $this->dbMessageHandler->read($timeLastMessage);
    }
}
