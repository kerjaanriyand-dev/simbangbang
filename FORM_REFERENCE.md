# 📋 Form Reference - Struktur Lengkap

## BLOK 1: KETERANGAN USAHA

### Lokasi (Required)
- **Provinsi** - Provinsi lokasi usaha
- **Kabupaten** - Kabupaten/Kota
- **Kecamatan** - Kecamatan
- **Desa** - Desa/Kelurahan

### Identifikasi Statistik
- **SLS** - Satuan Listing Statistik (optional)

### Informasi Usaha (Required)
- **Nama Usaha/Perusahaan** - Nama resmi usaha
- **Alamat Usaha** - Alamat lengkap
- **Tag Lokasi (GPS)** - Latitude & Longitude (optional, bisa diambil otomatis)

### Informasi Pemilik (Required)
- **Nama Pengusaha** - Nama pemilik/pengusaha
- **Nomor HP** - Nomor telepon aktif

### Kegiatan (Required)
- **Kegiatan Utama** - Deskripsi kegiatan utama usaha
- **Klasifikasi Industri** - Pilihan: Industri Mikro / Kecil / Menengah / Besar

---

## BLOK 2: PRODUKSI DAN PEKERJA

### 201 - Informasi Produk (Optional)
Bisa ditambah multiple products dengan:
- **Nama Barang/Produk** - Nama produk yang dihasilkan
- **Spesifikasi** - Deskripsi/spesifikasi produk
- **Satuan** - Unit satuan (Kg, Buah, Box, Liter, dll)
- **Harga Satuan** - Harga per satuan (Rp)
- **Foto Barang** - Upload foto produk (optional)

**Cara:** Klik "Tambah Produk" untuk menambah produk baru, bisa di-hapus juga.

### 202 - Jumlah Pekerja Total (Required)
- **Jumlah Pekerja Total** - Total semua pekerja

### 202a - Status Pembayaran Pekerja (Optional)
- **Pekerja Tetap Dibayar** - Pekerja dengan status tetap yang digaji
- **Pekerja Tidak Tetap Dibayar** - Pekerja non-tetap yang digaji
- **Pekerja Keluarga** - Pekerja dari keluarga

*Catatan: Ketiga kategori ini harus total sama dengan atau kurang dari "Jumlah Pekerja Total"*

### 202b - Tingkat Pendidikan Pekerja (Optional)
- **Di Bawah SD** - Pekerja yang tidak tamat SD
- **SD** - Lulusan Sekolah Dasar
- **SMP** - Lulusan Sekolah Menengah Pertama
- **SMA/SMK** - Lulusan SMA atau SMK
- **Perguruan Tinggi** - Lulusan D1/D2/D3/S1/S2/S3

*Catatan: Total keseluruhan harus sama dengan "Jumlah Pekerja Total"*

### 202c - Jenis Kelamin Pekerja (Optional)
- **Pekerja Laki-Laki** - Jumlah pekerja laki-laki
- **Pekerja Perempuan** - Jumlah pekerja perempuan

*Catatan: Total laki-laki + perempuan harus sama dengan "Jumlah Pekerja Total"*

---

## BLOK 3: CATATAN

### Catatan Tambahan (Optional)
- **Catatan** - Field teks bebas untuk catatan/observasi penting selama survei
  - Bisa diisi dengan informasi tambahan yang tidak tercakup di blok lain
  - Atau biarkan kosong jika tidak ada

---

## BLOK 4: KETERANGAN PEMBERI JAWABAN

### Identitas Responden (Required)
- **Nama Pemberi Jawaban** - Nama orang yang mengisi/memberikan jawaban
- **Jabatan** - Posisi/jabatan orang tersebut di usaha
- **Kontak HP** - Nomor HP yang bisa dihubungi

### Waktu Survei (Required)
- **Tanggal Kunjungan** - Tanggal survei/kunjungan dilakukan (format: YYYY-MM-DD)

---

## 🔑 RINGKASAN FIELD

### Field Required (Wajib Diisi):
**Blok 1:**
- Provinsi, Kabupaten, Kecamatan, Desa
- Nama Usaha/Perusahaan
- Alamat Usaha
- Nama Pengusaha, Nomor HP
- Kegiatan Utama
- Klasifikasi Industri

**Blok 2:**
- Jumlah Pekerja Total

**Blok 4:**
- Nama Pemberi Jawaban
- Jabatan
- Kontak HP
- Tanggal Kunjungan

**Total: 15 field required**

### Field Optional (Boleh Dikosongkan):
**Blok 1:**
- SLS
- GPS (bisa diambil otomatis)

**Blok 2:**
- Semua field produk (201)
- Field pembayaran pekerja (202a)
- Field pendidikan pekerja (202b)
- Field jenis kelamin pekerja (202c)

**Blok 3:**
- Catatan

**Total: 22+ field optional**

---

## 📊 STRUKTUR DATA DI GOOGLE SHEETS

Setiap baris akan memiliki kolom-kolom berikut:

| Kolom | Data |
|-------|------|
| A | Timestamp |
| B-M | Blok 1 (Keterangan Usaha) |
| N-Z | Blok 2 (Produksi & Pekerja) |
| AA | Blok 3 (Catatan) |
| AB-AE | Blok 4 (Pemberi Jawaban) |

**Produk Info** disimpan dalam format JSON (satu cell), contoh:
```json
[
  {"nama":"Keramik","spesifikasi":"Ukuran 30x30","satuan":"Box","harga":"50000"},
  {"nama":"Cat","spesifikasi":"Cat dinding 1 liter","satuan":"Kaleng","harga":"75000"}
]
```

---

## ✨ TIPS PENGGUNAAN

### Saat Mengisi Form:
1. **Blok dapat dibuka/ditutup** - Klik header untuk expand/collapse
2. **Progress bar** - Menunjukkan persentase form yang sudah diisi
3. **Produk dinamis** - Tambah/hapus produk sesuai kebutuhan dengan tombol
4. **GPS otomatis** - Klik tombol untuk ambil lokasi, atau isi manual
5. **Validasi** - Field required akan ditunjukkan dengan tanda merah (*)

### Tips Mengisi:
- **Nama Usaha** - Nama resmi/registrasi usaha
- **Klasifikasi** - Sesuai dengan UU No. 20 Tahun 2008 tentang UMKM
  - Mikro: aset < 50 juta, omzet < 300 juta
  - Kecil: aset 50-500 juta, omzet 300 juta - 2,5 miliar
- **Produk** - Bisa lebih dari satu jika usaha multiproduk
- **Pendidikan Pekerja** - Isi berdasarkan ijazah tertinggi yang dimiliki

---

## 🔗 INTEGRASI GOOGLE SHEETS

Setiap data yang disubmit akan:
1. ✅ Langsung masuk ke baris baru di Google Sheet "Data Survei"
2. ✅ Timestamp otomatis tercatat
3. ✅ Data produk disimpan dalam JSON format
4. ✅ Siap untuk dianalisis atau di-export

### Export Data:
- Klik File → Download → CSV/Excel
- Bisa langsung dibuka di Excel/Calc untuk analisis lebih lanjut

---

## 📝 CONTOH PENGISIAN

### Blok 1:
```
Provinsi: Jawa Timur
Kabupaten: Surabaya
Kecamatan: Dukuh Pakis
Desa: Dukuh Pakis
Nama Usaha: CV. Keramik Indah
Alamat: Jl. Mastrip 101, Surabaya
Nama Pengusaha: Budi Santoso
Nomor HP: 081234567890
Kegiatan Utama: Produksi keramik untuk dekorasi rumah dan bangunan
Klasifikasi: Industri Kecil
```

### Blok 2:
```
Produk:
- Nama: Keramik Dekorasi
  Spesifikasi: 30x30 cm, motif batik
  Satuan: Box (10 pcs)
  Harga: 150.000

Jumlah Pekerja Total: 15
Pekerja Tetap Dibayar: 10
Pekerja Tidak Tetap: 3
Pekerja Keluarga: 2

Pendidikan:
- Bawah SD: 1
- SD: 3
- SMP: 5
- SMA/SMK: 4
- Perguruan Tinggi: 2

Gender:
- Laki-Laki: 10
- Perempuan: 5
```

### Blok 3:
```
Catatan: Usaha baru berkembang, lokasi pinggir jalan strategis, pemilik sangat antusias dengan pengembangan
```

### Blok 4:
```
Nama: Ani Wijaya
Jabatan: Manajer Produksi
Kontak HP: 085987654321
Tanggal Kunjungan: 2024-04-24
```

---

## 📞 BANTUAN

Jika ada pertanyaan tentang pengisian form:
- Lihat tooltip/hover text di setiap field
- Baca SETUP_GUIDE.md untuk detail lebih lengkap
- Cek CHECKLIST.md untuk langkah-langkah setup
