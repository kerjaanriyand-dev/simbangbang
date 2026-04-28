# 🔐 Login Feature Documentation

## Overview
Form sekarang memiliki sistem login sederhana dengan **5 akun hardcoded**. Setiap submission akan dicatat siapa yang submit (surveyor username).

## Akun Login (5 Accounts)

| Username | Password | Status |
|----------|----------|--------|
| surveyor1 | pass123 | ✅ Active |
| surveyor2 | pass123 | ✅ Active |
| surveyor3 | pass123 | ✅ Active |
| surveyor4 | pass123 | ✅ Active |
| surveyor5 | pass123 | ✅ Active |

## Cara Menggunakan

### 1. Load Form di Browser
- Buka `INDEX.HTML`
- Sebelum form muncul, akan ada **Login Modal**
- Form hanya bisa diakses setelah login sukses

### 2. Login
1. Pilih salah satu dari 5 akun di atas
2. Masukkan username (contoh: `surveyor1`)
3. Masukkan password (contoh: `pass123`)
4. Klik tombol **Login**
5. Jika sukses: Form akan muncul, nama Anda tampil di **top-right corner**

### 3. Isi Form & Submit
- Isi semua field form seperti biasa
- Saat submit, username Anda otomatis tersimpan
- Google Sheet akan punya column "Surveyor" dengan nama user yang submit

### 4. Logout
- Klik tombol **Logout** di top-right corner
- Login modal akan muncul lagi
- Bisa login dengan akun lain

## Data di Google Sheet

Setiap submission sekarang punya **2 kolom baru di awal**:
1. **Timestamp** - Waktu submit
2. **Surveyor** - Username orang yang submit (surveyor1, surveyor2, dll)

Contoh data:
```
Timestamp              | Surveyor   | Provinsi | Kabupaten | ...
27-Apr-2026 14:30:00  | surveyor1  | Jawa Tim | Sidoarjo  | ...
27-Apr-2026 14:35:15  | surveyor2  | Jawa Tim | Gresik    | ...
```

## Fitur

✅ **Login Modal** - Muncul saat halaman dibuka
✅ **Session Management** - Tetap login selama browser tab terbuka
✅ **User Display** - Nama user tampil di top-right
✅ **Logout Button** - Bisa ganti akun
✅ **Auto-Submit** - Username otomatis ditambah saat kirim form

## Technical Details

### Frontend (INDEX.HTML)
- **Accounts hardcoded**: Object JavaScript dengan 5 username/password
- **Session storage**: Menggunakan `sessionStorage` (not persistent after close tab)
- **Login modal**: Overlay modal menampilkan form login
- **Demo credentials**: Ditampilkan di modal untuk user reference

### Backend (Google Apps Script)
- **New column**: "Surveyor" ditambah di position 2 (setelah Timestamp)
- **Auto-capture**: Data field `surveyor` dari form otomatis disimpan
- **Tracking**: Setiap submission bisa ditrack siapa yang input

## Customization

### Ubah Password Semua Akun
Edit di INDEX.HTML, cari:
```javascript
const ACCOUNTS = {
    'surveyor1': 'pass123',  // ← Ubah 'pass123' ke password baru
    'surveyor2': 'pass123',
    'surveyor3': 'pass123',
    'surveyor4': 'pass123',
    'surveyor5': 'pass123'
};
```

Contoh ubah semua jadi 'survei2026':
```javascript
const ACCOUNTS = {
    'surveyor1': 'survei2026',
    'surveyor2': 'survei2026',
    'surveyor3': 'survei2026',
    'surveyor4': 'survei2026',
    'surveyor5': 'survei2026'
};
```

### Tambah/Ubah Username
Edit object ACCOUNTS, contoh tambah surveyor6:
```javascript
const ACCOUNTS = {
    'surveyor1': 'pass123',
    'surveyor2': 'pass123',
    'surveyor3': 'pass123',
    'surveyor4': 'pass123',
    'surveyor5': 'pass123',
    'surveyor6': 'pass123'  // ← Tambahan
};
```

Juga update list demo di login modal (cari `<div class="login-info">`).

## Security Notes

⚠️ **Important**: Ini hanya untuk demo/internal use. Karena:
- Passwords hardcoded di JavaScript (bisa dilihat di browser)
- Tidak ada backend authentication
- Session hanya di browser, tidak encrypted

Untuk production/public, gunakan:
- Backend authentication proper (OAuth, JWT)
- Database untuk user management
- Password hashing
- HTTPS

## Troubleshooting

### ❌ Lupa Password
- Semua akun pakai password: `pass123`
- Tidak ada password reset, reset manual di JavaScript code

### ❌ Tidak bisa login
1. Pastikan username benar (case-sensitive): `surveyor1` (bukan `Surveyor1`)
2. Pastikan password benar: `pass123`
3. Cek browser console (F12) untuk error messages

### ❌ Session hilang
- Jika tutup tab → session hilang
- Harus login lagi
- Ini normal untuk sessionStorage (bukan persistent)

Kalau mau persistent login (remember me):
- Ganti `sessionStorage` jadi `localStorage`
- Tapi less secure (password data tersimpan di browser)

### ❌ Username tidak muncul di Surveyor column
- Cek Google Apps Script sudah updated dengan "Surveyor" column
- Verify row data construction di Google Apps Script include `data.surveyor`
- Check Google Sheet headers include "Surveyor"

## Next Steps

1. ✅ Test login dengan semua 5 akun
2. ✅ Submit form dengan surveyor username
3. ✅ Verify di Google Sheet column "Surveyor" terisi
4. ✅ Ubah password kalau diperlukan
5. ✅ Ready untuk production

---

**Status**: Login feature fully integrated. Ready untuk testing! 🚀
