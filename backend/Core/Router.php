<?php

namespace Core;

use Core\Middleware\Middleware;

class Router
{
    protected array $routes = [];

    public function add($method, $uri, $controller)
    {
        $this->routes[] = ['uri' => $uri, 'method' => $method, 'controller' => $controller, 'middleware' => null];
        return $this;
    }

    public function get($uri, $controller)
    {
        $this->add("GET", $uri, $controller);
        return $this;
    }

    public function post($uri, $controller)
    {
        $this->add("POST", $uri, $controller);
        return $this;
    }

    public function delete($uri, $controller)
    {
        $this->add("DELETE", $uri, $controller);
        return $this;
    }


    public function put($uri, $controller)
    {
        $this->add('PUT', $uri, $controller);
        return $this;
    }

    public function route($uri, $method)
    {
        foreach ($this->routes as $route) {
            if ($route['method'] === strtoupper($method) && $route['uri'] === $uri) {
                Middleware::resolve($route['middleware']);
                return require base_path('Http/' . $route['controller']);
            }
        }
        $this->abort();
    }

    public function previousUrl()
    {
        return $_SERVER['HTTP_REFERER'];
    }

    public function only($key)
    {
        $this->routes[array_key_last($this->routes)]['middleware'] = $key;
        return $this;
    }

    protected function abort($code = 404)
    {
        http_response_code($code);
        echo 'not found';
        die();
    }

}