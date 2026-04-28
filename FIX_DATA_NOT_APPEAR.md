# 🔧 FIX: Data Terkirim Tapi Tidak Muncul di Google Sheet

**Masalah yang dialami:**
- Form menampilkan "✓ Data berhasil dikirim..." ✓ GOOD!
- Tapi data tidak ada di Google Sheet ✗ BAD!
- URL Script format berbeda: `/s/` dan `/exec` (bukan `/d/` dan `/usercall`)

**Alasan:** Ada 2 format deployment Google Apps Script:
1. **Format Lama:** `/d/{id}/usercall` 
2. **Format Baru:** `/s/{id}/exec` ← Ini yang Anda punya

---

## ✅ SUDAH DIPERBAIKI DI index.html

Saya sudah update index.html untuk menggunakan format yang benar:

```javascript
// Lama (tidak bekerja):
const GOOGLE_APPS_SCRIPT_URL = `https://script.google.com/macros/d/${SCRIPT_ID}/usercall`;

// Baru (sudah diperbaiki):
const GOOGLE_APPS_SCRIPT_URL = `https://script.google.com/macros/s/${SCRIPT_ID}/exec`;
```

---

## 🔍 SEKARANG HARUS CEK: Google Apps Script Configuration

Meski URL sudah benar, data masih bisa tidak masuk karena masalah di Google Apps Script. 

### CHECK 1: SHEET_ID di Google Apps Script

**Ini adalah penyebab PALING UMUM data tidak masuk:**

```
1. Buka Google Sheet
2. Tools → Script editor
3. Find: const SHEET_ID = '
4. Lihat apakah masih: const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
   
JIKA MASIH 'YOUR_GOOGLE_SHEET_ID' (BELUM DIGANTI):
→ GET Sheet ID dari URL sheet:
   https://docs.google.com/spreadsheets/d/SHEET_ID_DISINI/edit
   Copy bagian panjang di tengah
   
→ GANTI di Google Apps Script:
   const SHEET_ID = 'PASTE_ID_ANDA_DISINI';
   
→ Save (Ctrl+S)
```

**DOUBLE CHECK:** Sheet ID harus 25-50 karakter panjang dan ada huruf/angka/dash

### CHECK 2: Sheet Name

**Nama sheet HARUS persis "Data Survei":**

```
1. Buka Google Sheet
2. Lihat tab di bawah (default: "Sheet1")
3. Ada tab bernama "Data Survei"?

JIKA TIDAK ADA:
→ Klik + untuk tambah sheet baru
→ Beri nama: Data Survei (case sensitive!)
→ OK
```

### ✅ CHECK 3: Sudah Diperbaiki - doGet & doPost Handler

**Masalah yang ditemukan:**
- `doPost()` mencoba parse `JSON.parse(e.parameter.data)` ← SALAH untuk GET request!
- GET request: data ada di `e.parameter` (bukan JSON, langsung URLSearchParams)
- POST request: data ada di `e.postData.contents` (perlu JSON.parse)

**Solusi yang sudah diaplikasi:**
```javascript
// Function helper yang handle GET & POST
function handleRequest(e) {
  let data = {};
  
  // GET request → parameter langsung
  if (e.parameter && Object.keys(e.parameter).length > 0) {
    data = e.parameter;
  }
  // POST request → parse JSON dari body
  else if (e.postData && e.postData.contents) {
    data = JSON.parse(e.postData.contents);
  }
  // Process data...
}

// Wrapper functions
function doPost(e) {
  return handleRequest(e);  // Handle POST requests
}

function doGet(e) {
  // Jika ada parameter → process data
  if (e.parameter && Object.keys(e.parameter).length > 0) {
    return handleRequest(e);  // Handle GET requests
  }
  // Jika tidak ada parameter → tampilkan status page
  else {
    return showStatusPage();  // Testing/status page
  }
}
```

**✅ SUDAH DIPERBAIKI - Tidak perlu action!**

---

## 🚀 LANGKAH-LANGKAH FIX LENGKAP

### Step 1: Verifikasi SHEET_ID (5 menit)

**Di Google Apps Script:**
```
1. Buka Google Sheet
2. URL bar: https://docs.google.com/spreadsheets/d/SHEET_ID_DISINI/edit
3. Copy ID panjang itu (jangan copy /edit)
4. Tools → Script editor
5. Find: const SHEET_ID = '
6. Ganti dengan ID yang sudah dicopy
7. Save (Ctrl+S)

Format yang benar:
const SHEET_ID = '1a2b3c4d-e5f6-g7h8-i9j0-k1l2m3n4o5p6';
(tanpa YOUR_GOOGLE_SHEET_ID)
```

### Step 2: Verifikasi Sheet Name (2 menit)

**Di Google Sheet:**
```
1. Lihat tab di bawah
2. Ada "Data Survei"?
3. Jika belum ada → buat baru:
   - Klik +
   - Rename ke "Data Survei"
   
Pastikan:
- Besar kecil sesuai: Data Survei (D kapital, S kapital)
- Tidak "data survei", tidak "DataSurvei"
- Persis "Data Survei"
```

### Step 3: Deploy Ulang Google Apps Script (3 menit)

**Setelah update SHEET_ID:**
```
1. Tools → Script editor
2. Deploy → Manage deployments
3. Hapus deployment lama (klik X)
4. Deploy → New deployment
5. Type: Web app
6. Execute as: (your account)
7. Who has access: Anyone
8. Deploy
```

### Step 4: Update index.html Jika Script ID Berubah (1 menit)

**Jika deploy menghasilkan Script ID baru:**
```
1. Buka index.html
2. Find: const SCRIPT_ID = '
3. Copy Script ID dari deployment popup
4. Ganti di index.html
5. Save
6. Hardrefresh browser (Ctrl+F5)
```

### Step 5: Test Lagi (3 menit)

```
1. Refresh form (F5)
2. Open Console (F12)
3. Isi form dengan data minimal:
   - Provinsi: A
   - Kabupaten: B
   - Kecamatan: C
   - Desa: D
   - Nama Usaha: E
   - Alamat: F
   - Nama Pengusaha: G
   - Nomor HP: 081
   - Kegiatan Utama: test
   - Klasifikasi: Industri Mikro
   
   - Jumlah Pekerja: 1
   
   - Nama: H
   - Jabatan: I
   - HP: 081
   - Tanggal: hari ini

4. Submit
5. Tunggu 2-3 detik
6. Buka Google Sheet & Refresh (F5)
7. Cek apakah data ada → JIka ADA = BERHASIL! ✓
```

---

## 📋 CHECKLIST DEBUGGING

**Sebelum test final:**

- [ ] SHEET_ID di Google Apps Script sudah diganti (bukan YOUR_GOOGLE_SHEET_ID)
- [ ] Sheet "Data Survei" ada di Google Sheet
- [ ] Google Apps Script sudah di-deploy dengan "Anyone"
- [ ] Script ID di index.html sudah updated (jika ada deployment baru)
- [ ] Browser sudah hardrefresh (Ctrl+F5)
- [ ] Console menunjukkan "Form siap" message

**Saat test:**

- [ ] Form bisa submit tanpa error
- [ ] Notifikasi hijau muncul
- [ ] Loading hilang dalam 2-3 detik
- [ ] Data muncul di Google Sheet setelah refresh

---

## 🎯 SUMMARY

| Komponen | Status | Action |
|----------|--------|--------|
| URL Format | ✅ Fixed | Sudah update ke `/s/` dan `/exec` |
| index.html | ✅ Updated | Sudah updated ke GET request |
| doGet/doPost Handler | ✅ FIXED | Sudah handle GET & POST dengan benar |
| SHEET_ID | ⚠️ Perlu cek | Verify dan ganti jika masih 'YOUR_...' |
| Sheet Name | ⚠️ Perlu cek | Verify bernama "Data Survei" |
| Deployment | ⚠️ Perlu redeploy | Deploy ulang setelah fix SHEET_ID |

---

## ✨ JIKA MASIH TIDAK BERHASIL

1. **Cek Google Apps Script Logs:**
   ```
   Tools → Script editor → View > Logs
   Ada error message? Screenshot dan catat
   ```

2. **Test dengan doPost function:**
   ```
   Run → pilih doPost
   Lihat execution log
   Ada error? Fix dan re-deploy
   ```

3. **Baca error message di Console:**
   ```
   F12 → Console tab
   Ada error? Catat dan cari solusinya
   ```

---

## 📞 NEXT STEPS

Setelah berhasil:
1. Test dengan data real di semua blok
2. Deploy ke Vercel (lihat SETUP_GUIDE.md)
3. Share URL dengan users
4. Monitor Google Sheet untuk data masuk

---

**Semoga berhasil! Lapor kalau sudah berhasil atau masih ada error! 🎉**
