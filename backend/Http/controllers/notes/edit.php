<?php

use Core\Database;
use Core\App;


$db = App::resolve(Database::class);
// Handle the edit request
$data = json_decode(file_get_contents('php://input'), true);


$noteContent = $data['body'];
$noteId = $data['id'];
$noteText = $noteContent['content'];
$title = $noteContent['title'];
$archived = $noteContent['isArchived'];
$tags = $noteContent['tags'];
$db->query("UPDATE notes t
            SET t.title     = :title,
            t.content   = :content,
            t.lastEdited=Now(),
            naew=FALSE,
            isArchived=:archived
            WHERE t.id = :id", [
    'content' => $noteText,
    'id' => $noteId,
    'title' => $title,
    'archived' => $archived
]);

echo json_encode(['message' => 'Note updated']);
