# 🔧 PANDUAN DEBUGGING - Form Tidak Bisa Kirim Data

## ⚠️ Diagnosis Cepat

Jika loading tidak pernah selesai dan data tidak masuk ke Google Sheets, ikuti steps berikut:

---

## ✅ CHECKLIST DEBUGGING

### 1️⃣ Verifikasi Google Apps Script Sudah Dideploy

**Steps:**
1. Buka Google Sheet Anda
2. Klik "Tools" → "Script editor"
3. Cari baris: `const SHEET_ID = '...'`
4. **PENTING:** Pastikan `SHEET_ID` sudah DIGANTI dengan Sheet ID Anda yang benar!
   - Sheet ID ada di URL: `https://docs.google.com/spreadsheets/d/**SHEET_ID**/edit`
5. Pastikan sheet "Data Survei" sudah ada (lihat tab di bawah)
6. Klik "Deploy" → "Deployments" 
7. **Pastikan ada deployment aktif!** Jika tidak ada, deploy ulang:
   - Klik "New deployment"
   - Type: "Web app"
   - Execute as: (your email)
   - Who has access: **"Anyone"** ✅ IMPORTANT!
   - Klik "Deploy"

❌ **Masalah umum:** Deployment dengan "Only me" tidak akan bisa diakses dari form public

---

### 2️⃣ Verifikasi Script ID Benar di index.html

**Steps:**
1. Buka file `index.html` di text editor
2. Cari baris: `const SCRIPT_ID = '...'`
3. Salin Script ID dari URL deployment Google Apps Script:
   ```
   https://script.google.com/macros/d/SCRIPT_ID_DISINI/usercall
   ```
4. Copy script ID tanpa `/usercall`
5. Ganti di file index.html: 
   ```javascript
   const SCRIPT_ID = 'AKfycbx4hyXnLCqac4oJAim0mqgD73zDjdv18UE7_TbpHbcu2fRpBjOHYPYhkAt3qHqYq-ny';
   ```
6. Save file
7. Refresh browser (Ctrl+F5 hard refresh)

❌ **Masalah umum:** Script ID salah/tidak cocok, atau browser belum refresh

---

### 3️⃣ Test dengan Console Browser

**Steps:**
1. Buka form di browser
2. Tekan **F12** untuk buka Developer Tools
3. Klik tab **"Console"**
4. Lihat log messages:
   ```
   Form siap. Script ID: AKfycbx4hyXnLCqac4oJAim0mqgD73zDjdv18UE7_TbpHbcu2fRpBjOHYPYhkAt3qHqYq-ny
   Testing koneksi ke: https://script.google.com/macros/d/AKfycbx4hyXnLCqac4oJAim0mqgD73zDjdv18UE7_TbpHbcu2fRpBjOHYPYhkAt3qHqYq-ny/usercall
   ```

5. Isi form dengan data minimal:
   - Provinsi: test
   - Kabupaten: test
   - Kecamatan: test
   - Desa: test
   - Nama Usaha: test
   - Alamat: test
   - Nama Pengusaha: test
   - Nomor HP: 08123456789
   - Kegiatan Utama: test
   - Klasifikasi: Industri Mikro
   - Jumlah Pekerja: 1
   - Blok 4: Nama: test, Jabatan: test, HP: 08123456789, Tanggal: hari ini

6. Klik "Kirim Data Survei"
7. **Lihat Console** untuk melihat error atau messages:
   - Jika muncul error, catat error message-nya
   - Jika tidak ada error tapi loading tidak selesai, lanjut ke step 4

---

### 4️⃣ Test Google Apps Script Direct

Cara untuk test jika Google Apps Script berfungsi:

1. Buka Google Apps Script editor
2. Klik "Run" → pilih function `doPost`
3. Lihat "Execution log" di bawah
4. Jika ada error, catat errornya

❌ **Error umum:**
```
Cannot read properties of null (reading 'getSheetByName')
```
**Solusi:** SHEET_ID belum benar atau sheet tidak ada

```
Cannot read properties of undefined (reading 'appendRow')
```
**Solusi:** Sheet tidak ada atau name-nya bukan "Data Survei"

---

### 5️⃣ Verifikasi Hak Akses Google Sheet

1. Buka Google Sheet
2. Klik "Share" (kanan atas)
3. Pastikan "Anyone with the link" bisa akses
4. Pastikan role adalah "Editor" atau minimal "Commenter"

❌ **Masalah:** Sheet private atau hanya "Viewer" tidak bisa write

---

### 6️⃣ Test Dengan Data Minimal

Jika belum berhasil, coba test dengan data super minimal:

```
BLOK 1:
- Provinsi: A
- Kabupaten: B
- Kecamatan: C
- Desa: D
- Nama Usaha: E
- Alamat: F
- Nama Pengusaha: G
- Nomor HP: 081

BLOK 2:
- Jumlah Pekerja: 1

BLOK 3:
- (kosongkan)

BLOK 4:
- Nama: H
- Jabatan: I
- HP: 081
- Tanggal: (hari ini)
```

Submit dan cek Google Sheet.

---

## 📋 DEBUGGING CHECKLIST

### Sebelum Debug:
- [ ] Browser sudah hardrefresh (Ctrl+F5)
- [ ] Sheet "Data Survei" ada
- [ ] Google Apps Script deployment aktif dengan "Anyone"

### Saat Debug:
- [ ] Buka Console (F12)
- [ ] Isi data minimal (jangan skip required fields)
- [ ] Perhatikan message di Console
- [ ] Cek Google Sheet terus-menerus

### Jika Masih Error:
- [ ] Copy paste error message dari console
- [ ] Check Google Apps Script logs: View > Logs
- [ ] Cek URL struktur sudah benar
- [ ] Try menggunakan browser incognito (fresh cache)

---

## 🎯 SOLUTION STEPS (Urutan Rekomendasi)

### **Jika data masih tidak masuk:**

**Step 1: Re-Deploy Google Apps Script**
```
1. Buka Google Apps Script editor
2. Cek SHEET_ID sudah diganti dengan benar
3. Cek sheet "Data Survei" ada
4. Klik "Deploy" > "Manage deployments"
5. Hapus deployment lama
6. Klik "New deployment"
7. Type: "Web app"
8. Execute as: (your email)
9. Who has access: "Anyone" ✅
10. Deploy
11. Copy Script ID baru
12. Update di index.html
13. Refresh browser (F12)
14. Test kirim data lagi
```

**Step 2: Cek Format Data**
```
Console harus menunjukkan:
- Form siap. Script ID: ...
- Testing koneksi ke: ...
- Tidak ada error saat submit
```

**Step 3: Manual Test di Google Apps Script**
```
1. Tools > Script editor
2. Run > doPost
3. Check Execution log untuk error
4. Jika ada error, fix lalu re-deploy
```

---

## 💡 TIPS KALO MASIH STUCK

1. **Coba dengan contoh Sheet ID yang sudah ada:**
   - Jika Anda bingung mana Sheet ID, lihat URL sheet Anda
   - Format: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
   - Bagian panjang di tengah itu Sheet ID

2. **Jangan gunakan special characters di field:**
   - Hindari emoji, <, >, &, dll di field text
   - Gunakan text biasa saja

3. **Pastikan internet connection stabil:**
   - Test ulang dengan koneksi WiFi/data yang berbeda
   - Cek tidak ada VPN yang block

4. **Coba di browser lain:**
   - Chrome, Firefox, Safari, Edge
   - Ada kemungkinan issue browser spesifik

5. **Coba di Incognito/Private Mode:**
   - Menghilangkan cache/cookies yang mungkin interfere

---

## 📞 DEBUGGING INFO

**Info yang perlu dikumpulkan jika butuh bantuan:**
- Error message dari console (screenshot F12)
- Screenshot URL browser saat membuka form
- Confirmation bahwa Google Sheet sudah dibuat
- Confirmation bahwa Google Apps Script sudah di-deploy

---

## ✅ CARA TAU BERHASIL

Data berhasil masuk ke Google Sheets jika:
1. ✅ Form muncul pesan "✓ Data berhasil dikirim ke Google Sheets!"
2. ✅ Loading hilang dalam 2-3 detik
3. ✅ Buka Google Sheet → refresh (F5)
4. ✅ Ada baris baru dengan data Anda

---

Jika masih belum bisa setelah ikuti semua steps, kirim screenshotnya dan error message dari console!
