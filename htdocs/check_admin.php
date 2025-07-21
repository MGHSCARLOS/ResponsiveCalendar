<?php
session_start();
echo (isset($_SESSION['username']) && $_SESSION['role'] === 'admin') ? '1' : '0';
?>