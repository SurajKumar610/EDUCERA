# EDUCERA: Comprehensive Project Documentation

## 1. Introduction
**Educera** is a full-stack, web-based platform designed specifically for school and college students in India. It aims to solve the problems of daily academic management by offering a centralized dashboard where students can:
- Track daily attendance.
- Manage self-assigned tasks and assignments.
- Create, organize, and manage subject-specific notes.
- (Upcoming) Enrich notes with AI-generated content.

The application brings a consumer-grade, modern, and beautiful UI combined with a robust, custom-built RESTful API architecture.

---

## 2. Technology Stack

### Frontend (User Interface & Client Side)
- **React 19:** A popular JavaScript library used for building user interfaces with reusable components.
- **Vite:** A fast build tool and development server that replaces tools like Create React App or Webpack.
- **Tailwind CSS 3.4:** A utility-first CSS framework for rapid and responsive UI development without writing custom CSS classes.
- **React Router DOM (v7):** Handling client-side routing (navigating between Dashboard, Tasks, Notes, etc. without page reloads).
- **Axios:** A promise-based HTTP client for making API requests to the backend.
- **Lucide React / React Icons:** Used for rendering modern SVG icons across the UI.

### Backend (Server Side Logic & API)
- **PHP (Native/Vanilla):** Used to build the RESTful API endpoints. No heavy frameworks (like Laravel) were used to keep the backend lightweight and custom.
- **RESTful API Architecture:** The backend exposes endpoints (e.g., `GET /api/tasks.php`, `POST /api/auth.php`) that the frontend consumes.

### Database
- **MySQL:** A relational database management system (RDBMS) used to store structured data like Users, Tasks, Notes, and Attendance.

### Server & Environment
- **XAMPP (Apache):** Serves the PHP backend and MySQL database on the local machine (`localhost`).
- **Node.js (NPM/NPX):** Manages frontend dependencies and the Vite development server.

---

## 3. How the Technologies are Interconnected (Architecture & Flow)

The application follows a **Client-Server Architecture**, specifically the **Single Page Application (SPA) + REST API** model.

### **The Request-Response Lifecycle:**
1. **User Interaction:** The user clicks "Login" on the React frontend.
2. **Client-Side Processing (React):** The frontend gathers the email and password, using `Axios` to send an asynchronous HTTP `POST` request to `http://localhost/educera-backend/api/auth.php?action=login`.
3. **Backend Routing (PHP):** The Apache server receives the request and executes `auth.php`. The PHP script reads the JSON payload from the request body layout (`php://input`).
4. **Database Query (MySQL):** The PHP script connects to MySQL (`educera_db`) using `mysqli`, validates the credentials, and checks the hashed password using `password_verify()`.
5. **Token Generation (Backend):** If successful, PHP creates a custom Session Token (a base64 encoded string containing the user ID) and sends it back to the frontend as a JSON response.
6. **Client-Side State (React):** The React frontend saves this token in `localStorage` and includes it in the `Authorization` header (`Bearer <token>`) for all subsequent protected API requests. It then dynamically updates the UI to show the Dashboard.

This distinct separation allows the frontend to run completely independently of the backend. They only communicate by exchanging JSON data.

---

## 4. Project File Flow & Structure

The project directory is structured into independent `frontend` and `backend` modules, enabling clear separation of concerns.

### Frontend (`/frontend`)
The React application is managed by Vite and structured as follows:
- **`src/main.jsx` & `App.jsx`:** The entry points of the application, managing global contexts, routing, and overall layout.
- **`src/pages/`:** Contains main route views (e.g., `Dashboard.jsx`, `Login.jsx`, `Signup.jsx`, `Tasks.jsx`, `Notes.jsx`, `Attendance.jsx`, `Profile.jsx`). 
- **`src/components/`:** Reusable UI components (e.g., `Sidebar.jsx`, `MarkdownRenderer.jsx`, `Toast.jsx`, `EmptyState.jsx`).
- **`src/services/`:** Logic to interact with backend endpoints (e.g., API calls using Axios).
- **`src/index.css`:** Global styles, primarily utilizing Tailwind CSS directives.

### Backend (`/backend`)
The native PHP backend serves as the REST API and interacts with the database:
- **`api/`:** Contains individual API endpoint scripts responding to frontend requests:
  - `auth.php`: Handles login, registration, and user authentication.
  - `tasks.php`: CRUD operations for user tasks.
  - `attendance.php`: Manages daily attendance records.
  - `notes.php`: CRUD operations and AI logic for subject notes.
  - `subjects.php`: Fetches curriculum subjects.
- **`database/`:** Contains backend configuration and database schemas:
  - `schema.sql`: Database table structures, relationships, and seed data.

### Request Flow Example (Creating a Task)
1. **Frontend:** The User fills out the task form in `Tasks.jsx` and clicks submit.
2. **Service Layer:** An Axios POST request is fired to `http://localhost/educera-backend/api/tasks.php`, attaching the auth token in headers and task data in JSON.
3. **Backend API:** `tasks.php` receives the request, securely verifies the user's token, sanitizes the inputs, and prepares an SQL `INSERT` statement.
4. **Database:** MySQL executes the query.
5. **Response:** PHP returns a JSON response (success or generic error) back to the frontend.
6. **UI Update:** Based on the response, React updates the task list automatically without a page reload.

---

## 5. Database Schema Overview
The relational database `educera_db` manages connections between different entities:

- **users:** Stores user credentials, hashed passwords (`password_hash()`), level (school/college), program/class, and an auto-generated avatar color.
- **tasks:** Holds tasks belonging to a user (`user_id` acts as a Foreign Key). Includes priority, status (pending/completed), and due date.
- **attendance:** Records daily attendance per subject (present/absent/half_day). Unique constraint on `user_id + date + subject` prevents duplicate entries.
- **notes:** Stores user-created text content and notes. Includes a flag `is_ai_generated` for future AI augmentation.
- **subjects:** Predefined table storing common Indian curriculum subjects (e.g., Physics, Maths) categorised by school/college.

---

## 6. Security Implementations

1. **Password Hashing:** Passwords are never stored in plain text. PHP's `password_hash($password, PASSWORD_DEFAULT)` is used to securely hash passwords.
2. **Prepared Statements (SQL Injection Prevention):** Instead of directly injecting user inputs into SQL strings, the backend uses `mysqli_prepare($query)` and `$stmt->bind_param()`. This guarantees the database treats the input strictly as data, neutralizing SQL injection attacks.
3. **Authentication Tokens (Stateless Security):** A custom Bearer Token is generated safely using `random_bytes()` and `base64_encode()`. Each authorized request verifies this token to authenticate the user (`getAuthUserId()` function).
4. **CORS (Cross-Origin Resource Sharing):** HTTP headers are configured in PHP to explicitly allow requests from the React frontend, rejecting arbitrary external domains.

---

## 7. viva

# Why did you choose React and Vite over standard HTML/JS?
 React allows us to break the UI down into reusable components (like buttons, navigation bars, and cards). It manages the "state" seamlessly—when a user adds a task, only the task list updates on the screen, avoiding full page reloads. Vite was chosen because it's significantly faster than Webpack, providing instant Hot Module Replacement (HMR) during development.

# How is your frontend interacting with the PHP backend?
 We are using **Axios**, a promise-based HTTP client in JavaScript. The frontend sends asynchronous HTTP requests (GET, POST, PUT, DELETE) to our PHP endpoints. The backend processes the request and returns data formatted as JSON. The frontend then parses this JSON and updates its UI dynamically. 

# What is an API (Application Programming Interface) in this context?
 In Educera, our API is a set of URLs (endpoints like `/api/tasks.php`) built with PHP. It acts as an intermediary bridge. The React frontend doesn't talk to the MySQL database directly; it asks the API to do it.

# How do you handle User Sessions and Logins?
 We implemented a Token-based Authentication system (similar to JWT). Upon successful login, the PHP backend generates a unique secure string (Token) and sends it back. The React app stores this token in browser `localStorage`. For any protected actions (like fetching tasks), React attaches this token to the HTTP Request Headers (`Authorization: Bearer <token>`). The backend reads the header, validates the token, and securely identifies the user.

# What is a Foreign Key, and where is it used in your project?
 A Foreign Key is a field in one database table that uniquely identifies a row of another table. In Educera, the `tasks`, `notes`, and `attendance` tables all have a `user_id` column. This acts as a foreign key referencing the `id` column in the `users` table. We use `ON DELETE CASCADE` so that if a user deletes their account, all their related tasks and notes are automatically removed by MySQL.

# Provide an example of how you prevented SQL Injection.
 We used "Prepared Statements". In PHP, instead of running `SELECT * FROM users WHERE email = '$email'`, we run `SELECT * FROM users WHERE email = ?`, and then bind the actual variable separately using `$stmt->bind_param("s", $email)`. This prevents an attacker from terminating the string and injecting malicious SQL commands like `DROP TABLE`.

# Why Tailwind CSS instead of plain CSS?
 Tailwind CSS is a utility-first framework. It lets us style components directly in our React `.jsx` files using predefined classes (e.g., `flex, justify-center, text-white, bg-blue-500`). It removes the need to invent class names, avoids huge `.css` files, and automatically removes unused CSS during the production build, ensuring a very small and optimized file size.

# What would you do to scale this up in the future? 
1. I would transition from native PHP to a framework like Laravel or Express.js (Node) for more complex background jobs.
2. I would fully integrate the pending AI features using the OpenAI/Groq API to auto-summarize student notes.
3. I would host the database on a managed cloud service like AWS RDS or DigitalOcean instead of local XAMPP to allow public access.