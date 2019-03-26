<?php

namespace App;

interface IMessagesDataBase
{
    public function read($timeLastMessage);
    public function write($login, $message);
}