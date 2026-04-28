# ☁️ Cloudinary Integration - Photo Upload Feature

## Status
✅ **Cloudinary integration COMPLETE**
- Photo upload dari client langsung ke Cloudinary (tidak via Google Apps Script)
- URL Cloudinary disimpan ke Google Sheet
- File size limit: 5MB per foto (lebih besar dari sebelumnya)

## Cara Kerja

### Flow Upload Foto:
```
User pilih foto di form
        ↓
Form submit button diklik
        ↓
uploadFilesToCloudinary() function berjalan
        ↓
Setiap foto di-upload langsung ke Cloudinary (parallel)
        ↓
Cloudinary return URL untuk setiap foto
        ↓
URL disimpan di data object (produk_foto_url_1, produk_foto_url_2, dll)
        ↓
Semua data + foto URLs dikirim ke Google Apps Script
        ↓
Google Apps Script simpan ke Sheet + foto URLs di column "Link Foto Produk (Cloudinary)"
```

### Advantages dibanding sebelumnya:
- ✅ **File size besar**: 5MB per foto (sebelumnya 60KB)
- ✅ **Lebih cepat**: Upload langsung ke Cloudinary (cloud), tidak via Sheet
- ✅ **Reliable**: Cloudinary service proven untuk photo storage
- ✅ **Accessible**: Foto bisa diakses via URL di manapun
- ✅ **No quota limit**: Google Sheet quota tidak terpakai untuk file storage

## Setup Credentials

Di INDEX.HTML, sudah ter-set:
```javascript
const CLOUDINARY_CLOUD_NAME = 'deufhpuzx';
const CLOUDINARY_UPLOAD_PRESET = 'survey_form';
```

✅ Sudah benar, tidak perlu ubah.

## Testing

### Step 1: Test Upload Foto
1. Buka form di browser
2. Login dengan akun (ex: surveyor1 / pass123)
3. Isi form + pilih foto (JPG/PNG, <5MB)
4. Klik **Kirim Data Survei**
5. Lihat browser console (F12):
   ```
   ⏳ Uploading photo 1: image.jpg (450KB)...
   ✓ Foto 1 uploaded: https://res.cloudinary.com/deufhpuzx/...
   ✓ Request sent
   ```

### Step 2: Check Google Sheet
1. Buka Google Sheet Anda
2. Sheet "Data Survei"
3. Column "Link Foto Produk (Cloudinary)"
4. Seharusnya ada link Cloudinary:
   ```
   https://res.cloudinary.com/deufhpuzx/image/upload/v.../filename.jpg
   ```

### Step 3: Verify Foto
- Klik link di Sheet
- Seharusnya buka preview foto di Cloudinary
- Confirm foto ter-upload dengan benar

## Troubleshooting

### ❌ Foto tidak upload ke Cloudinary
**Kemungkinan:**
1. Upload Preset belum di-enable di Cloudinary
   - Solusi: Buka Cloudinary Dashboard → Settings → Upload → Unsigned uploads → Enable
   
2. Nama Upload Preset salah
   - Check di INDEX.HTML: `CLOUDINARY_UPLOAD_PRESET = 'survey_form'`
   - Verify di Cloudinary: Nama preset harus sama persis
   
3. Cloud Name salah
   - Check di INDEX.HTML: `CLOUDINARY_CLOUD_NAME = 'deufhpuzx'`
   - Verify di Cloudinary Dashboard

4. Browser console show error
   - F12 → Console → lihat error messages
   - Screenshot error dan report

### ❌ Foto > 5MB
- Console show: `❌ Foto ... terlalu besar (6.2MB). Max 5MB.`
- Solusi: Compress foto dulu (https://tinypng.com)

### ❌ Foto ter-upload ke Cloudinary tapi tidak di Sheet
- Check Google Apps Script logs:
  1. Buka Google Apps Script
  2. Klik Logs (bawah)
  3. Lihat "Foto 1 Cloudinary link: ..."
  4. Jika tidak ada, berarti data tidak sampai ke script
  
- Solusi:
  1. Verify Google Apps Script sudah ter-deploy (HEAD version)
  2. Verify SCRIPT_ID di INDEX.HTML benar
  3. Cek network tab di DevTools (F12 → Network)

### ❌ Column "Link Foto Produk (Cloudinary)" kosong
- Kemungkinan column belum ada di Sheet
- Solusi: Manual add column dengan nama persis: "Link Foto Produk (Cloudinary)"
- Atau submit form baru, sheet akan auto-create column

## Limits & Quotas

### Cloudinary Free Plan
- **Storage**: 25GB (plenty untuk testing)
- **Bandwidth**: 25GB/month
- **Transformations**: Unlimited
- **Upload API calls**: 25/hour (recommended untuk testing)

### Google Sheet
- **Rows**: 10 million per sheet (tidak masalah)
- **Columns**: Unlimited
- **Cell content**: 50,000 characters per cell (URL Cloudinary hanya ~100 chars)

## Security Notes

⚠️ **Important**: Upload Preset unsigned aman untuk:
- Public website (form umum)
- Non-sensitive data (foto produk OK)

Untuk production/sensitive data:
- Use signed uploads (require backend)
- Implement folder management di Cloudinary
- Set upload restrictions (file type, size, dll)

## Next Steps

1. ✅ Test foto upload dengan 2-3 foto berbeda
2. ✅ Verify foto muncul di Cloudinary
3. ✅ Verify URL tersimpan di Sheet
4. ✅ Klik URL → confirm foto accessible
5. ✅ Ready untuk production!

## Reference Links

- Cloudinary Dashboard: https://cloudinary.com/console
- Upload Widget Docs: https://cloudinary.com/documentation/upload_widget
- API Reference: https://cloudinary.com/documentation/image_upload_api_reference

---

**Status**: Cloudinary integration ready for testing! 🚀
