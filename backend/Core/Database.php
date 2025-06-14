<?php

    namespace Core;

    use PDO;
    use PDOException;

    class Database
    {
        public mixed $connection;
        public $statement;

        public function __construct($config)
        {
            $env = $config['env'] ?? 'production';
            $dbConfig = $config['database'][$env];

            $dsn = sprintf(
                'mysql:host=%s;port=%d;dbname=%s;charset=%s',
                $dbConfig['host'],
                $dbConfig['port'],
                $dbConfig['dbname'],
                $dbConfig['charset']
            );
            try {
                $this->connection = new PDO($dsn, $dbConfig['user'],
                    $dbConfig['password'], [
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION // Enables throwing exceptions on errors
                    ]);
            } catch (PDOException $e) {
                die("Database connection failed: " . $e->getMessage());
            }
        }

        public function query($query, $params = [])
        {
            try {
                $this->statement = $this->connection->prepare($query);
                $this->statement->execute($params);
                return $this;
            } catch (PDOException $e) {
                die("Query Failed: " . $e->getMessage()); // Shows MySQL errors
            }
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