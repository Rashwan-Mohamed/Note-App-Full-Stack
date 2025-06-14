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
        // Get the tag_id

        $tagI = $db->query("SELECT id FROM tags WHERE name = :tag", ['tag' => $tag])->findOrFail();
        $tagId = $tagI[0]['id'];
        // Link tag to the note
        $db->query("DELETE FROM note_tag WHERE note_id = :note_id AND tag_id = :tag_id", [
            'note_id' => $noteId,
            'tag_id' => $tagId
        ]);
        try {
            $chNote = $db->query("SELECT note_id FROM note_tag WHERE tag_id = :tag_id", ['tag_id' => $tagId])->findOrFail();
            $hasNoteId = $chNote[0]["note_id"];
        } catch (\Exception $e) {
            $db->query("DELETE FROM note_tag WHERE tag_id = :tag_id", ['tag_id' => $tagId]);

        }

        // check for that tag is no noteId associated with that tagId in note_tag table delete it
    }
}
if ($operation == 'add') {
    foreach ($tags as $tag) {
        // Insert tag if it doesn't exist
        $db->query("INSERT IGNORE INTO tags (name) VALUES (:tag)", ['tag' => $tag]);

        // Get the tag_id
        $tagI = $db->query("SELECT id FROM tags WHERE name = :tag", ['tag' => $tag])->findOrFail();
        $tagId = $tagI[0]['id'];
        $db->query("INSERT INTO note_tag (note_id, tag_id) VALUES (:note_id, :tag_id)", [
            'note_id' => $noteId,
            'tag_id' => $tagId
        ]);
    }
}


