const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Koneksi ke Database MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // User default XAMPP
    password: '', // Password default XAMPP (biasanya kosong)
    database: 'pengaduan_masyarakat'
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API Routes

// Submit pengaduan baru
app.post('/api/pengaduan', (req, res) => {
    const { nama, email, telepon, kategori, lokasi, deskripsi } = req.body;
    const nomor_tiket = 'TKT-' + Date.now();
    
    const query = 'INSERT INTO pengaduan (nomor_tiket, nama, email, telepon, kategori, lokasi, deskripsi) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    db.execute(query, [nomor_tiket, nama, email, telepon, kategori, lokasi, deskripsi], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Gagal menyimpan pengaduan' });
        } else {
            res.json({ 
                success: true, 
                message: 'Pengaduan berhasil dikirim', 
                nomor_tiket: nomor_tiket 
            });
        }
    });
});

// Cek status pengaduan
app.get('/api/status/:tiket', (req, res) => {
    const tiket = req.params.tiket;
    
    const query = 'SELECT * FROM pengaduan WHERE nomor_tiket = ?';
    
    db.execute(query, [tiket], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Gagal mengambil data' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Nomor tiket tidak ditemukan' });
            }
        }
    });
});

// Ambil semua pengaduan (untuk dashboard)
app.get('/api/pengaduan', (req, res) => {
    const query = 'SELECT * FROM pengaduan ORDER BY tanggal DESC LIMIT 10';
    
    db.execute(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Gagal mengambil data' });
        } else {
            res.json(results);
        }
    });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});