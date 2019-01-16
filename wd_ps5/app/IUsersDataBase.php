<?php

interface IUsersDataBase
{
    public function read($login);
    public function write($login, $pass);
    public function checkUser($login);
}