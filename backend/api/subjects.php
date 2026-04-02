<?php
require_once __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getInput();
$userId = getAuthUserId();

if (!$userId) {
    sendResponse(["error" => "Unauthorized. Please login first."], 401);
}

switch ($method) {
    case 'GET':
        getSubjects($conn, $userId);
        break;
    case 'POST':
        createSubject($conn, $userId, $input);
        break;
    case 'DELETE':
        deleteSubject($conn, $userId);
        break;
    default:
        sendResponse(["error" => "Method not allowed"], 405);
}

function getSubjects($conn, $userId) {
    $stmt = $conn->prepare("SELECT * FROM subjects WHERE user_id = ? ORDER BY name");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $subjects = [];
    while ($row = $result->fetch_assoc()) {
        $subjects[] = $row;
    }

    sendResponse(["subjects" => $subjects]);
}

function createSubject($conn, $userId, $input) {
    $name = trim($input['name'] ?? '');
    if (empty($name)) {
        sendResponse(["error" => "Subject name is required"], 400);
    }
    
    // Check if it already exists
    $checkStmt = $conn->prepare("SELECT id FROM subjects WHERE user_id = ? AND name = ?");
    $checkStmt->bind_param("is", $userId, $name);
    $checkStmt->execute();
    if ($checkStmt->get_result()->num_rows > 0) {
        sendResponse(["error" => "Subject already exists"], 400);
    }
    
    $icon = $input['icon'] ?? '📘';
    
    $stmt = $conn->prepare("INSERT INTO subjects (user_id, name, icon) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $userId, $name, $icon);
    
    if ($stmt->execute()) {
        $subjectId = $conn->insert_id;
        $fetchStmt = $conn->prepare("SELECT * FROM subjects WHERE id = ?");
        $fetchStmt->bind_param("i", $subjectId);
        $fetchStmt->execute();
        $subject = $fetchStmt->get_result()->fetch_assoc();
        
        sendResponse(["message" => "Subject added!", "subject" => $subject], 201);
    } else {
        sendResponse(["error" => "Failed to add subject"], 500);
    }
}

function deleteSubject($conn, $userId) {
    $subjectId = $_GET['id'] ?? 0;
    if (!$subjectId) {
        sendResponse(["error" => "Subject ID is required"], 400);
    }
    
    $stmt = $conn->prepare("DELETE FROM subjects WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $subjectId, $userId);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            sendResponse(["message" => "Subject deleted!"]);
        } else {
            sendResponse(["error" => "Subject not found"], 404);
        }
    } else {
        sendResponse(["error" => "Failed to delete subject"], 500);
    }
}
?>
