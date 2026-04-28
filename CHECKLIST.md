# ✅ Setup Checklist - Form Survei Pendataan Usaha/Industri

## Fase 1: Google Sheets & Google Apps Script

### Langkah 1 - Buat Google Sheet
- [ ] Buka https://sheets.google.com
- [ ] Klik "Create" → "+ Spreadsheet"
- [ ] Beri nama: "Survei Pendataan Usaha"
- [ ] Ubah tab sheet menjadi "Data Survei"
- [ ] Salin **Sheet ID** dari URL: `...spreadsheets/d/**SHEET_ID**/edit`

### Langkah 2 - Setup Google Apps Script
- [ ] Buka Google Sheet
- [ ] Klik Tools → Script editor
- [ ] Hapus kode default
- [ ] Copy paste kode dari `GOOGLE_APPS_SCRIPT.gs`
- [ ] Ganti `YOUR_GOOGLE_SHEET_ID` dengan Sheet ID Anda
- [ ] Save (Ctrl+S)

### Langkah 3 - Deploy Google Apps Script
- [ ] Klik "Deploy" → "New deployment"
- [ ] Type: "Web app"
- [ ] Execute as: (your account)
- [ ] Who has access: "Anyone"
- [ ] Klik "Deploy"
- [ ] Salin **Script ID** dari URL: `...d/**SCRIPT_ID**/usercall`
- [ ] Klik "Close"

---

## Fase 2: Update Form HTML

### Langkah 4 - Update index.html
- [ ] Buka file `index.html` di text editor
- [ ] Cari baris: `const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/...`
- [ ] Ganti `YOUR_SCRIPT_ID` dengan Script ID dari langkah 3
- [ ] Save file

---

## Fase 3: Testing Lokal

### Langkah 5 - Test Form Lokal
- [ ] Buka file `index.html` di browser
- [ ] **BLOK 1 - Keterangan Usaha:**
  - [ ] Isi Provinsi, Kabupaten, Kecamatan, Desa
  - [ ] Isi Nama Usaha dan Alamat
  - [ ] Klik "Ambil Lokasi dari GPS" (atau biarkan kosong)
  - [ ] Isi Nama Pengusaha dan Nomor HP
  - [ ] Isi Kegiatan Utama
  - [ ] Pilih Klasifikasi Industri
- [ ] **BLOK 2 - Produksi dan Pekerja:**
  - [ ] Klik "Tambah Produk"
  - [ ] Isi nama produk, spesifikasi, satuan, harga
  - [ ] Isi Jumlah Pekerja Total
  - [ ] Isi breakdown pekerja (tetap, tidak tetap, keluarga)
  - [ ] Isi pendidikan pekerja
  - [ ] Isi jenis kelamin pekerja
- [ ] **BLOK 3 - Catatan:**
  - [ ] Isi catatan (optional)
- [ ] **BLOK 4 - Pemberi Jawaban:**
  - [ ] Isi Nama Pemberi Jawaban
  - [ ] Isi Jabatan
  - [ ] Isi Nomor HP
  - [ ] Pilih Tanggal Kunjungan
- [ ] Klik "Kirim Data Survei"
- [ ] Harus muncul pesan "✓ Data berhasil dikirim ke Google Sheets!"
- [ ] Buka Google Sheet dan cek data masuk

**Jika error:**
- [ ] Buka Developer Console (F12)
- [ ] Lihat tab "Console" untuk error message
- [ ] Cross check Script ID di index.html
- [ ] Pastikan Google Apps Script sudah di-deploy
- [ ] Cek bahwa sheet bernama "Data Survei" ada

---

## Fase 4: Deploy ke Vercel

### Opsi A: Via GitHub (Recommended)

1. **Setup Git & GitHub**
   - [ ] Install Git dari https://git-scm.com/download
   - [ ] Buka cmd/terminal di folder project
   - [ ] Run:
     ```bash
     git init
     git add .
     git commit -m "Initial commit - Form Survei Pendataan Usaha"
     ```

2. **Buat GitHub Repo**
   - [ ] Buka https://github.com/new
   - [ ] Repo name: `form-survei-usaha`
   - [ ] Description: "Form survei pendataan usaha/industri"
   - [ ] Klik "Create repository"
   - [ ] Copy perintah "...or push an existing repository..."
   - [ ] Paste & jalankan di terminal

3. **Deploy di Vercel**
   - [ ] Buka https://vercel.com
   - [ ] Login/signup dengan GitHub
   - [ ] Klik "Add New..." → "Project"
   - [ ] Pilih repository Anda
   - [ ] Framework: "Other" atau "Static Site"
   - [ ] Klik "Deploy"
   - [ ] Tunggu sampai selesai (biasanya 1-2 menit)
   - [ ] Salin URL dari Vercel dashboard
   - [ ] **Done!** Form Anda sekarang online

### Opsi B: Upload Langsung (Tanpa GitHub)

1. **Install Vercel CLI**
   - [ ] Buka cmd/terminal
   - [ ] Run: `npm install -g vercel`

2. **Deploy**
   - [ ] Buka cmd/terminal di folder project
   - [ ] Run: `vercel`
   - [ ] Login ke Vercel
   - [ ] Follow prompts
   - [ ] Tunggu selesai
   - [ ] Copy URL

---

## Fase 5: Final Testing Online

### Langkah 6 - Test Form Online
- [ ] Buka URL dari Vercel
- [ ] Isi semua 4 blok dengan data valid
- [ ] Klik "Kirim Data Survei"
- [ ] Harus muncul pesan success
- [ ] Cek Google Sheet, data harus masuk
- [ ] Try submit multiple entries
- [ ] Test di mobile browser

---

## Fase 6: Share & Monitor

### Langkah 7 - Share Form
- [ ] Copy URL form dari Vercel
- [ ] Share ke users melalui:
  - [ ] WhatsApp
  - [ ] Email
  - [ ] Website
  - [ ] QR Code (pakai https://qr-code-generator.com)

### Langkah 8 - Monitor Data
- [ ] Buka Google Sheet regularly
- [ ] Check data masuk dengan benar
- [ ] Verify semua field terisi
- [ ] Export data if needed (Download as CSV/Excel)
- [ ] Monitor untuk error patterns

---

## Customization (Optional)

- [ ] Ubah warna form (lihat CSS di index.html)
- [ ] Tambah/ubah field (update di index.html dan Google Apps Script)
- [ ] Ubah klasifikasi industri options
- [ ] Tambah logo/branding
- [ ] Ubah submit button text
- [ ] Adjust produk fields sesuai kebutuhan

---

## Troubleshooting Checklist

### Data tidak masuk ke Google Sheets
- [ ] Cek Script ID di index.html benar
- [ ] Cek SHEET_ID di Google Apps Script benar
- [ ] Cek sheet bernama "Data Survei" ada
- [ ] Cek console (F12) untuk error
- [ ] Deploy ulang Google Apps Script

### Form error saat submit
- [ ] Buka F12 → Console
- [ ] Lihat error message
- [ ] Cek internet connection
- [ ] Refresh browser
- [ ] Clear browser cache

### GPS tidak berfungsi
- [ ] Pastikan browser mengijinkan akses lokasi
- [ ] Cek form di HTTPS (atau localhost)
- [ ] Cek device ada GPS/internet

### Form link tidak bisa diakses
- [ ] Cek Vercel deployment bersifat public
- [ ] Cek URL Vercel benar
- [ ] Test di browser lain/device lain
- [ ] Tunggu beberapa menit setelah deploy

---

## Support Resources

- **Docs**: Baca SETUP_GUIDE.md untuk detail
- **README**: Lihat README.md untuk overview
- **Error Logs**: Check Google Apps Script logs (View > Logs)
- **Vercel Logs**: Check di Vercel Dashboard > Deployments

---

## Important Notes

⚠️ **Jangan lupa:**
- Sheet ID dan Script ID harus benar
- Google Apps Script harus di-deploy sebelum test
- Form bersifat public (semua orang bisa akses)
- Hindari data sensitif
- Backup Google Sheet secara berkala
- Test di mobile device untuk UX check

✅ **Selamat! Jika semua checklist selesai, form survei Anda sudah ready to use!**

Untuk questions: Lihat SETUP_GUIDE.md atau troubleshooting section di README.md
