<?php
include 'config.php';

try {
    $stmt = $pdo->query("SELECT * FROM pengaduan ORDER BY created_at DESC LIMIT 5");
    $complaints = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'data' => $complaints
    ]);
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Gagal mengambil data: ' . $e->getMessage()
    ]);
}
?>
