<?php


    use Core\App;
    use Core\Database;

    $db = App::resolve(Database::class);


    $jsonData = file_get_contents('../data.json'); // Uses current script directory
    $data = json_decode($jsonData, true);

    $notes = $data['notes'];
    $idCre = 1600;
    $tagId = 3000;
    foreach ($notes as $note) {
//        var_dump("<pre>");
//        print_r($note);
//        var_dump("<pre>");
        $id = $idCre++;
        $title = $note['title'];
        $content = $note['content'];
        $lastEdited = $note['lastEdited'];
        $isArchived = $note['isArchived'];
        $isArchived = $isArchived ? 1 : 0;
        $tags = $note['tags'];
        $fnb = $db->query("INSERT INTO notes.notes (id,title, content,isArchived,naew,userId) VALUES (:id,:title, :content, :isArchived, :naew,1)", ['title' => $title,
            'content' => $content, 'isArchived' => $isArchived, 'naew' => 0, 'id' => $id]);
        foreach ($tags as $tag) {
            $tagId++;
            $db->query("INSERT INTO notes.tags (name,id) VALUES (:tag,:id)", ['tag' => $tag, 'id' => $tagId]);;
            $db->query("INSERT INTO notes.note_tag (note_id, tag_id) VALUES (:note_id,:tag_id)", ['note_id' => $id, 'tag_id' => $tagId]);;
        }

    }