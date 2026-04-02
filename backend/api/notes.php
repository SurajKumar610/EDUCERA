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
        getNotes($conn, $userId);
        break;
    case 'POST':
        createNote($conn, $userId, $input);
        break;
    case 'PUT':
        updateNote($conn, $userId, $input);
        break;
    case 'DELETE':
        deleteNote($conn, $userId);
        break;
    default:
        sendResponse(["error" => "Method not allowed"], 405);
}

function getNotes($conn, $userId) {
    $subject = $_GET['subject'] ?? '';
    $search = $_GET['search'] ?? '';

    $query = "SELECT * FROM notes WHERE user_id = ?";
    $params = [$userId];
    $types = "i";

    if ($subject) {
        $query .= " AND subject = ?";
        $params[] = $subject;
        $types .= "s";
    }

    if ($search) {
        $query .= " AND (title LIKE ? OR content LIKE ?)";
        $searchTerm = "%$search%";
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $types .= "ss";
    }

    $query .= " ORDER BY updated_at DESC";

    $stmt = $conn->prepare($query);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();

    $notes = [];
    while ($row = $result->fetch_assoc()) {
        $notes[] = $row;
    }

    sendResponse(["notes" => $notes]);
}

function createNote($conn, $userId, $input) {
    $title = trim($input['title'] ?? '');
    $content = $input['content'] ?? '';
    $subject = $input['subject'] ?? '';
    $is_ai_generated = $input['is_ai_generated'] ?? 0;
    $tags = $input['tags'] ?? '';

    if (empty($title)) {
        sendResponse(["error" => "Note title is required"], 400);
    }

    $stmt = $conn->prepare("INSERT INTO notes (user_id, title, content, subject, is_ai_generated, tags) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssis", $userId, $title, $content, $subject, $is_ai_generated, $tags);

    if ($stmt->execute()) {
        $noteId = $conn->insert_id;
        $fetchStmt = $conn->prepare("SELECT * FROM notes WHERE id = ?");
        $fetchStmt->bind_param("i", $noteId);
        $fetchStmt->execute();
        $note = $fetchStmt->get_result()->fetch_assoc();
        
        sendResponse(["message" => "Note created!", "note" => $note], 201);
    } else {
        sendResponse(["error" => "Failed to create note"], 500);
    }
}

function updateNote($conn, $userId, $input) {
    $noteId = $_GET['id'] ?? $input['id'] ?? 0;

    if (!$noteId) {
        sendResponse(["error" => "Note ID is required"], 400);
    }

    // Check ownership
    $stmt = $conn->prepare("SELECT * FROM notes WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $noteId, $userId);
    $stmt->execute();
    if ($stmt->get_result()->num_rows === 0) {
        sendResponse(["error" => "Note not found"], 404);
    }

    $fields = [];
    $params = [];
    $types = "";

    $allowedFields = ['title', 'content', 'subject', 'tags'];
    foreach ($allowedFields as $field) {
        if (isset($input[$field])) {
            $fields[] = "$field = ?";
            $params[] = $input[$field];
            $types .= "s";
        }
    }

    if (empty($fields)) {
        sendResponse(["error" => "No fields to update"], 400);
    }

    $params[] = $noteId;
    $params[] = $userId;
    $types .= "ii";

    $query = "UPDATE notes SET " . implode(", ", $fields) . " WHERE id = ? AND user_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param($types, ...$params);

    if ($stmt->execute()) {
        $fetchStmt = $conn->prepare("SELECT * FROM notes WHERE id = ?");
        $fetchStmt->bind_param("i", $noteId);
        $fetchStmt->execute();
        $note = $fetchStmt->get_result()->fetch_assoc();
        
        sendResponse(["message" => "Note updated!", "note" => $note]);
    } else {
        sendResponse(["error" => "Failed to update note"], 500);
    }
}

function deleteNote($conn, $userId) {
    $noteId = $_GET['id'] ?? 0;

    if (!$noteId) {
        sendResponse(["error" => "Note ID is required"], 400);
    }

    $stmt = $conn->prepare("DELETE FROM notes WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $noteId, $userId);

    if ($stmt->execute() && $stmt->affected_rows > 0) {
        sendResponse(["message" => "Note deleted!"]);
    } else {
        sendResponse(["error" => "Note not found"], 404);
    }
}
?>
