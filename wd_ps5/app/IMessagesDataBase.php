<?php

interface IMessagesDataBase
{
    public function read($timeLastMessage);
    public function write($login, $message);
    public function checkChanges($value);
}