<?php


    use Core\App;
    use Core\Database;


function addData ($userId)
{
    $db = App::resolve(Database::class);
    $jsonData = file_get_contents('../data.json'); // Uses current script directory
    $data = json_decode($jsonData, true);
    $notes = $data['notes'];
    $idCre = 565456;
    $tagId = 54651;
    foreach ($notes as $note) {
        $id = $idCre++;
        $title = $note['title'];
        $content = $note['content'];
        $lastEdited = $note['lastEdited'];
        $isArchived = $note['isArchived'];
        $isArchived = $isArchived ? 1 : 0;
        $tags = $note['tags'];
        $fnb = $db->query("INSERT INTO notes.notes (id,title, content,isArchived,naew,userId) VALUES (:id,:title, :content, :isArchived, 0,:userId)",
            ['id' => $id,'title' => $title,
                'content' => $content, 'isArchived' => $isArchived,'userId' => $userId]);
        foreach ($tags as $tag) {
            $tagId++;
            $db->query("INSERT INTO notes.tags (id, name, noteId) VALUES (:id,:tag,:noteId)", ['id' => $tagId,'tag' => $tag,'noteId'=>$id]);
        }

    }
}
