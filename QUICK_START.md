# ⚡ QUICK START - Setup 3 Langkah

**Waktu: ~10 menit. Jangan skip langkah apapun!**

---

## ✅ LANGKAH 1: Google Sheet + Script ID (5 menit)

### 1A. Buat Sheet
```
1. https://sheets.google.com
2. + Blank
3. Nama: "Survei Pendataan Usaha"
4. Tunggu loading
```

### 1B. Rename Tab
```
1. Klik kanan "Sheet1" (tab di bawah)
2. Rename → "Data Survei" (exact!)
3. Enter
```

### 1C. Copy Sheet ID
```
URL bar: https://docs.google.com/spreadsheets/d/SHEET_ID/edit
                                                    ↑
                                                Copy ini (panjang)
```

### 1D. Setup Google Apps Script
```
1. Tools → Script editor
2. Select All (Ctrl+A) → Delete
3. Open GOOGLE_APPS_SCRIPT.gs file
4. Copy All (Ctrl+A) → Paste di Script Editor
5. Find: const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'
6. REPLACE dengan Sheet ID dari 1C
7. Save (Ctrl+S)
```

### 1E. Deploy Web App (⚠️ PENTING)
```
1. Deploy → New deployment
2. ⚙️ → Web app
3. Execute as: (your account)
4. Who has access: "Anyone" ← NOT "Only me"!
5. Deploy
6. COPY Script ID dari popup URL:
   https://script.google.com/macros/d/SCRIPT_ID/usercall
                                         ↑
                                      Copy ini
7. Close
```

---

## ✅ LANGKAH 2: Update Form (2 menit)

### 2A. Edit index.html
```
1. Open index.html di text editor
2. Find: const SCRIPT_ID = '...'
3. REPLACE dengan Script ID dari 1E
4. Save (Ctrl+S)
```

### 2B. Refresh Browser
```
F12 untuk lihat Console
Lihat message: "Form siap. Script ID: ..."
Jika ada, setup BERHASIL! ✓
```

---

## ✅ LANGKAH 3: Test (3 menit)

### 3A. Isi Form Minimal
```
BLOK 1:
- Provinsi: test
- Kabupaten: test
- Kecamatan: test
- Desa: test
- Nama Usaha: test
- Alamat: test
- Nama Pengusaha: test
- Nomor HP: 081
- Kegiatan Utama: test
- Klasifikasi: Industri Mikro

BLOK 2:
- Jumlah Pekerja: 1

BLOK 4:
- Nama: test
- Jabatan: test
- HP: 081
- Tanggal: (pilih hari ini)

Submit!
```

### 3B. Cek Google Sheet
```
1. Buka Google Sheet
2. Refresh (F5)
3. Lihat apakah ada baris baru dengan data
4. Jika ADA → BERHASIL! 🎉
5. Jika TIDAK ADA → Baca DEBUG_GUIDE.md
```

---

## 🆘 JIKA TIDAK BERHASIL

**Gejala:** Loading terus-menerus atau tidak ada notifikasi

**Solusi urut:**

1. **Cek Console (F12)**
   - Harus muncul: "Form siap. Script ID: ..."
   - Jika tidak ada → Belum save/refresh index.html

2. **Cek Google Apps Script Deployment**
   - Tools → Script editor
   - Deploy → Manage deployments
   - Ada deployment aktif?
   - Role: "Anyone"? (bukan "Only me")

3. **Cek SHEET_ID di Google Apps Script**
   - Tools → Script editor
   - Find: const SHEET_ID = '...'
   - Apakah sudah di-replace? Jangan masih "YOUR_GOOGLE_SHEET_ID"

4. **Cek Sheet Name**
   - Google Sheet tab harus: "Data Survei" (exact, case sensitive)
   - Jangan "data survei" atau "DataSurvei"

5. **Hard Refresh Browser**
   - Ctrl+F5 (bukan cuma F5)

---

## 📋 CHECKLIST

Setup Berhasil jika:
- [ ] Sheet "Data Survei" ada
- [ ] Script ID di-update di index.html
- [ ] Console muncul "Form siap" message
- [ ] Form bisa submit tanpa error
- [ ] Data muncul di Google Sheet dalam 3 detik

---

## 📞 HELP

Error? Lihat: **DEBUG_GUIDE.md**

---

**Selamat! Form Anda siap digunakan! 🎉**

Langkah berikutnya:
- Test dengan data real
- Deploy ke Vercel (lihat SETUP_GUIDE.md langkah 4)
- Share URL ke users
