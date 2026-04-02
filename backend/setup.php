<?php
/**
 * EDUCERA Database Setup Script
 * Run this once to set up the database and tables
 * Access: http://localhost/educera/backend/setup.php
 */

header("Content-Type: text/html; charset=UTF-8");

$host = "localhost";
$user = "root";
$pass = "";

echo "<html><head><title>EDUCERA Database Setup</title>";
echo "<style>body{font-family:system-ui;max-width:600px;margin:40px auto;padding:20px;background:#f8fafc;}";
echo ".success{color:#059669;background:#d1fae5;padding:10px;border-radius:8px;margin:8px 0;}";
echo ".error{color:#dc2626;background:#fee2e2;padding:10px;border-radius:8px;margin:8px 0;}";
echo ".info{color:#1d4ed8;background:#dbeafe;padding:10px;border-radius:8px;margin:8px 0;}";
echo "h1{color:#6C63FF;}</style></head><body>";
echo "<h1>🎓 EDUCERA Database Setup</h1>";

// Connect to MySQL
$conn = new mysqli($host, $user, $pass);
if ($conn->connect_error) {
    echo "<div class='error'>❌ Connection failed: " . $conn->connect_error . "</div>";
    echo "<p>Make sure XAMPP MySQL is running!</p>";
    exit();
}
echo "<div class='success'>✅ Connected to MySQL</div>";

// Create database
$conn->query("CREATE DATABASE IF NOT EXISTS educera_db");
echo "<div class='success'>✅ Database 'educera_db' created/verified</div>";

$conn->select_db("educera_db");
$conn->set_charset("utf8mb4");

// Read and execute schema
$schemaFile = __DIR__ . '/database/schema.sql';
if (file_exists($schemaFile)) {
    $sql = file_get_contents($schemaFile);
    
    // Remove the CREATE DATABASE and USE lines (we already did that)
    $sql = preg_replace('/CREATE DATABASE.*?;/s', '', $sql);
    $sql = preg_replace('/USE\s+educera_db;/s', '', $sql);
    
    // Split by semicolons and execute each statement
    $statements = array_filter(array_map('trim', explode(';', $sql)));
    
    $success = 0;
    $errors = 0;
    
    foreach ($statements as $statement) {
        if (empty($statement) || $statement === '') continue;
        
        if ($conn->query($statement)) {
            $success++;
        } else {
            // Ignore duplicate entry errors for INSERT
            if ($conn->errno !== 1062) {
                echo "<div class='error'>⚠️ Error: " . $conn->error . "</div>";
                $errors++;
            }
        }
    }
    
    echo "<div class='success'>✅ Schema executed: $success statements successful</div>";
    if ($errors > 0) {
        echo "<div class='info'>ℹ️ $errors statements had errors (may be expected for re-runs)</div>";
    }
} else {
    echo "<div class='error'>❌ Schema file not found at: $schemaFile</div>";
}

// Verify tables
$result = $conn->query("SHOW TABLES");
echo "<h2>📋 Tables Created:</h2>";
echo "<ul>";
while ($row = $result->fetch_row()) {
    $countResult = $conn->query("SELECT COUNT(*) as c FROM " . $row[0]);
    $count = $countResult->fetch_assoc()['c'];
    echo "<li><strong>{$row[0]}</strong> ({$count} rows)</li>";
}
echo "</ul>";

echo "<div class='success' style='margin-top:20px;'>";
echo "<strong>🎉 Setup Complete!</strong><br>";
echo "You can now use EDUCERA at <a href='http://localhost:5174'>http://localhost:5174</a>";
echo "</div>";

echo "<div class='info'>";
echo "<strong>API Endpoints:</strong><br>";
echo "Auth: http://localhost/educera/backend/api/auth.php<br>";
echo "Tasks: http://localhost/educera/backend/api/tasks.php<br>";
echo "Attendance: http://localhost/educera/backend/api/attendance.php<br>";
echo "Notes: http://localhost/educera/backend/api/notes.php<br>";
echo "Subjects: http://localhost/educera/backend/api/subjects.php";
echo "</div>";

echo "</body></html>";

$conn->close();
?>
