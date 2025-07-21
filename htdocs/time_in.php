<?php
session_start();
include 'db.php';
$username = $_SESSION['username'];
$time = $_POST['time'];
$conn->query("INSERT INTO time_logs (username, time_in) VALUES ('$username', '$time')");
?>
