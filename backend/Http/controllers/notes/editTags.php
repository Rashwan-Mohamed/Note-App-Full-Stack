<?php


use Core\Database;
use Core\App;


$db = App::resolve(Database::class);
// Handle the edit request
$data = json_decode(file_get_contents('php://input'), true);
$tags = $data['body'];
$noteId = $data['noteId'];
$operation = $data['operation'];

//var_dump($data);
//exit();
if ($operation == 'remove') {
    foreach ($tags as $tag) {
        $db->query("DELETE FROM notes.tags WHERE name=:tag AND noteId=:noteId", ['tag' => $tag,'noteId'=>$noteId]);
    }
}
if ($operation == 'add') {
    foreach ($tags as $tag) {
        $db->query("INSERT INTO notes.tags (name,noteId) VALUES (:tag,:noteId)", ['tag' => $tag,'noteId' => $noteId]);
    }
}


