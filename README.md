# EDUCERA 🎓

Educera is a full-stack, web-based platform designed specifically for school and college students in India. It aims to solve the problems of daily academic management by offering a centralized dashboard where students can track daily attendance, manage self-assigned tasks and assignments, and create, organize, and manage subject-specific notes with AI-generated content.

## ✨ Features
- **Daily Attendance Tracking:** Keep track of your daily attendance for each subject easily.
- **Task Management:** Self-assign tasks, set priorities, and track pending and completed items.
- **Subject-Specific Notes:** Create and organize study notes securely.
- **AI-Enriched Content:** Leverage the power of AI to enrich notes and generate insightful overviews for subjects.
- **Consumer-Grade UI:** A modern, incredibly fast, and beautiful UI built with React + Tailwind CSS.

## 💻 Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS 3.4, React Router DOM (v7), Axios, Framer Motion
- **Backend:** Native/Vanilla PHP (Custom build RESTful API structure without heavy frameworks)
- **Database:** MySQL
- **Environment:** Local Server via XAMPP (Apache) & Node.js

## 🗂️ Project Architecture

This application operates using the **Single Page Application (SPA) + REST API** model:

- The **React Frontend** runs independently and asynchronously communicates with the server via HTTP requests using `Axios`.
- The **PHP Backend** processes these requests securely using prepared statements and token-based authentication.

## 🚀 Getting Started

Follow these instructions to get the project working consistently on your local machine.

### Prerequisites
- [XAMPP](https://www.apachefriends.org/index.html) installed for Apache & MySQL.
- [Node.js](https://nodejs.org/) installed.
- Git.

### 1. Database Setup
1. Open XAMPP and start **Apache** and **MySQL**.
2. Go to `http://localhost/phpmyadmin/` in your browser.
3. Create a new database named `educera_db`.
4. Import the `backend/database/schema.sql` file into your newly created `educera_db` database.

### 2. Backend Setup
1. Place (or clone) the repository folder inside the `htdocs` directory of your XAMPP installation (`C:\xampp\htdocs\`).
2. Make sure the folder is named appropriately, e.g., `educera`. So the backend paths map to `http://localhost/educera/backend/...`

### 3. Frontend Setup
1. Open a terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary NPM packages:
   ```bash
   npm install
   ```
3. Set your internal `.env` file under the `/frontend/` root folder (Note: this should not be committed to GitHub):
   ```env
   VITE_API_BASE_URL=http://localhost/educera/backend/api
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```
4. Start the Vite development frontend server:
   ```bash
   npm run dev
   ```

### 4. Explore!
Open `http://localhost:5173` locally on your browser.

## 🛡️ Security
This project uses **custom secure token generation (Bearer Tokens)** for authentication management instead of traditional cookies. It also leverages **Prepared Statements** to mitigate SQL Injection, and hashes all user passwords securely (`password_hash()`) before putting them into the database.

---
*Built with ❤️ for Students.*
