<?php

namespace Core;

use PDO;
use PDOException;

class Database
{
    public mixed $connection;
    public $statement;

    public function __construct($config, $username = 'root', $password = '12345')
    {
        try {
            $dsn = ("mysql:" . http_build_query($config, '', ';'));
            $this->connection = new PDO($dsn, $username, $password, [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
        } catch (PDOException $e) {
            error_log("PDOException: " . $e->getMessage());
            throw new \Exception("PDOException: " . $e->getMessage());
        }
    }

    public function query($query, $params = [])
    {
        $this->statement = $this->connection->prepare($query);
        $this->statement->execute($params);
        return $this;
    }

    public function get()
    {
        return $this->statement->fetchAll();
    }

    public function find()
    {
        return $this->statement->fetchAll();
    }

    public function findOrFail()
    {
        $result = $this->find();
        if (!$result) {
            throw new \Exception("Record not found.");
        }
        return $result;
    }

}