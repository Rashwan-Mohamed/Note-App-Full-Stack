<?php

//
//$router->get('/notes', 'controllers/notes/index.php')->only('auth');
//$router->post('/note', 'controllers/notes/newNote.php')->only('auth');

//$router->put('/note', 'controllers/notes/edit.php')->only('auth');

//$router->delete('/note', 'controllers/notes/delete.php')->only('auth');// adds
//$router->put('/tags', 'controllers/notes/editTags.php')->only('auth');
//$router->get('/user', 'controllers/users/getUser.php')->only('guest');
//$router->post('/user', 'controllers/users/addUser.php')->only('guest');
//$router->post('/session', 'controllers/session/store.php');
//$router->get('/checkAuth', 'controllers/users/checkAuth.php');
//$router->get('/session', 'controllers/session/destroy.php')->only('auth');
//

    $router->get('/notes', 'controllers/notes/index.php')->only('auth');
    $router->post('/editNote', 'controllers/notes/edit.php')->only('auth');
    $router->post('/deleteNote', 'controllers/notes/delete.php')->only('auth');
    $router->post('/editTag', 'controllers/notes/editTags.php')->only('auth');
    $router->post('/newNote', 'controllers/notes/newNote.php')->only('auth');
    $router->get('/user', 'controllers/users/getUser.php')->only('guest');
    $router->post('/user', 'controllers/users/addUser.php')->only('guest');
    $router->post('/session', 'controllers/session/store.php');
    $router->get('/session', 'controllers/session/destroy.php')->only('auth');
    $router->get('/checkAuth', 'controllers/users/checkAuth.php');
