<?php

namespace App;

class ErrorLogs
{

    private $logs = [];

    function __construct()
    {
        $this->logs['isError'] = false;
        $this->logs['data']['login'] = false;
        $this->logs['data']['pass'] = false;
        $this->logs['data']['serverError'] = false;
    }

    public function addErrorLogin($message)
    {
        $this->setError();
        $this->logs['data']['login'] = $message;
    }

    public function addErrorPassword($message)
    {
        $this->setError();
        $this->logs['data']['pass'] = $message;
    }

    public function addServerError($message)
    {
        $this->setError();
        $this->logs['data']['serverError'] = $message;
    }

    public function isError()
    {
        return $this->logs['isError'];
    }

    public function getErrors()
    {
        return $this->logs;
    }

    private function setError()
    {
        $this->logs['isError'] = true;
    }
}