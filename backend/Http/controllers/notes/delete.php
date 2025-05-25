<?php

use Core\Database;
use Core\App;


$db = App::resolve(Database::class);
// Handle the edit request
$data = json_decode(file_get_contents('php://input'), true);;
$noteId = $data['id'];

$db->query("DELETE FROM notes WHERE id = :id", [
    'id' => $noteId,
]);

echo json_encode(['message' => 'Note deleted successfully.']);