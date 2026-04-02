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
            getAttendanceStats($conn, $userId);
        } elseif ($action === 'monthly') {
            getMonthlyAttendance($conn, $userId);
        } else {
            getAttendance($conn, $userId);
        }
        break;
    case 'POST':
        markAttendance($conn, $userId, $input);
        break;
    case 'PUT':
        updateAttendance($conn, $userId, $input);
        break;
    case 'DELETE':
        deleteAttendance($conn, $userId);
        break;
    default:
        sendResponse(["error" => "Method not allowed"], 405);
}

function getAttendance($conn, $userId) {
    $month = $_GET['month'] ?? date('m');
    $year = $_GET['year'] ?? date('Y');
    $subject = $_GET['subject'] ?? '';

    $query = "SELECT * FROM attendance WHERE user_id = ? AND MONTH(date) = ? AND YEAR(date) = ?";
    $params = [$userId, $month, $year];
    $types = "iii";

    if ($subject) {
        $query .= " AND subject = ?";
        $params[] = $subject;
        $types .= "s";
    }

    $query .= " ORDER BY date DESC";

    $stmt = $conn->prepare($query);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();

    $records = [];
    while ($row = $result->fetch_assoc()) {
        $records[] = $row;
    }

    sendResponse(["attendance" => $records]);
}

function markAttendance($conn, $userId, $input) {
    $date = $input['date'] ?? date('Y-m-d');
    $status = $input['status'] ?? 'present';
    $subject = $input['subject'] ?? null;
    $notes = $input['notes'] ?? '';

    // Validate date
    if (!strtotime($date)) {
        sendResponse(["error" => "Invalid date format"], 400);
    }

    // Check if already marked
    $checkQuery = "SELECT id FROM attendance WHERE user_id = ? AND date = ?";
    $checkParams = [$userId, $date];
    $checkTypes = "is";
    
    if ($subject) {
        $checkQuery .= " AND subject = ?";
        $checkParams[] = $subject;
        $checkTypes .= "s";
    } else {
        $checkQuery .= " AND subject IS NULL";
    }

    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param($checkTypes, ...$checkParams);
    $stmt->execute();
    
    if ($stmt->get_result()->num_rows > 0) {
        sendResponse(["error" => "Attendance already marked for this date"], 409);
    }

    $stmt = $conn->prepare("INSERT INTO attendance (user_id, date, status, subject, notes) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("issss", $userId, $date, $status, $subject, $notes);

    if ($stmt->execute()) {
        $recordId = $conn->insert_id;
        sendResponse(["message" => "Attendance marked!", "id" => $recordId], 201);
    } else {
        sendResponse(["error" => "Failed to mark attendance"], 500);
    }
}

function updateAttendance($conn, $userId, $input) {
    $id = $_GET['id'] ?? $input['id'] ?? 0;
    $status = $input['status'] ?? '';
    $notes = $input['notes'] ?? '';
    $subject = $input['subject'] ?? null;

    if (!$id || !$status) {
        sendResponse(["error" => "ID and status are required"], 400);
    }

    $stmt = $conn->prepare("UPDATE attendance SET status = ?, subject = ?, notes = ? WHERE id = ? AND user_id = ?");
    $stmt->bind_param("sssii", $status, $subject, $notes, $id, $userId);

    if ($stmt->execute()) {
        sendResponse(["message" => "Attendance updated!"]);
    } else {
        sendResponse(["error" => "Record not found or not updated"], 404);
    }
}

function deleteAttendance($conn, $userId) {
    $id = $_GET['id'] ?? 0;

    if (!$id) {
        sendResponse(["error" => "Record ID is required"], 400);
    }

    $stmt = $conn->prepare("DELETE FROM attendance WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $id, $userId);

    if ($stmt->execute() && $stmt->affected_rows > 0) {
        sendResponse(["message" => "Attendance record deleted!"]);
    } else {
        sendResponse(["error" => "Record not found"], 404);
    }
}

function getAttendanceStats($conn, $userId) {
    $month = $_GET['month'] ?? date('m');
    $year = $_GET['year'] ?? date('Y');

    $stmt = $conn->prepare("
        SELECT 
            COUNT(*) as total_days,
            SUM(status = 'present') as present,
            SUM(status = 'absent') as absent,
            SUM(status = 'half_day') as half_days,
            ROUND(SUM(status = 'present') * 100.0 / NULLIF(COUNT(*), 0), 1) as percentage
        FROM attendance 
        WHERE user_id = ? AND MONTH(date) = ? AND YEAR(date) = ?
    ");
    $stmt->bind_param("iii", $userId, $month, $year);
    $stmt->execute();
    $stats = $stmt->get_result()->fetch_assoc();

    // Get streak
    $streakStmt = $conn->prepare("
        SELECT date FROM attendance 
        WHERE user_id = ? AND status = 'present' 
        ORDER BY date DESC
    ");
    $streakStmt->bind_param("i", $userId);
    $streakStmt->execute();
    $streakResult = $streakStmt->get_result();
    
    $streak = 0;
    $expectedDate = date('Y-m-d');
    while ($row = $streakResult->fetch_assoc()) {
        if ($row['date'] === $expectedDate) {
            $streak++;
            $expectedDate = date('Y-m-d', strtotime($expectedDate . ' -1 day'));
        } else {
            break;
        }
    }

    $stats['streak'] = $streak;
    sendResponse(["stats" => $stats]);
}

function getMonthlyAttendance($conn, $userId) {
    $year = $_GET['year'] ?? date('Y');
    
    $stmt = $conn->prepare("
        SELECT 
            MONTH(date) as month,
            COUNT(*) as total_days,
            SUM(status = 'present') as present,
            SUM(status = 'absent') as absent,
            ROUND(SUM(status = 'present') * 100.0 / NULLIF(COUNT(*), 0), 1) as percentage
        FROM attendance 
        WHERE user_id = ? AND YEAR(date) = ?
        GROUP BY MONTH(date)
        ORDER BY MONTH(date)
    ");
    $stmt->bind_param("ii", $userId, $year);
    $stmt->execute();
    $result = $stmt->get_result();

    $monthly = [];
    while ($row = $result->fetch_assoc()) {
        $monthly[] = $row;
    }

    sendResponse(["monthly" => $monthly]);
}
?>
