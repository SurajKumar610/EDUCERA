<?php
require_once __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = getInput();
$userId = getAuthUserId();

if (!$userId) {
    sendResponse(["error" => "Unauthorized. Please login first."], 401);
}

$action = $_GET['action'] ?? '';

switch ($method) {
    case 'GET':
        if ($action === 'stats') {
            getTaskStats($conn, $userId);
        } else {
            getTasks($conn, $userId);
        }
        break;
    case 'POST':
        createTask($conn, $userId, $input);
        break;
    case 'PUT':
        updateTask($conn, $userId, $input);
        break;
    case 'DELETE':
        deleteTask($conn, $userId);
        break;
    default:
        sendResponse(["error" => "Method not allowed"], 405);
}

function getTasks($conn, $userId) {
    $status = $_GET['status'] ?? '';
    $subject = $_GET['subject'] ?? '';
    $priority = $_GET['priority'] ?? '';

    $query = "SELECT * FROM tasks WHERE user_id = ?";
    $params = [$userId];
    $types = "i";

    if ($status) {
        $query .= " AND status = ?";
        $params[] = $status;
        $types .= "s";
    }
    if ($subject) {
        $query .= " AND subject = ?";
        $params[] = $subject;
        $types .= "s";
    }
    if ($priority) {
        $query .= " AND priority = ?";
        $params[] = $priority;
        $types .= "s";
    }

    $query .= " ORDER BY FIELD(priority, 'high', 'medium', 'low'), due_date ASC, created_at DESC";

    $stmt = $conn->prepare($query);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();

    $tasks = [];
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }

    sendResponse(["tasks" => $tasks]);
}

function createTask($conn, $userId, $input) {
    $title = trim($input['title'] ?? '');
    $description = $input['description'] ?? '';
    $subject = $input['subject'] ?? '';
    $priority = $input['priority'] ?? 'medium';
    $due_date = $input['due_date'] ?? null;

    if (empty($title)) {
        sendResponse(["error" => "Task title is required"], 400);
    }

    $stmt = $conn->prepare("INSERT INTO tasks (user_id, title, description, subject, priority, due_date) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssss", $userId, $title, $description, $subject, $priority, $due_date);

    if ($stmt->execute()) {
        $taskId = $conn->insert_id;
        // Fetch the created task
        $fetchStmt = $conn->prepare("SELECT * FROM tasks WHERE id = ?");
        $fetchStmt->bind_param("i", $taskId);
        $fetchStmt->execute();
        $task = $fetchStmt->get_result()->fetch_assoc();
        
        sendResponse(["message" => "Task created!", "task" => $task], 201);
    } else {
        sendResponse(["error" => "Failed to create task"], 500);
    }
}

function updateTask($conn, $userId, $input) {
    $taskId = $_GET['id'] ?? $input['id'] ?? 0;
    
    if (!$taskId) {
        sendResponse(["error" => "Task ID is required"], 400);
    }

    // Check ownership
    $stmt = $conn->prepare("SELECT * FROM tasks WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $taskId, $userId);
    $stmt->execute();
    if ($stmt->get_result()->num_rows === 0) {
        sendResponse(["error" => "Task not found"], 404);
    }

    // Build update query dynamically
    $fields = [];
    $params = [];
    $types = "";

    $allowedFields = ['title', 'description', 'subject', 'priority', 'status', 'due_date'];
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

    $params[] = $taskId;
    $params[] = $userId;
    $types .= "ii";

    $query = "UPDATE tasks SET " . implode(", ", $fields) . " WHERE id = ? AND user_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param($types, ...$params);

    if ($stmt->execute()) {
        // Fetch updated task
        $fetchStmt = $conn->prepare("SELECT * FROM tasks WHERE id = ?");
        $fetchStmt->bind_param("i", $taskId);
        $fetchStmt->execute();
        $task = $fetchStmt->get_result()->fetch_assoc();
        
        sendResponse(["message" => "Task updated!", "task" => $task]);
    } else {
        sendResponse(["error" => "Failed to update task"], 500);
    }
}

function deleteTask($conn, $userId) {
    $taskId = $_GET['id'] ?? 0;

    if (!$taskId) {
        sendResponse(["error" => "Task ID is required"], 400);
    }

    $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $taskId, $userId);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            sendResponse(["message" => "Task deleted!"]);
        } else {
            sendResponse(["error" => "Task not found"], 404);
        }
    } else {
        sendResponse(["error" => "Failed to delete task"], 500);
    }
}

function getTaskStats($conn, $userId) {
    $stmt = $conn->prepare("
        SELECT 
            COUNT(*) as total,
            SUM(status = 'pending') as pending,
            SUM(status = 'in_progress') as in_progress,
            SUM(status = 'completed') as completed,
            SUM(priority = 'high' AND status != 'completed') as high_priority
        FROM tasks WHERE user_id = ?
    ");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $stats = $stmt->get_result()->fetch_assoc();

    sendResponse(["stats" => $stats]);
}
?>
