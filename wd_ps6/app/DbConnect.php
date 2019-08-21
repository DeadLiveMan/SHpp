<?php


namespace App;
use PDO, PDOException;

class DbConnect
{
    private $pdo;
    public function __construct($dbConfig)
    {
        $pdo = null;
        $dbHost = $dbConfig['dbhost'];
        $dbUser = $dbConfig['dbuser'];
        $dbPassword = $dbConfig['dbpassword'];
        $dbName = $dbConfig['dbname'];
        try {
            $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPassword);
        } catch (PDOException $e) {

        }
        $this->pdo = $pdo;
    }

    public function getPdo() {
        return $this->pdo;
    }
}