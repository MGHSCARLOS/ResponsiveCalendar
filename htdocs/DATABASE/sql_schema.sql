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
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(20) NOT NULL, -- Store passwords in plain text (6-20 characters)
  role ENUM('admin', 'user') NOT NULL DEFAULT 'user'
);


CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


