

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MGHS Calendar Login</title>
  <link rel="stylesheet" href="style.css">
</head>

<header class="main-header">
    <img src="assets/main-banner.jpg" alt="Main Banner" class="main-banner">
  </header>
  <h1><center>MGHS SOLUTION AND ADVERTISING SERVICES INTERNSHIP</center> </h1>
<body>
<script>
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('login') === 'success') {
    alert('Login successful!');
  }
</script>
  <div class="login-container">

    <h2>Login</h2>
    <form action="login.php" method="POST">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="register.html">Register here</a></p>
  </div>
</body>
</html>
