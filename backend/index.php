<?php
// Backend API - CORS preflight and routing handler
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

echo json_encode([
    "status" => "EDUCERA API is running 🚀",
    "version" => "1.0.0",
    "endpoints" => [
        "POST /api/auth.php?action=register" => "Register user",
        "POST /api/auth.php?action=login" => "Login user",
        "GET /api/auth.php?action=profile" => "Get user profile",
        "GET|POST|PUT|DELETE /api/tasks.php" => "Task CRUD operations",
        "GET|POST|PUT|DELETE /api/attendance.php" => "Attendance CRUD operations",
        "GET|POST|PUT|DELETE /api/notes.php" => "Notes CRUD operations",
        "GET /api/subjects.php" => "Get subjects list",
    ]
]);
?>
