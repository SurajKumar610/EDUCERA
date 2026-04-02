<?php
// ============================================
// EDUCERA Backend - Database & Config
// ============================================

// CORS - Allow frontend requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS requests immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration
$host = "localhost";
$user = "root";
$pass = "";
$db   = "educera_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

$conn->set_charset("utf8mb4");

// Helper function to send JSON response
function sendResponse($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit();
}

// Helper function to get JSON input
function getInput() {
    $input = json_decode(file_get_contents("php://input"), true);
    return $input ?? [];
}

// Simple token generation (for session management)
function generateToken($userId) {
    return base64_encode($userId . '|' . time() . '|' . bin2hex(random_bytes(16)));
}

// Token validation
function validateToken($token) {
    $decoded = base64_decode($token);
    $parts = explode('|', $decoded);
    if (count($parts) !== 3) return false;
    return (int)$parts[0];
}

// Get authenticated user ID from token
function getAuthUserId() {
    $headers = getallheaders();
    $auth = $headers['Authorization'] ?? '';
    if (strpos($auth, 'Bearer ') === 0) {
        $token = substr($auth, 7);
        return validateToken($token);
    }
    return false;
}
?>