<?php
    header("Access-Control-Allow-Origin: https://noteapp.my-board.org");
    header("Access-Control-Allow-Origin: http://localhost:5173"); // your frontend URL
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Credentials: true");
// ✅ Handle preflight request (MUST return same methods/headers allowed)
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204); // No Content is more semantically correct for preflight
        exit;
    }

    use Core\Session;
    use Core\Router;

    if (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false) {
        // Local dev environment
        define('BASE_PATH', __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR);
    } else {
        // Production / remote server
        define('BASE_PATH', __DIR__ . DIRECTORY_SEPARATOR);
    }

    require BASE_PATH . "Core/functions.php";
    session_start();
    spl_autoload_register(function ($class) {
        $class = str_replace("\\", DIRECTORY_SEPARATOR, $class);
        require base_path("{$class}.php");
    });

    require base_path('bootstrap.php');

//    require BASE_PATH . "Core/addData.php";

    $router = new Router();
    $routes = require base_path('routes.php');


    $uri = parse_url($_SERVER['REQUEST_URI'])['path'];
    $uri = str_replace('/backend', '', $uri);

    $method = $_SERVER['REQUEST_METHOD'];

    $router->route($uri, $method);
