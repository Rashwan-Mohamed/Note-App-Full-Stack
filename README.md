﻿# Note App Full Stack
Welcome to Note App Full Stack, a minimalist note-taking web application built with a modern React frontend and a custom PHP backend inspired by Laravel’s architecture!
The UI design is inspired by a Frontend Mentor challenge, emphasizing clean and user-friendly interfaces.


**This app provides user authentication, note and tag management, and session handling — all powered by a clean REST API and React Context state management.**


## Demo
Check out the live app here: noteapp.lovestoblog.com/

## Features

* User registration, login, and session management

* Create, edit, delete notes with tag support

* React Context for efficient global state management

* Routing with React Router for smooth SPA navigation

* Styled with vanilla CSS for simplicity and flexibility

* Backend built as a mini PHP framework inspired by Laravel and Laracasts principles:

* Custom service container for dependency injection

* Middleware support for authentication

* Clean routing system

* PDO-based database connection handling

* RESTful API endpoints for frontend-backend communication

* Secure cookie-based authentication with credentials support

## Tech Stack
### Tech Stack Frontend:

* React

* React Context API for state management

* React Router for client-side routing

* Vanilla CSS for styling

* Axios for HTTP requests

* Vite for fast development build tooling (default port 5173)

### Backend:

* PHP custom mini-framework inspired by Laravel & Laracasts

* PDO for MySQL database interaction

* REST API endpoints with routing, middleware, and dependency injection

* Hosted on InfinityFree for production

## Getting Started

#### 1. Clone the repository

```bash
git clone https://github.com/Rashwan-Mohamed/Note-App-Full-Stack.git
cd Note-App-Full-Stack
```

#### 2. Backend Setup

* Configure your database credentials and environment in config.php.

* Deploy the backend PHP files on your server or run locally using PHP’s built-in server:

```bash
php -S localhost:8000 -t backend
Make sure your MySQL database is running and accessible with the configured credentials.
```
#### 3. Frontend Setup
* Navigate to the frontend folder or root directory (where package.json is located).

* Install dependencies:

```bash
npm install
```
*  Configure your API base URL:


```javascript
// src/api/urls.js (or wherever your API base URL is defined)
export const API_BASE = import.meta.env.VITE_APP_API_BASE_URL;
// For local development, uncomment the following line:
// export const API_BASE = `http://localhost:8000`
```
**Note: Vite serves the frontend on http://localhost:5173 by default.**

**Start the development server:**

```bash
npm run dev
```
**Open your browser at http://localhost:5173 to view the app.**

### Switching Environments

**You can switch between local and production APIs by commenting/uncommenting the appropriate API_BASE line in your config file. Update your config.php on the backend to point to either your local or production database as needed.**

### Folder Structure

```bash
/backend       - PHP backend source files (mini framework inspired by Laravel)
/frontend      - React frontend source files
/config.php    - Central configuration for database and environment settings
```

## Usage

* Visit the app URL (locally or production).

* Register a new user or login with existing credentials.

* Create, edit, and delete notes.

* Add or remove tags from notes.

* Log out to end the session.

## Contributing

### Contributions are welcome! If you find bugs or want to suggest improvements:

* Open an issue describing the problem or feature.

* Fork the repo, make your changes, and submit a pull request.

* Please write clear, concise code with comments where necessary.

## License

****This project is licensed under the MIT License.****

_**Contact
Developed by Rashwan Mohamed
GitHub: https://github.com/Rashwan-Mohamed**_

