<?php
require_once __DIR__ . '/config/db.php';
if ($conn->query("ALTER TABLE users ADD COLUMN program VARCHAR(100) DEFAULT NULL AFTER level")) {
    echo "Successfully added program column\n";
} else {
    echo "Error or column already exists: " . $conn->error . "\n";
}
?>
