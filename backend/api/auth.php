<?php
require_once __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getInput();

// Determine action from query param or request body
$action = $_GET['action'] ?? $input['action'] ?? '';

switch ($action) {
    case 'register':
        handleRegister($conn, $input);
        break;
    case 'login':
        handleLogin($conn, $input);
        break;
    case 'profile':
        handleProfile($conn);
        break;
    case 'update_profile':
        handleUpdateProfile($conn, $input);
        break;
    default:
        sendResponse(["error" => "Invalid action. Use ?action=register|login|profile|update_profile"], 400);
}

function handleRegister($conn, $input) {
    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $password = $input['password'] ?? '';
    $level = $input['level'] ?? 'school';
    $program = trim($input['program'] ?? '');
    $class_name = $input['class_name'] ?? '';
    $board = $input['board'] ?? 'CBSE';

    // Validation
    if (empty($name) || empty($email) || empty($password)) {
        sendResponse(["error" => "Name, email, and password are required"], 400);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendResponse(["error" => "Invalid email address"], 400);
    }

    if (strlen($password) < 6) {
        sendResponse(["error" => "Password must be at least 6 characters"], 400);
    }

    // Check if email exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    if ($stmt->get_result()->num_rows > 0) {
        sendResponse(["error" => "Email already registered"], 409);
    }

    // Hash password & insert
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $colors = ['#6C63FF', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    $avatarColor = $colors[array_rand($colors)];

    $stmt = $conn->prepare("INSERT INTO users (name, email, password, level, program, class_name, board, avatar_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $name, $email, $hashedPassword, $level, $program, $class_name, $board, $avatarColor);

    if ($stmt->execute()) {
        $userId = $conn->insert_id;
        $token = generateToken($userId);
        sendResponse([
            "message" => "Registration successful!",
            "token" => $token,
            "user" => [
                "id" => $userId,
                "name" => $name,
                "email" => $email,
                "level" => $level,
                "program" => $program,
                "class_name" => $class_name,
                "board" => $board,
                "avatar_color" => $avatarColor
            ]
        ], 201);
    } else {
        sendResponse(["error" => "Registration failed: " . $conn->error], 500);
    }
}

function handleLogin($conn, $input) {
    $email = trim($input['email'] ?? '');
    $password = $input['password'] ?? '';

    if (empty($email) || empty($password)) {
        sendResponse(["error" => "Email and password are required"], 400);
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        sendResponse(["error" => "Invalid email or password"], 401);
    }

    $user = $result->fetch_assoc();

    if (!password_verify($password, $user['password'])) {
        sendResponse(["error" => "Invalid email or password"], 401);
    }

    $token = generateToken($user['id']);
    unset($user['password']); // Don't send password back

    sendResponse([
        "message" => "Login successful!",
        "token" => $token,
        "user" => $user
    ]);
}

function handleProfile($conn) {
    $userId = getAuthUserId();
    if (!$userId) {
        sendResponse(["error" => "Unauthorized"], 401);
    }

    $stmt = $conn->prepare("SELECT id, name, email, level, program, class_name, board, avatar_color, created_at FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        sendResponse(["error" => "User not found"], 404);
    }

    sendResponse(["user" => $result->fetch_assoc()]);
}

function handleUpdateProfile($conn, $input) {
    $userId = getAuthUserId();
    if (!$userId) {
        sendResponse(["error" => "Unauthorized"], 401);
    }

    $name = trim($input['name'] ?? '');
    $program = trim($input['program'] ?? '');
    $class_name = $input['class_name'] ?? '';
    $board = $input['board'] ?? 'CBSE';

    if (empty($name)) {
        sendResponse(["error" => "Name is required"], 400);
    }

    $stmt = $conn->prepare("UPDATE users SET name = ?, program = ?, class_name = ?, board = ? WHERE id = ?");
    $stmt->bind_param("ssssi", $name, $program, $class_name, $board, $userId);

    if ($stmt->execute()) {
        sendResponse(["message" => "Profile updated successfully"]);
    } else {
        sendResponse(["error" => "Failed to update profile"], 500);
    }
}
?>
