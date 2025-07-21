<?php
session_start();
if ($_SESSION['role'] !== 'user') {
  header("Location: index.html");
  exit();
}
?>
<!DOCTYPE html>
<html>
<head><title>User Dashboard</title></head>
<body>
  <h1>Welcome <?php echo $_SESSION['username']; ?></h1>
  <a href="calendar.php">Go to Calendar</a> | <a href="logout.php">Logout</a>
</body>
</html>
