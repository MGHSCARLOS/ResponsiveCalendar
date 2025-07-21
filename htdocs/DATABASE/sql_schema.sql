CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') NOT NULL
);

CREATE TABLE time_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  time_in DATETIME,
  time_out DATETIME
);
