<?php


$router->get('/notes', 'controllers/notes/index.php')->only('auth');
$router->post('/newNote', 'controllers/notes/newNote.php')->only('auth');
$router->put('/editNote', 'controllers/notes/edit.php')->only('auth');
$router->post('/deleteNote', 'controllers/notes/delete.php')->only('auth');
$router->put('/editTags', 'controllers/notes/editTags.php')->only('auth');
$router->put('/editTags', 'controllers/notes/editTags.php')->only('auth');
$router->get('/getUser', 'controllers/users/getUser.php')->only('guest');
$router->post('/addUser', 'controllers/users/addUser.php')->only('guest');
$router->post('/session', 'controllers/session/store.php');
$router->get('/checkAuth', 'controllers/users/checkAuth.php');
$router->get('/logout', 'controllers/session/destroy.php')->only('auth');

