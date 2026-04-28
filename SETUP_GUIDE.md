# Panduan Setup Form Survei Pendataan Usaha/Industri

## ⚠️ PENTING DIBACA DULU

Ada 3 langkah KRITIS yang HARUS dilakukan agar form bisa kirim data:
1. **Google Sheet sudah dibuat**
2. **Google Apps Script di-deploy dengan "Anyone"**
3. **SHEET_ID dan SCRIPT_ID sudah di-update di file**

Jika salah satu tidak dilakukan, form tidak akan bisa kirim data ke Google Sheets!

---

## 📋 Langkah 1: Setup Google Sheet

### 1.1 Buat Google Sheet Baru
1. Buka https://sheets.google.com
2. Klik "+ Blank" atau "New Spreadsheet"
3. Beri nama: "Survei Pendataan Usaha"
4. Tunggu sampai sheet terbuat (ambil beberapa detik)

### 1.2 Rename Tab Sheet Menjadi "Data Survei"
⚠️ **PENTING: Nama sheet HARUS persis "Data Survei"**

1. Lihat tab di bawah sheet (default "Sheet1")
2. Klik kanan pada "Sheet1"
3. Pilih "Rename"
4. Ketik: `Data Survei` (case sensitive, perhatikan spasi)
5. Tekan Enter

**Jangan sampai lupa!** Jika nama tidak cocok, data tidak akan masuk.

### 1.3 Salin Sheet ID
1. Lihat URL di address bar browser Anda
2. Format URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_DISINI/edit`
3. Cari bagian panjang di tengah-tengah (contoh: `1a2b3c4d5e6f7g8h9i0j1k2l`)
4. **Copy Sheet ID itu** (Ctrl+C)
5. **Simpan di tempat aman** untuk langkah berikutnya

**Contoh Sheet ID:** `1a2b3c4d5e6f7g8h9i0j1k2l`

---

## 🔧 Langkah 2: Setup Google Apps Script

### 2.1 Buka Google Apps Script Editor
1. Kembali ke Google Sheet Anda
2. Klik menu "Tools" di bagian atas
3. Pilih "Script editor"
4. Google Apps Script editor akan terbuka (tab baru)

### 2.2 Hapus Kode Default
1. Lihat kode default di editor (biasanya function myFunction)
2. **Hapus semua** (Ctrl+A, Delete)

### 2.3 Copy-Paste Kode Google Apps Script
1. Buka file `GOOGLE_APPS_SCRIPT.gs` di text editor
2. **Copy SEMUA kode** (Ctrl+A, Ctrl+C)
3. Paste ke Google Apps Script editor (Ctrl+V)

### 2.4 ⚠️ GANTI SHEET_ID (KRITIS!)
1. Cari baris: 
   ```javascript
   const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
   ```

2. **Ganti `YOUR_GOOGLE_SHEET_ID` dengan Sheet ID yang sudah Anda salin di langkah 1.3**
   
   Contoh hasil:
   ```javascript
   const SHEET_ID = '1a2b3c4d5e6f7g8h9i0j1k2l';
   ```

3. **DOUBLE CHECK:** Pastikan benar-benar diganti, jangan ada kesalahan

4. Klik "Save" (Ctrl+S)

### 2.5 Deploy sebagai Web App (KRITIS!)
⚠️ **Deploy HARUS dengan "Anyone"**, bukan "Only me"!

1. Klik tombol "Deploy" di kanan atas
2. Pilih "New deployment"
3. Klik icon "gear/⚙️" untuk pilih type
4. **Select type: "Web app"**
5. **Execute as:** (akun Anda) - default OK
6. **Who has access:** **Ubah ke "Anyone"** ← PENTING!
   - Jangan "Only me", jangan "Specific people"
   - HARUS "Anyone"
7. Klik "Deploy"
8. Akan muncul popup dengan Script ID dan URL

### 2.6 Salin Script ID
1. Dari popup setelah deploy, salin **Script ID**
   - Format: `AKfycbx4hyXnLCqac4oJAim0mqgD73zDjdv18UE7_TbpHbcu2fRpBjOHYPYhkAt3qHqYq-ny`
   - Terletak di URL: `https://script.google.com/macros/d/SCRIPT_ID_DISINI/usercall`

2. **Copy Script ID itu** (Ctrl+C)
3. **Simpan di tempat aman** untuk langkah berikutnya
4. Klik "Close" untuk tutup popup

**💾 Simpan kunci penting:**
- [ ] Sheet ID: ___________________________
- [ ] Script ID: ___________________________
- [ ] Nama sheet: Data Survei ✓

---

## 💻 Langkah 3: Update Form HTML

### 3.1 Buka file index.html
1. Buka file `index.html` dengan text editor (Notepad, VS Code, dll)
2. Cari baris yang mulai dengan:
   ```javascript
   const SCRIPT_ID = '
   ```

### 3.2 ⚠️ GANTI SCRIPT_ID (KRITIS!)
1. Lihat baris:
   ```javascript
   const SCRIPT_ID = 'AKfycbx4hyXnLCqac4oJAim0mqgD73zDjdv18UE7_TbpHbcu2fRpBjOHYPYhkAt3qHqYq-ny';
   ```

2. **Ganti Script ID itu dengan Script ID Anda dari langkah 2.6**
   
   Contoh (jangan copy ini, gunakan Script ID Anda sendiri):
   ```javascript
   const SCRIPT_ID = 'AKfycbx_MILIK_ANDA_SENDIRI_abc123xyz';
   ```

3. **DOUBLE CHECK:** Pastikan benar-benar diganti, jangan ada kesalahan

4. **Save file** (Ctrl+S)

5. **PENTING:** Refresh browser (Ctrl+F5) untuk hard refresh

### 3.3 Verify
1. Buka browser Developer Tools (F12)
2. Buka tab "Console"
3. Harus muncul:
   ```
   Form siap. Script ID: AKfycbx_MILIK_ANDA_SENDIRI_abc123xyz
   Testing koneksi ke: https://script.google.com/macros/d/AKfycbx_MILIK_ANDA_SENDIRI_abc123xyz/usercall
   ```

4. Jika ada "Form siap" message, berarti setup sudah benar!

---

## 🚀 Langkah 4: Deploy ke Vercel (Optional)

---

## 🚀 Langkah 4: Deploy ke Vercel

### Opsi A: Menggunakan GitHub (Recommended)

1. **Setup GitHub Repository**
   ```bash
   # Di folder project
   git init
   git add .
   git commit -m "Initial commit - Form Survei Pendataan Usaha"
   ```

2. **Push ke GitHub**
   - Buat repo baru di https://github.com/new
   - Ikuti instruksi untuk push ke repo

3. **Deploy ke Vercel**
   - Buka https://vercel.com
   - Login dengan GitHub
   - Klik "Add New..." → "Project"
   - Select repository Anda
   - Klik "Deploy"
   - Selesai! Vercel akan memberikan URL publik

### Opsi B: Upload Langsung ke Vercel (Quick)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd c:\Users\ASUS\Downloads\simbaaaa
   vercel
   ```

3. **Ikuti petunjuk di command line**

---

## ✅ Testing

1. **Buka form Anda:**
   - Jika via GitHub+Vercel: URL dari Vercel dashboard
   - Jika lokal: `file:///c:\Users\ASUS\Downloads\simbaaaa\index.html`

2. **Isi form:**
   - **Blok 1**: Isi data usaha (minimal field required)
   - **Blok 2**: Isi produk dan data pekerja
   - **Blok 3**: Isi catatan (optional)
   - **Blok 4**: Isi info pemberi jawaban

3. **Klik "Kirim Data Survei"**

4. **Cek Google Sheets**
   - Refresh Google Sheet Anda
   - Seharusnya ada baris baru dengan data yang Anda masukkan

---

## 🔐 Troubleshooting

### Error "handleResponse is not defined"
- Pastikan Script ID sudah benar di index.html
- Pastikan Google Apps Script sudah di-deploy

### Data tidak masuk ke Google Sheets
- Pastikan SHEET_ID di Google Apps Script sudah benar
- Pastikan sheet bernama "Data Survei" sudah ada
- Check permissions: Google Apps Script harus punya akses ke sheet

### CORS Error
- Google Apps Script seharusnya tidak ada CORS error
- Jika ada masalah, coba deploy ulang sebagai "Anyone"

### GPS tidak berfungsi
- Pastikan browser mengijinkan akses lokasi saat diminta
- Cek bahwa Anda membuka form di HTTPS (atau localhost)
- GPS perlu internet connection untuk triangulasi

### Form terlalu panjang
- Semua blok bisa dibuka/tutup satu per satu
- Submit di akhir akan langsung kirim semua data
- Tidak perlu isi blok yang tidak relevan

---

## 📱 Customization

### Tambah Field Baru
1. **Di index.html:**
   ```html
   <div class="form-group">
       <label for="fieldBaru">Label Field <span class="required">*</span></label>
       <input type="text" id="fieldBaru" name="fieldBaru" required>
   </div>
   ```

2. **Di Google Apps Script:**
   - Tambahkan header kolom baru
   - Tambahkan `data.fieldBaru` ke array `row`

### Ubah Klasifikasi Industri
- Edit `<select>` untuk `klasifikasiIndustri` di index.html
- Ganti options sesuai kebutuhan

### Ubah Styling
- Edit CSS di bagian `<style>` di index.html
- Ganti warna: `#667eea` (ungu) dan `#764ba2` (ungu gelap)
- Adjust padding/spacing sesuai preferensi

---

## 🔍 Struktur Sheet yang Dihasilkan

Kolom otomatis yang dibuat:

**BLOK 1 - Keterangan Usaha:**
- Timestamp, Provinsi, Kabupaten, Kecamatan, Desa, SLS
- Nama Usaha/Perusahaan, Alamat, Latitude, Longitude
- Nama Pengusaha, Nomor HP, Kegiatan Utama, Klasifikasi Industri

**BLOK 2 - Produksi & Pekerja:**
- Produk Info (JSON format), Jumlah Pekerja Total
- Pekerja Tetap Dibayar, Tidak Tetap, Keluarga
- Pendidikan: Bawah SD, SD, SMP, SMA/SMK, Perguruan Tinggi
- Pekerja Laki-Laki, Perempuan

**BLOK 3 - Catatan:**
- Catatan

**BLOK 4 - Pemberi Jawaban:**
- Nama, Jabatan, Kontak HP, Tanggal Kunjungan

---

## 📞 Support
Jika ada masalah, check:
- Console browser (F12) untuk error JavaScript
- Google Apps Script logs (Execution > Logs)
- Vercel deployment logs
- Bahwa file index.html sudah diupdate dengan Script ID yang benar
