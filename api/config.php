<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Ganti dengan kredensial database Anda
$host = 'localhost';
$dbname = 'aduan_masyarakat';
$username = 'username_database_anda'; // Ganti dengan username database Anda
$password = 'password_database_anda'; // Ganti dengan password database Anda

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die(json_encode([
        'success' => false,
        'message' => 'Koneksi database gagal: ' . $e->getMessage()
    ]));
}
?>
