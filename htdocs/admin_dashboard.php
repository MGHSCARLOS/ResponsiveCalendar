<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
include 'db.php';

if (!isset($_SESSION['username']) || $_SESSION['role'] !== 'admin') {
    header("Location: index.html");
    exit();
}

if (isset($_GET['delete'])) {
    $deleteId = intval($_GET['delete']);
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $deleteId);
    $stmt->execute();
    header("Location: admin_dashboard.php");
    exit();
}

$result = $conn->query("SELECT id, username, role FROM users");
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Admin Dashboard</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="admin">
    <div class="admin-navbar">
      <div><strong>Admin Dashboard</strong></div>
      <div>
        <a href="index.html">Go to Main System</a>
        <form action="logout.php" method="post" style="display:inline;">
          <button type="submit" class="admin-logout-btn">Logout</button>
        </form>
      </div>
    </div>

    <div class="admin-container">
      <h2>Existing User Accounts</h2>
      <table class="admin-table">
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
        <?php while ($row = $result->fetch_assoc()): ?>
          <tr>
            <td><?= $row['id'] ?></td>
            <td><?= htmlspecialchars($row['username']) ?></td>
            <td><?= $row['role'] ?></td>
            <td>
              <?php if ($row['username'] !== $_SESSION['username']): ?>
                <a class="admin-delete-btn" href="?delete=<?= $row['id'] ?>" onclick="return confirm('Are you sure you want to delete this user?')">Delete</a>
              <?php else: ?>
                (You)
              <?php endif; ?>
            </td>
          </tr>
        <?php endwhile; ?>
      </table>
    </div>
  </div>
</body>
</html>