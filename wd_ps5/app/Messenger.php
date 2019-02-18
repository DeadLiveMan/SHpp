<?php

namespace ps5;

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

    public function checkChanges($value)
    {
        return $this->dbMessageHandler->checkChanges($value);
    }
}