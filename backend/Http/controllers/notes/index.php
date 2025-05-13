<?php

use Core\Database;
use Core\App;
use Core\Session;

// instance of db class you can call its methods by providing the appropriate methods signature

$db = App::resolve(Database::class);
$userId = SESSION::get('user')['id'];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
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
        http_response_code(200);
        echo json_encode($notes);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode('ERROR FETCHING USER NOTE: ' . $e->getMessage());
    }
}