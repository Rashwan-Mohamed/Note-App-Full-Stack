<?php

use Core\Database;
use Core\App;
use Core\Session;

// instance of db class you can call its methods by providing the appropriate methods signature

$db = App::resolve(Database::class);
// Create Note
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['id'])) {
        echo json_encode(['error' => 'id is required']);
        http_response_code(400);
        exit;
    }

    $userId = SESSION::get('user')['id'];
    $db->query("INSERT INTO notes (title, userId)
        SELECT CONCAT('untitled_', COUNT(*) + 2), :id
        FROM notes
        WHERE userId = :id AND title LIKE 'untitled_%';", ['id' => $userId]);
    http_response_code(200);
    echo json_encode(['message' => 'Note created']);
}