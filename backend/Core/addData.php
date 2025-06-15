<?php


    use Core\App;
    use Core\Database;

    $db = App::resolve(Database::class);


    $jsonData = file_get_contents('../data.json'); // Uses current script directory
    $data = json_decode($jsonData, true);

    $notes = $data['notes'];
    $idCre = 1700;
    $tagId = 3500;
    foreach ($notes as $note) {
        $id = $idCre++;
        $title = $note['title'];
        $content = $note['content'];
        $lastEdited = $note['lastEdited'];
        $isArchived = $note['isArchived'];
        $isArchived = $isArchived ? 1 : 0;
        $tags = $note['tags'];
        $fnb = $db->query("INSERT INTO notes.notes (id,title, content,isArchived,naew,userId) VALUES (:id,:title, :content, :isArchived, 0,39)",
            ['id' => $id,'title' => $title,
            'content' => $content, 'isArchived' => $isArchived]);
        foreach ($tags as $tag) {
            $tagId++;
            $db->query("INSERT INTO notes.tags (id, name, noteId) VALUES (:id,:tag,:noteId)", ['id' => $tagId,'tag' => $tag,'noteId'=>$id]);
        }

    }