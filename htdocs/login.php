

<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


session_start();
include 'db.php';

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  $user = $result->fetch_assoc();
  if ($password === $user['password']) { // Only if you're using plain passwords (not hashed)
    $_SESSION['username'] = $user['username'];
    $_SESSION['role'] = $user['role'];

    // ✅ Redirect based on role
   if ($user['role'] === 'admin') {
  header("Location: admin_dashboard.php");
} else {
  header("Location: index.html?login=success");
}
exit();
  } else {
    // Wrong password
    header("Location: index.php?error=wrongpassword");
    exit();
  }
} else {
  // No user found
  header("Location: index.php?error=nouser");
  exit();
}
?>