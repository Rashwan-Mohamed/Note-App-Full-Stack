<?php


function abort($code = 404)
{
    http_build_query($code);
    echo 'ERROR MAYBE 404 ';
    //        require base_path
}

function dd($test)
{
    var_dump($test);
    die();
}

/**
 * @param string $path
 * @return string
 */
function base_path(string $path = ''): string
{
    return rtrim(BASE_PATH, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . ltrim($path, DIRECTORY_SEPARATOR);
}

//function redirect(string $path = ''): void
//{
//    header("Location: {$path}");
//    exit();
//}
//
