<?php
session_start();
if (!isset($_SESSION['username'])) {
  header("Location: index.html");
  exit();
}
?>
<!DOCTYPE html>
<html>
<head>
  <title>Calendar</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Welcome <?php echo $_SESSION['username']; ?> to your Calendar</h1>
  <a href="logout.php">Logout</a>

  <div id="calendar"></div>
  <button onclick="timeIn()">Time In</button>
  <button onclick="timeOut()">Time Out</button>

  <script src="time_log.js"></script>
</body>
</html>
<?php
session_start();
if (!isset($_SESSION['username'])) {
  header("Location: index.html");
  exit();
}


