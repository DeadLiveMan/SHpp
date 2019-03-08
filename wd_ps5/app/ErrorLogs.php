<?php

namespace App;

class ErrorLogs
{

    private $logs = [];

    function __construct()
    {
        $this->logs['success'] = true;
        $this->logs['messages']['login'] = false;
        $this->logs['messages']['pass'] = false;
        $this->logs['messages']['serverError'] = false;
    }

    public function addErrorLogin($message)
    {
        $this->setError();
        $this->logs['messages']['login'] = $message;
    }

    public function addErrorPassword($message)
    {
        $this->setError();
        $this->logs['messages']['pass'] = $message;
    }

    public function addServerError($message)
    {
        $this->setError();
        $this->logs['messages']['serverError'] = $message;
    }

    public function isSuccess()
    {
        return $this->logs['success'];
    }

    public function getErrors()
    {
        return $this->logs;
    }

    private function setError()
    {
        $this->logs['success'] = false;
    }
}