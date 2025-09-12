document.addEventListener('DOMContentLoaded', function() {
    // Load pengaduan terbaru
    loadRecentComplaints();
    
    // Handle form submission
    document.getElementById('complaintForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            nama: document.getElementById('name').value,
            email: document.getElementById('email').value,
            telepon: document.getElementById('phone').value,
            kategori: document.getElementById('category').value,
            lokasi: document.getElementById('location').value,
            deskripsi: document.getElementById('description').value
        };
        
        try {
            const response = await fetch('/api/pengaduan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert(`Pengaduan berhasil dikirim!\nNomor Tiket Anda: ${result.nomor_tiket}\nSimpan nomor ini untuk melacak status pengaduan.`);
                document.getElementById('complaintForm').reset();
            } else {
                alert('Terjadi kesalahan: ' + result.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mengirim pengaduan');
        }
    });
    
    // Handle status check
    document.getElementById('checkStatusBtn').addEventListener('click', checkStatus);
});

async function checkStatus() {
    const ticketNumber = document.getElementById('ticketNumber').value;
    
    if (!ticketNumber) {
        alert('Masukkan nomor tiket terlebih dahulu');
        return;
    }
    
    try {
        const response = await fetch(`/api/status/${ticketNumber}`);
        const result = await response.json();
        
        if (response.ok) {
            const statusResult = document.getElementById('statusResult');
            statusResult.style.display = 'block';
            
            // Hapus semua kelas status sebelumnya
            statusResult.classList.remove('status-pending', 'status-process', 'status-completed', 'status-rejected');
            
            // Tambahkan kelas status yang sesuai
            if (result.status === 'Menunggu') {
                statusResult.classList.add('status-pending');
            } else if (result.status === 'Diproses') {
                statusResult.classList.add('status-process');
            } else if (result.status === 'Selesai') {
                statusResult.classList.add('status-completed');
            } else if (result.status === 'Ditolak') {
                statusResult.classList.add('status-rejected');
            }
            
            // Isi data hasil pengecekan
            document.getElementById('statusText').textContent = result.status || 'Menunggu';
            document.getElementById('ticketResult').textContent = result.nomor_tiket;
            document.getElementById('dateResult').textContent = new Date(result.tanggal).toLocaleDateString('id-ID');
            document.getElementById('detailResult').textContent = result.deskripsi;
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat memeriksa status');
    }
}

async function loadRecentComplaints() {
    try {
        const response = await fetch('/api/pengaduan');
        const complaints = await response.json();
        
        const container = document.getElementById('recentComplaints');
        container.innerHTML = '';
        
        if (complaints.length === 0) {
            container.innerHTML = '<p>Belum ada pengaduan</p>';
            return;
        }
        
        complaints.forEach(complaint => {
            const complaintEl = document.createElement('div');
            complaintEl.className = 'complaint-item';
            
            complaintEl.innerHTML = `
                <h3>${complaint.lokasi}</h3>
                <div class="complaint-meta">
                    <p>Oleh: ${complaint.nama} | ${new Date(complaint.tanggal).toLocaleDateString('id-ID')}</p>
                </div>
                <p>${complaint.deskripsi.substring(0, 100)}...</p>
                <span class="complaint-status status-badge-${complaint.status || 'pending'}">${complaint.status || 'Menunggu'}</span>
            `;
            
            container.appendChild(complaintEl);
        });
    } catch (error) {
        console.error('Error loading complaints:', error);
        document.getElementById('recentComplaints').innerHTML = '<p>Gagal memuat data pengaduan</p>';
    }
}