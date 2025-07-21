<?php
$host = 'sql112.infinityfree.com';
$db   = 'if0_39520292_DATABASE';
$user = 'if0_39520292';
$pass = '319nUQBsQ9ilt';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}
?>
