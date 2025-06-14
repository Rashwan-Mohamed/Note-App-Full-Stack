<?php

use Core\Database;
use Core\Container;
use Core\App;

$container = new Container();
$container->bind('Core\Database', function () {
    try {
        $config = require base_path('config.php');
        return new Database($config);
    } catch (Exception $e) {
        error_log("database binding failed: " . $e->getMessage());
        throw new Exception($e->getMessage());
    }
});

App::setContainer($container);
/*
 *  First sign the user-in by checking whether it has an existing account and the credentials are correct
 *  if correct, create a new session by getting the username and providing notes only for that user
 *  so there has to be middleware to allow registered users only to view the notes
 * */