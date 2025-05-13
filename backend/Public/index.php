<?php
header('Access-Control-Allow-Origin: *'); // You can use 'http://localhost:5173' instead of '*'
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header("Access-Control-Allow-Origin: http://localhost:5173"); // your frontend URL
header("Access-Control-Allow-Credentials: true"); // 🔥 Allows cookies with CORS
// Allow specific methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
// ✅ Handle preflight request (MUST return same methods/headers allowed)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content is more semantically correct for preflight
    exit;
}

use Core\Session;
use Core\Router;

const BASE_PATH = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR;
require BASE_PATH . "Core/functions.php";
session_start();
spl_autoload_register(function ($class) {
    $class = str_replace("\\", DIRECTORY_SEPARATOR, $class);
    require base_path("{$class}.php");
});

require base_path('bootstrap.php');


$router = new Router();
$routes = require base_path('routes.php');


$uri = parse_url($_SERVER['REQUEST_URI'])['path'];

$method = $_SERVER['REQUEST_METHOD'];

$router->route($uri, $method);
