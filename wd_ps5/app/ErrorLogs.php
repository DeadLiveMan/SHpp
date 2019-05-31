<?php

namespace App;

class ErrorLogs
{

    private $logs = [];

    function __construct()
    {
        $this->logs['isError'] = false;
        $this->logs['data']['login'] = '';
        $this->logs['data']['pass'] = '';
        $this->logs['data']['serverError'] = '';
    }

    public function setErrorLogin($message)
    {
        $this->setError()->logs['data']['login'] = $message;
    }

    public function setErrorPassword($message)
    {
        $this->setError()->logs['data']['pass'] = $message;
    }

    public function setServerError($message)
    {
        $this->setError()->logs['data']['serverError'] = $message;
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
        return $this;
    }
}
