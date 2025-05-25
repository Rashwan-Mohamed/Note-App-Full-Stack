<?php

    use Core\Database;
    use Core\App;

    $db = App::resolve(Database::class);
    $email = $_GET['email'] ?? null;
    $user = $_GET['user'] ?? null;
// this should be responsible for verifying that the user exists, and if so, it should verify the credentials
// and if true, should log him in and starts a new session
    if ($_SERVER['REQUEST_METHOD'] == 'GET' && !empty($email)) {
        try {
            $userData = $db->query("SELECT * FROM users WHERE email = :email", ['email' => $email])->findOrFail();
            echo json_encode(["exists" => !empty($userData)]);
        } catch (Exception $e) {
            http_response_code(404);
            echo json_encode(["exists" => false]);
        }
    } elseif (!empty($user)) {
        try {
            $userData = $db->query("SELECT * FROM users WHERE userName = :user", ['user' => $user])->findOrFail();
            echo json_encode(["exists" => !empty($userData)]);
        } catch (Exception $e) {
            http_response_code(404);
            echo json_encode(["exists" => false]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["exists" => false]); // Default response when no input is provided
    }
