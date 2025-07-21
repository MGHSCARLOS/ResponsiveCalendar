<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $role = 'user'; // default role

    // Check password length
    if (strlen($password) < 6 || strlen($password) > 20) {
        echo "<script>
            alert('Password must be between 6 and 20 characters.');
            window.location.href = 'register.html';
        </script>";
        exit();
    }

    // Insert the user into the database
    $sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $password, $role);

    if ($stmt->execute()) {
        echo "<script>
            alert('Registration successful!');
            window.location.href = 'index.php';
        </script>";
    } else {
        echo "<script>
            alert('Registration failed. Username might already exist.');
            window.location.href = 'register.html';
        </script>";
    }

    $stmt->close();
    $conn->close();
}
?>