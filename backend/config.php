<?php


    return [
        'env' => 'production', // change to 'local' when developing locally

        'database' => [
            'production' => [
                'host' => 'sql213.infinityfree.com',
                'port' => 3306,
                'dbname' => 'if0_39073653_notes',
                'charset' => 'utf8mb4',
                'user' => 'if0_39073653',
                'password' => 'tTJ2IBAp9aFg',
            ],
            'local' => [
                'host' => 'localhost',
                'port' => 3306,
                'dbname' => 'notes',
                'charset' => 'utf8mb4',
                'user' => 'root',
                'password' => '123321',
            ],
        ],
    ];
