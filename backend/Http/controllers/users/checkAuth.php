<?php


if (isset($_SESSION['user'])) {
    echo json_encode(['authenticated' => true, 'user' => $_SESSION['user']]);
} else {
    http_response_code(401);
    echo json_encode(['authenticated' => false]);
}
