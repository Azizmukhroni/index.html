CREATE DATABASE IF NOT EXISTS pengaduan_masyarakat;
USE pengaduan_masyarakat;

CREATE TABLE pengaduan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nomor_tiket VARCHAR(20) UNIQUE NOT NULL,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telepon VARCHAR(20) NOT NULL,
    kategori VARCHAR(50) NOT NULL,
    lokasi VARCHAR(255) NOT NULL,
    deskripsi TEXT NOT NULL,
    status ENUM('Menunggu', 'Diproses', 'Selesai', 'Ditolak') DEFAULT 'Menunggu',
    tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data contoh
INSERT INTO pengaduan (nomor_tiket, nama, email, telepon, kategori, lokasi, deskripsi, status) VALUES
('TKT-001', 'Ahmad Susanto', 'ahmad@email.com', '08123456789', 'infrastruktur', 'Jalan Merdeka No. 123', 'Jalan berlubang di depan rumah saya, sangat membahayakan pengendara.', 'Diproses'),
('TKT-002', 'Siti Rahayu', 'siti@email.com', '08234567890', 'lingkungan', 'RT 05 RW 02, Kelurahan Sejahtera', 'Sampah menumpuk di pinggir jalan sudah lebih dari 3 hari tidak diangkut.', 'Selesai'),
('TKT-003', 'Budi Santoso', 'budi@email.com', '08345678901', 'infrastruktur', 'Jalan Bahagia No. 45', 'Lampu penerangan jalan umum mati sejak seminggu yang lalu.', 'Menunggu');