<?php

use Core\Database;
use Core\App;

// instance of db class you can call its methods by providing the appropriate methods signature

$db = App::resolve(Database::class);
// Create Note
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];
    $password = $data['password'];
    $user = $data['user'];
    $db->query("INSERT INTO users (email, password, userName) VALUES (:email, :password,:user)",
        ['email' => $email, 'password' => password_hash($password, PASSWORD_DEFAULT), 'user' => $user]);
    echo json_encode(['message' => 'User Added Successfully!']);
}