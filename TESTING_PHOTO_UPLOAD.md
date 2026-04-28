# 📸 Testing Photo Upload Feature

## Tujuan
Verify bahwa foto produk sekarang bisa di-upload dan di-simpan ke Google Sheet dengan benar.

## Yang Telah Diubah (27 April 2026)
1. **Form (INDEX.HTML)**:
   - Mengconvert file ke base64 sebelum dikirim
   - Limit size: Max 60KB per file
   - Automatic error jika foto > 60KB

2. **Data Transmission** (UPDATED):
   - ✨ CHANGED: Menggunakan **POST + JSON body** (lebih reliable dari GET)
   - File data dikirim sebagai JSON nested: `{filename, mimeType, size, data}`
   - Field name untuk file: `produk_foto_base64_1`, `produk_foto_base64_2`, dll
   - Header: `Content-Type: application/json`

3. **Google Apps Script** (UPDATED):
   - Optimized untuk parse POST JSON body
   - Auto-detect file fields (produk_foto_base64_*)
   - Decode base64 dan upload ke Google Drive
   - Simpan link ke Sheet di column "Link Foto Produk"

## Cara Test

### Step 1: Siapkan Foto Test
- Gunakan foto kecil (10-40KB)
  - Ukuran image: 300x300 - 600x600 pixel OK
  - Format: JPG, PNG, WebP
- Jika foto terlalu besar:
  - Compress di: https://tinypng.com/ atau https://imagecompressor.com/
  - Target: < 60KB

### Step 2: Isi Form
1. Buka form di browser
2. Isi **Blok 1** (info usaha) - minimal: Nama Usaha, Lokasi
3. Isi **Blok 2** (produk):
   - Nama Produk: isi (ex: "Kemeja Batik")
   - Spesifikasi: isi (ex: "100% Katun")
   - Satuan: isi (ex: "Pcs")
   - Harga: isi (ex: "150000")
   - **FOTO**: Pilih file foto produk <60KB
4. Isi **Blok 3 & 4** (minimal):
   - Catatan: isi atau kosong
   - Nama Pemberi Jawaban: isi
5. Klik **Kirim Form**

### Step 3: Monitor Console (Developer Tools)
1. Buka Developer Tools: **F12** atau Ctrl+Shift+I
2. Tab **Console**
3. Lihat messages:
   ```
   ✓ Foto processed: image.jpg (45.2KB → 60.3KB base64)
   === SENDING DATA ===
   URL length: 12345 chars
   ✓ File field: produk_foto_base64_1 → image.jpg (45234 bytes)
   ✓ Request sent
   ```

### Step 4: Cek Google Sheet
1. Buka Google Sheet Anda
2. Lihat sheet "Data Survei" (atau nama yang Anda gunakan)
3. Kolom terakhir: **"Link Foto Produk"**
   - Jika upload sukses: Akan ada link seperti `https://drive.google.com/file/d/...`
   - Jika belum terisi: Ada masalah di sisi server

### Step 5: Verifikasi Link
- Klik link di sheet
- Seharusnya buka Google Drive file
- Bisa lihat preview foto atau download

## Troubleshooting

### ❌ Foto tidak muncul di "Link Foto Produk"
**Kemungkinan penyebab & solusi:**

1. **Foto > 60KB**
   - Console akan show error: `❌ Foto terlalu besar`
   - Solusi: Compress foto dulu

2. **File bukan image**
   - Accept="image/*" seharusnya block, tapi bisa ada edge case
   - Solusi: Pastikan file adalah JPG/PNG/WebP

3. **Base64 conversion error**
   - Console show: `❌ Gagal process foto: ...`
   - Solusi: Try foto format berbeda (JPG vs PNG)

4. **URL terlalu panjang (>8000 chars)**
   - Console show: `⚠️ URL sangat panjang`
   - Solusi: Kurangi jumlah produk atau kompres foto lebih kecil

5. **Google Drive folder tidak accessible**
   - Script log show: `Error accessing folder Drive`
   - Solusi: Check DRIVE_FOLDER_ID di Google Apps Script
   - Pastikan script punya akses ke folder tersebut

6. **Google Sheet SHEET_ID belum diset**
   - Script log show: `SHEET_ID belum diganti`
   - Solusi: Check Google Apps Script file, ganti SHEET_ID dengan ID sheet Anda

### ❌ Form "Request sent successfully" tapi sheet kosong
- Data text fields mungkin OK tapi file tidak di-handle
- Check Google Apps Script Logs:
  1. Buka Google Apps Script
  2. Klik Logs (bawah)
  3. Lihat messages debug
  4. Cari error terkait file upload

### ❌ Browser console show error
```javascript
// Jika ada error:
fetch() error: ...
```
- Kemungkinan: Google Apps Script endpoint tidak accessible
- Solusi:
  1. Verify SCRIPT_ID di INDEX.HTML benar
  2. Deploy Google Apps Script ulang
  3. Pastikan deployment adalah "HEAD" (latest version)

## Debug Checklist

| Item | Status | Action |
|------|--------|--------|
| Foto size < 60KB | ☐ | Use online compressor jika perlu |
| Form field "Foto" terisi | ☐ | Refresh form jika tidak bisa click |
| Console show "Foto processed" | ☐ | Check browser console (F12) |
| URL length < 8000 chars | ☐ | If > 8000, compress foto more |
| Sheet punya column "Link Foto Produk" | ☐ | Manual add jika belum ada |
| SHEET_ID di Google Apps Script sudah correct | ☐ | Copy dari sheet URL |
| DRIVE_FOLDER_ID accessible | ☐ | Check folder permission di Google Drive |

## Next Steps (Jika Testing Sukses)

1. ✅ Kumpulkan 2-3 test submissions dengan foto
2. ✅ Verify semua foto ada di Google Drive folder
3. ✅ Verify semua links ada di Sheet
4. ✅ Ready untuk production / deploy ke Vercel

---

**Contact**: Jika ada error yang persist, screenshot console log & sheet, then report issue dengan details.
