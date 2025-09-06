<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data dari request body
    $input = json_decode(file_get_contents('php://input'), true);
    
    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $phone = $input['phone'] ?? '';
    $location = $input['location'] ?? '';
    $category = $input['category'] ?? '';
    $description = $input['description'] ?? '';
    
    // Validasi data
    if (empty($name) || empty($email) || empty($location) || empty($category) || empty($description)) {
        echo json_encode([
            'success' => false,
            'message' => 'Data tidak lengkap'
        ]);
        exit;
    }
    
    try {
        $stmt = $pdo->prepare("INSERT INTO pengaduan (name, email, phone, location, category, description) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $email, $phone, $location, $category, $description]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Pengaduan berhasil disimpan',
            'id' => $pdo->lastInsertId()
        ]);
    } catch(PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Gagal menyimpan pengaduan: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Metode request tidak valid'
    ]);
}
?>
