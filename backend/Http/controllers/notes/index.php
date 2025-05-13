<?php

use Core\Database;
use Core\App;
use Core\Session;

// instance of db class you can call its methods by providing the appropriate methods signature

$db = App::resolve(Database::class);

$userId = $_SESSION['user']['id'];
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $notes = $db->query("SELECT * FROM notes WHERE userId=:id ORDER BY lastEdited DESC", ['id' => $userId])->get(); // get() returns all records

    foreach ($notes as &$note) {
        $tags = $db->query(
            "SELECT name
             FROM tags
             WHERE id IN (
                 SELECT tag_id
                 FROM note_tag
                 WHERE note_id = :id
                  
             )",
            ['id' => $note['id']]
        )->get(); // get() returns array of tag rows

        // Add tags array to each note
        $note['tags'] = array_column($tags, 'name'); // get just the tag names
    }

    echo json_encode($notes);
}