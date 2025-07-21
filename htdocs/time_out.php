<?php
session_start();
include 'db.php';
$username = $_SESSION['username'];
$time = $_POST['time'];
$conn->query("UPDATE time_logs SET time_out = '$time' WHERE username = '$username' AND time_out IS NULL ORDER BY id DESC LIMIT 1");
?>
