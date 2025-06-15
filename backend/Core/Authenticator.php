<?php

namespace Core;
class Authenticator
{
    public function attempt($email, $password)
    {
        $user = App::resolve(Database::class)->query("SELECT * FROM users WHERE email = :email",
            [":email" => $email])->find();
        if ($user) {

            if (password_verify($password, $user[0]['password'])) {
                if($email==='guest@email.com'){
                    $this->handleGuest();
                }
                return $this->login($user[0]);
            }
        }
        return false;
    }

    public function login($user)
    {
        // Always start with a fresh session
        session_regenerate_id(true);
        // Set user data after regenerating session
        Session::put('user', ['email' => $user['email'], 'id' => $user['userId'], 'username' => $user['userName']]);
        return $user['userId'];
    }


    public function logout()
    {
        Session::destroy();
    }
    function handleGuest(): void
    {
        $db = App::resolve(Database::class);
        $db->query("DELETE FROM notes WHERE userId = 1");
        addData(1);
    }
}

