# 🎨 Panduan Menambahkan Logo/Gambar di Judul Survei

## Status Saat Ini
Form sudah siap untuk menampilkan 2 logo di kiri dan kanan judul, tapi image files belum ada.

## Struktur HTML
```html
<div class="header-with-logos">
    <img src="logo1.png" alt="Logo Kiri" class="logo logo-left">
    <h1>📋 Form Survei Pendataan Usaha/Industri</h1>
    <img src="logo2.png" alt="Logo Kanan" class="logo logo-right">
</div>
```

Gambar akan ditampilkan:
- **logo1.png**: Logo kiri (ex: logo pemerintah/dinas)
- **logo2.png**: Logo kanan (ex: logo instansi lain)

## Cara Setup Logo

### Step 1: Siapkan File Gambar
1. Cari/download gambar yang ingin dijadikan logo:
   - Format: PNG, JPG, atau WebP
   - Ukuran recommended: 300x300 - 500x500 pixel
   - Size: < 500KB per file (optimal < 200KB)
   - Lebih baik: Gambar dengan background transparan (PNG)

2. **Ganti nama file:**
   - Gambar kiri → rename ke **`logo1.png`**
   - Gambar kanan → rename ke **`logo2.png`**

### Step 2: Upload ke Folder Project
Copy file `logo1.png` dan `logo2.png` ke folder yang sama dengan `INDEX.HTML`:
```
simbaaaa/
├── INDEX.HTML
├── GOOGLE_APPS_SCRIPT.gs
├── logo1.png          ← Tambahkan file ini
├── logo2.png          ← Tambahkan file ini
├── README.md
└── ...
```

### Step 3: Test Lokal
Buka `INDEX.HTML` di browser, seharusnya logo sudah tampil di kiri-kanan judul.

### Step 4: Deploy ke Vercel (Optional)
Jika sudah deploy ke Vercel, pastikan file `logo1.png` dan `logo2.png` sudah ter-push ke repository:
```bash
git add logo1.png logo2.png
git commit -m "Add logos to form header"
git push
```

## Styling & Ukuran Logo

### Default Sizing
- **Desktop**: 80x80 px
- **Mobile** (<600px): 60x60 px
- Gambar akan di-scale otomatis ke ukuran ini

### Kustomisasi Styling (Optional)
Jika ingin ubah ukuran logo, edit CSS di INDEX.HTML:

**Untuk perbesar:**
```css
.logo {
    width: 100px;      /* Ubah 80 ke 100 */
    height: 100px;
}

@media (max-width: 600px) {
    .logo {
        width: 70px;   /* Ubah 60 ke 70 */
        height: 70px;
    }
}
```

**Untuk ubah jarak antar logo:**
```css
.header-with-logos {
    gap: 40px;         /* Ubah 30 ke 40 (untuk desktop) */
}

@media (max-width: 600px) {
    .header-with-logos {
        gap: 20px;     /* Ubah 15 ke 20 (untuk mobile) */
    }
}
```

## Contoh Logo Recommendation

### Option 1: Pemerintah
- **Kiri**: Logo BPS / Badan Pusat Statistik
- **Kanan**: Logo Dinas/Instansi Lokal

### Option 2: Branding Perusahaan
- **Kiri**: Logo Perusahaan
- **Kanan**: Logo Divisi/Departemen

### Option 3: Kombinasi
- **Kiri**: Logo Pemerintah
- **Kanan**: Logo Partner/Sponsor

## Troubleshooting

### ❌ Logo tidak muncul
**Kemungkinan:**
1. File `logo1.png` atau `logo2.png` tidak ada di folder
   - Solution: Cek folder, pastikan file ada dengan exact name (case-sensitive)

2. Path/filename salah
   - Solution: Pastikan filename = `logo1.png` dan `logo2.png` (bukan `Logo1.PNG` atau `Logo 1.png`)

3. Format tidak supported
   - Solution: Convert ke PNG/JPG dulu (gunakan online converter)

### ❌ Logo tampil tapi blur/distorted
**Solusi:**
1. Gunakan gambar dengan resolusi lebih tinggi (min 300x300)
2. Pastikan format PNG untuk quality terbaik
3. Jangan compress terlalu berat

### ❌ Logo tidak centered dengan judul
**Solusi:**
- Ini normal jika gambar punya aspect ratio tidak square
- Edit CSS `.logo` property `object-fit`:
  - `contain` = tampil full dengan blank space (saat ini)
  - `cover` = potong gambar buat jadi square
  - `fill` = stretch gambar penuh

## Links Untuk Download Logo Gratis
- **Flaticon**: https://www.flaticon.com (icon & logo gratis)
- **Freepik**: https://www.freepik.com (design elements)
- **Pngimg**: https://pngimg.com (PNG images transparent)
- **Wikimedia Commons**: https://commons.wikimedia.org (government logos)

## Contoh CSS Untuk Ubah Appearance

### Tambahin border/shadow (opsional):
```css
.logo {
    width: 80px;
    height: 80px;
    object-fit: contain;
    flex-shrink: 0;
    border-radius: 10px;           /* Rounded corners */
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);  /* Subtle shadow */
}
```

### Tambahin background color (opsional):
```css
.logo {
    ...
    background: white;             /* Background warna */
    padding: 10px;                 /* Space inside */
}
```

---

**Status**: Ready untuk ditambah logo. Tunggu `logo1.png` dan `logo2.png` di folder, maka tampilan langsung update! 🎨
