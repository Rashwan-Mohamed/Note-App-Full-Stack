<?php

use Core\Authenticator;
use Core\Session;

Session::destroy(); // ❗ Always destroy any session before login attempt
Session::ensureSession(); // Optionally start a fresh one for safety

try {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];
    $password = $data['password'];
    $signedIn = (new Authenticator)->attempt($email, $password);
    if ($signedIn) {
        echo $signedIn;
    } else {
        http_response_code(401); // ❗ Explicitly set HTTP 401 Unauthorized
        echo json_encode(['error' => 'No matching account found for these credentials.']);
    }
} catch (Exception $e) {
    http_response_code(500); // ❗ Explicitly set HTTP 500 Server Error
    echo json_encode(['error' => $e->getMessage()]);
}