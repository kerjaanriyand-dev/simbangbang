# Form Survei Pendataan Usaha/Industri 📋

Form online untuk survei pendataan usaha dengan integrasi Google Sheets dan deployment ke Vercel.

## Features ✨

- 📊 4 Blok pertanyaan terstruktur sesuai standar statistik
- 🌍 GPS location tagging
- 📸 Upload foto produk
- 📱 Responsive design (mobile & desktop)
- 💾 Data otomatis tersimpan di Google Sheets
- ⚡ Deployment mudah ke Vercel
- 🔒 Secure integration dengan Google

## Struktur Form 📋

### **Blok 1: Keterangan Usaha**
- Lokasi: Provinsi, Kabupaten, Kecamatan, Desa, SLS
- Info Usaha: Nama, Alamat, GPS Tag
- Info Pemilik: Nama, HP, Kegiatan Utama
- Klasifikasi Industri (Mikro/Kecil/Menengah/Besar)

### **Blok 2: Produksi dan Pekerja**
- **201** - Produk: Nama, Spesifikasi, Satuan, Harga, Foto
- **202** - Total Pekerja
- **202a** - Status Pembayaran: Tetap, Tidak Tetap, Keluarga
- **202b** - Pendidikan: Bawah SD, SD, SMP, SMA/SMK, Perguruan Tinggi
- **202c** - Jenis Kelamin: Laki-Laki, Perempuan

### **Blok 3: Catatan**
- Catatan tambahan dari survei

### **Blok 4: Keterangan Pemberi Jawaban**
- Nama, Jabatan, HP, Tanggal Kunjungan

## Quick Start 🚀

### 1. Setup Google Sheets & Google Apps Script
Ikuti langkah-langkah detail di [SETUP_GUIDE.md](SETUP_GUIDE.md)

### 2. Update Script ID
Edit `index.html` dan ganti `YOUR_SCRIPT_ID` dengan ID dari Google Apps Script

### 3. Deploy ke Vercel
```bash
npm install -g vercel
vercel
```

Selesai! Form Anda sudah online.

## File Structure 📁

```
.
├── index.html                  # Form survei lengkap (4 blok)
├── GOOGLE_APPS_SCRIPT.gs      # Backend untuk Google Sheets
├── SETUP_GUIDE.md             # Panduan setup lengkap
├── CHECKLIST.md               # Checklist interaktif
├── package.json               # NPM configuration
├── vercel.json                # Vercel configuration
└── README.md                  # File ini
```

## Key Features

✅ **Collapsible Blocks** - Setiap blok bisa dibuka/tutup  
✅ **Progress Bar** - Track persentase form yang sudah diisi  
✅ **GPS Location** - Ambil koordinat langsung dari device  
✅ **Dynamic Products** - Tambah/hapus produk sesuai kebutuhan  
✅ **Responsive Design** - Bekerja di mobile, tablet, desktop  
✅ **Real-time Sync** - Data langsung ke Google Sheets  

## Customization 🎨

### Ubah Warna
Edit CSS colors di `index.html`:
- Primary: `#667eea` (ungu biru)
- Secondary: `#764ba2` (ungu)

### Tambah Field
1. Tambahkan input di `index.html`
2. Tambahkan header di Google Apps Script
3. Tambahkan ke array `row` di script

### Ubah Klasifikasi Industri
Edit `<select>` untuk `klasifikasiIndustri` di `index.html`

## Testing Lokal 🧪

```bash
# Menggunakan Python
python -m http.server 3000

# Atau Node.js
npx http-server

# Kemudian buka: http://localhost:3000
```

## Troubleshooting 🔧

**Q: Data tidak masuk ke Google Sheets**
- Cek Sheet ID di Google Apps Script
- Cek sheet bernama "Data Survei" sudah ada
- Cek permissions Google Apps Script

**Q: Form error saat submit**
- Lihat console browser (F12)
- Cek Script ID sudah benar
- Cek Google Apps Script sudah di-deploy

**Q: GPS tidak berfungsi**
- Pastikan browser mengijinkan akses lokasi
- Cek bahwa perangkat punya akses GPS/internet
- GPS hanya bekerja di HTTPS atau localhost

**Q: Foto produk tidak terupload**
- File uploads tidak bisa langsung via form ini
- Download CSV dari Google Sheets untuk lihat data
- Pertimbangkan Google Forms untuk upload files

## Browser Support 🌐

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Data Export 📊

1. Buka Google Sheet
2. Klik "File" → "Download" 
3. Pilih format: CSV, Excel, PDF

## Security Notes 🔐

- Form bersifat public (semua orang bisa akses)
- Hindari data sensitif/rahasia
- Google Apps Script run as your account
- Backup Google Sheet secara berkala

## Next Steps 🎯

1. ✅ Setup Google Sheet & Apps Script
2. ✅ Update Script ID di form
3. ✅ Test form locally
4. ✅ Deploy ke Vercel
5. ✅ Share form link
6. ✅ Monitor data masuk

## License 📄

MIT License - Feel free to use and modify!

---

**Butuh bantuan?** Lihat SETUP_GUIDE.md untuk panduan lengkap!

