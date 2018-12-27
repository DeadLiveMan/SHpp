<?php


class Messenger {

    private $messageDataBase;

    public function __construct(IMessagesDataBase $filePathChat) {
        $this->messageDataBase = $filePathChat;
    }

    public function sendMessage($login, $message) {
        $this->messageDataBase->write($login, $message);
    }

    public function readMessages($timeLastMessage) {
        return $this->messageDataBase->read($timeLastMessage);
    }

    public function checkChanges($value) {
        return $this->messageDataBase->checkChanges($value);
    }
}