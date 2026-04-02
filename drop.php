<?php
$conn = new mysqli('localhost', 'root', '', 'educera_db');
if ($conn->connect_error) die("Conn Failed");
$conn->query("DROP TABLE IF EXISTS subjects");
echo "Dropped.";
?>
