// Google Apps Script untuk Form Survei Pendataan Usaha/Industri
// ============================================================
// PENTING: GANTI YOUR_GOOGLE_SHEET_ID DENGAN ID SHEET ANDA!
// Sheet ID ada di URL: https://docs.google.com/spreadsheets/d/SHEET_ID/edit

// SHEET CONFIGURATION
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'; // ⚠️ GANTI INI DENGAN SHEET ID ANDA
const SHEET_NAME = 'Data Survei'; // Nama sheet harus sesuai!

// GOOGLE DRIVE CONFIGURATION
const DRIVE_FOLDER_ID = '18-s4AheCr-nUD55fbgu-EW2z9Fk3Bwnu'; // Folder untuk simpan foto produk

// Main request handler - bisa handle GET atau POST
function handleRequest(e) {
  try {
    Logger.log('=== FORM SUBMISSION START ===');
    Logger.log('Timestamp: ' + new Date().toLocaleString('id-ID'));
    
    // Null/undefined check untuk parameter e
    if (!e) {
      Logger.log('ERROR: Parameter e is undefined');
      return createResponse('error', 'Request parameter tidak diterima');
    }
    
    Logger.log('Event object exists: ' + (e ? 'YES' : 'NO'));
    Logger.log('e.postData exists: ' + (e.postData ? 'YES' : 'NO'));
    Logger.log('e.parameter exists: ' + (e.parameter ? 'YES' : 'NO'));
    
    // Ambil data dari request (bisa GET atau POST dengan FormData)
    let data = {};
    let requestType = 'UNKNOWN';
    let files = {};
    
    // Untuk POST request dengan JSON body (untuk file uploads via base64)
    if (e.postData) {
      requestType = 'POST';
      const postSize = e.postData.contents ? e.postData.contents.length : 0;
      Logger.log('POST body size: ' + postSize + ' bytes');
      
      if (e.postData.contents && postSize > 0) {
        try {
          // Try parse sebagai JSON
          data = JSON.parse(e.postData.contents);
          Logger.log('✓ POST request with JSON - Fields received: ' + Object.keys(data).length);
          
          // Cek file fields
          Object.keys(data).forEach(key => {
            if (key.includes('produk_foto_base64_')) {
              try {
                const fileInfo = JSON.parse(data[key]);
                Logger.log('  - File field: ' + key + ' → ' + fileInfo.filename + ' (' + fileInfo.size + ' bytes)');
              } catch(e) {
                Logger.log('  - File field malformed: ' + key);
              }
            }
          });
          
        } catch(jsonError) {
          Logger.log('ERROR parsing JSON: ' + jsonError.toString());
          Logger.log('Body sample: ' + e.postData.contents.substring(0, 200));
          return createResponse('error', 'Data format tidak valid: ' + jsonError.toString());
        }
      } else {
        Logger.log('WARNING: POST request tapi body kosong');
        return createResponse('error', 'POST request tapi data kosong');
      }
    }
    // Untuk GET request: parameter ada di e.parameter
    else if (e.parameter && Object.keys(e.parameter).length > 0) {
      requestType = 'GET';
      // Jika ada parameter 'data' yang berisi JSON string
      if (e.parameter.data) {
        try {
          data = JSON.parse(e.parameter.data);
          Logger.log('GET request with JSON data - Fields received: ' + Object.keys(data).length);
        } catch(error) {
          Logger.log('Error parsing JSON from data parameter: ' + error);
          return createResponse('error', 'Data format tidak valid');
        }
      } else {
        data = e.parameter;
        Logger.log('GET request with direct parameters - Parameters received: ' + Object.keys(data).length);
      }
    } else {
      Logger.log('No data received in request');
      return createResponse('error', 'Tidak ada data yang dikirim');
    }
    
    Logger.log('Request type: ' + requestType);
    if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID') {
      Logger.log('ERROR: SHEET_ID belum diganti!');
      return createResponse('error', 'Konfigurasi belum lengkap. SHEET_ID belum diganti di Google Apps Script.');
    }
    
    Logger.log('Sheet ID: ' + SHEET_ID);
    Logger.log('Sheet Name: ' + SHEET_NAME);
    
    // Buka Google Sheet
    let spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.openById(SHEET_ID);
      Logger.log('Spreadsheet opened successfully');
    } catch(error) {
      Logger.log('Error opening spreadsheet: ' + error);
      return createResponse('error', 'Tidak bisa mengakses Google Sheet. Cek SHEET_ID di Google Apps Script.');
    }
    
    // Cek dan buat sheet jika belum ada
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      Logger.log('Sheet "' + SHEET_NAME + '" tidak ada. Membuat baru...');
      sheet = spreadsheet.insertSheet(SHEET_NAME, 0);
    }
    
    Logger.log('Sheet found/created: ' + SHEET_NAME);
    
    // Tentukan headers
    const headers = [
      'Timestamp',
      'Surveyor', // Username of the person who submitted
      // BLOK 1: Keterangan Usaha
      'Provinsi',
      'Kabupaten',
      'Kecamatan',
      'Desa',
      'SLS',
      'Nama Usaha/Perusahaan',
      'Alamat',
      'Latitude',
      'Longitude',
      'Nama Pengusaha',
      'Nomor HP',
      'Kegiatan Utama',
      'Klasifikasi Industri',
      
      // BLOK 2: Produksi dan Pekerja
      'Produk Info (JSON)',
      'Jumlah Pekerja Total',
      'Pekerja Tetap Dibayar',
      'Pekerja Tidak Tetap Dibayar',
      'Pekerja Keluarga',
      'Pendidikan Bawah SD',
      'Pendidikan SD',
      'Pendidikan SMP',
      'Pendidikan SMA/SMK',
      'Pendidikan Perguruan Tinggi',
      'Pekerja Laki-Laki',
      'Pekerja Perempuan',
      
      // BLOK 3: Catatan
      'Catatan',
      
      // BLOK 4: Keterangan Pemberi Jawaban
      'Nama Pemberi Jawaban',
      'Jabatan',
      'Kontak HP',
      'Tanggal Kunjungan',
      
      // CLOUDINARY: Link Foto Produk
      'Link Foto Produk (Cloudinary)'
    ];
    
    // Jika sheet kosong, tambahkan header
    if (sheet.getLastRow() === 0) {
      Logger.log('Sheet kosong. Menambahkan headers...');
      sheet.appendRow(headers);
      Logger.log('Headers added: ' + headers.length + ' columns');
    }
    
    // Kumpulkan info produk (field yang dimulai dengan produk_) dan Cloudinary foto URLs
    const produkInfo = [];
    let fotoLinks = [];
    let productNum = 1;
    while (true) {
      const produkNama = data['produk_nama_' + productNum];
      if (!produkNama) break;
      
      produkInfo.push({
        nama: produkNama,
        spesifikasi: data['produk_spesifikasi_' + productNum] || '',
        satuan: data['produk_satuan_' + productNum] || '',
        harga: data['produk_harga_' + productNum] || ''
      });
      
      // Handle Cloudinary foto URL jika ada (dari client-side upload)
      const fotoUrl = data['produk_foto_url_' + productNum];
      if (fotoUrl) {
        fotoLinks.push(fotoUrl);
        Logger.log('Foto ' + productNum + ' Cloudinary link: ' + fotoUrl);
      } else {
        fotoLinks.push('');
      }
      
      productNum++;
    }
    
    Logger.log('Products found: ' + produkInfo.length);
    Logger.log('Photos uploaded: ' + fotoLinks.filter(x => x).length);
    
    // Siapkan data untuk di-insert
    const row = [
      data.timestamp || new Date().toLocaleString('id-ID'),
      data.surveyor || '(Unknown)', // Surveyor/Username
      // BLOK 1
      data.provinsi || '',
      data.kabupaten || '',
      data.kecamatan || '',
      data.desa || '',
      data.sls || '',
      data.namaUsaha || '',
      data.alamat || '',
      data.latitude || '',
      data.longitude || '',
      data.namaPengusaha || '',
      data.nomorHP || '',
      data.kegiatanUtama || '',
      data.klasifikasiIndustri || '',
      
      // BLOK 2
      JSON.stringify(produkInfo),
      data.jumlahPekerjaTotal || '',
      data.pekerjatetapbayar || '',
      data.pekerjataktetapbayar || '',
      data.pekerjakeluarga || '',
      data.pendidikanBawahSD || '',
      data.pendidikanSD || '',
      data.pendidikanSMP || '',
      data.pendidikanSMASMK || '',
      data.pendidikanPerguruanTinggi || '',
      data.pekerjaLakilaki || '',
      data.pekerjaPerempuan || '',
      
      // BLOK 3
      data.catatan || '',
      
      // BLOK 4
      data.namaPemberiJawaban || '',
      data.jabatanPemberiJawaban || '',
      data.kontakPemberiJawaban || '',
      data.tanggalKunjungan || '',
      
      // Link Foto Produk
      fotoLinks.join(', ') // Gabungkan semua link foto dengan koma
    ];
    
    // Tambahkan baris ke sheet
    Logger.log('Appending row dengan ' + row.length + ' columns...');
    sheet.appendRow(row);
    Logger.log('Row appended successfully');
    
    Logger.log('=== FORM SUBMISSION SUCCESS ===');
    return createResponse('success', 'Data berhasil disimpan');
    
  } catch (error) {
    Logger.log('=== FATAL ERROR ===');
    Logger.log('Error: ' + error);
    Logger.log('Stack: ' + error.stack);
    return createResponse('error', 'Error: ' + error.toString());
  }
}

// Helper function untuk create response
function createResponse(status, message) {
  return ContentService.createTextOutput(
    'handleResponse(' + JSON.stringify({
      status: status,
      message: message,
      timestamp: new Date().toISOString()
    }) + ')'
  ).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

// Wrapper untuk doPost - manggil handleRequest
function doPost(e) {
  return handleRequest(e);
}

// Wrapper untuk doGet - bisa handle data atau tampilkan status page
function doGet(e) {
  // Jika ada parameter (data dikirim via GET)
  if (e.parameter && Object.keys(e.parameter).length > 0) {
    return handleRequest(e);
  }
  // Jika tidak ada parameter (hanya akses status page)
  else {
    return showStatusPage();
  }
}

// Fungsi untuk tampilkan status page
function showStatusPage() {
  try {
    const sheetStatus = SHEET_ID === 'YOUR_GOOGLE_SHEET_ID' ? 
      '⚠️ SHEET_ID BELUM DIGANTI' : 
      '✓ SHEET_ID OK';
    
    const sheetExists = SHEET_ID !== 'YOUR_GOOGLE_SHEET_ID' ? 
      checkSheetExists() : 
      '(Tidak bisa cek karena SHEET_ID belum diganti)';
    
    const html = `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial; margin: 20px; }
            h1 { color: #333; }
            .status { padding: 10px; margin: 5px 0; border-radius: 5px; }
            .ok { background: #d4edda; color: #155724; }
            .error { background: #f8d7da; color: #721c24; }
            .warning { background: #fff3cd; color: #856404; }
            pre { background: #f5f5f5; padding: 10px; overflow-x: auto; }
          </style>
        </head>
        <body>
          <h1>📋 Form Survei - Google Apps Script Status</h1>
          
          <div class="status warning">
            <strong>1. SHEET_ID Configuration:</strong><br>
            ${sheetStatus}
          </div>
          
          <div class="status ${SHEET_ID === 'YOUR_GOOGLE_SHEET_ID' ? 'error' : 'ok'}">
            <strong>2. Sheet "Data Survei" Status:</strong><br>
            ${sheetExists}
          </div>
          
          <div class="status ok">
            <strong>3. Google Apps Script:</strong><br>
            ✓ Script aktif dan siap menerima data
          </div>
          
          <hr>
          
          <h3>📝 Instruksi Setup:</h3>
          <ol>
            <li>Buka Google Sheet Anda</li>
            <li>Klik Tools → Script editor</li>
            <li>Cari baris: <code>const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'</code></li>
            <li>Ganti <code>YOUR_GOOGLE_SHEET_ID</code> dengan Sheet ID Anda
              <ul>
                <li>Sheet ID ada di URL sheet: <code>https://docs.google.com/spreadsheets/d/SHEET_ID/edit</code></li>
                <li>Copy bagian panjang di tengah</li>
              </ul>
            </li>
            <li>Pastikan sheet bernama "Data Survei" sudah ada</li>
            <li>Save & Deploy ulang</li>
          </ol>
          
          <h3>🔗 Current Script ID:</h3>
          <pre>${ScriptApp.getScriptId()}</pre>
          
          <h3>📊 Last 10 Deployments:</h3>
          <pre>${JSON.stringify(getDeployments(), null, 2)}</pre>
        </body>
      </html>
    `;
    
    return HtmlService.createHtmlOutput(html);
  } catch(error) {
    return HtmlService.createHtmlOutput('Error: ' + error);
  }
}

// Helper untuk cek apakah sheet ada
function checkSheetExists() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (sheet) {
      return '✓ Sheet "' + SHEET_NAME + '" ditemukan';
    } else {
      return '⚠️ Sheet "' + SHEET_NAME + '" TIDAK ada. Akan dibuat otomatis saat data pertama dikirim.';
    }
  } catch(error) {
    return '❌ Error: ' + error.toString();
  }
}

// Helper untuk list deployments
function getDeployments() {
  try {
    const deployments = ScriptApp.getDeploymentId ? 
      [{id: ScriptApp.getDeploymentId(), description: 'Current deployment'}] : 
      [];
    return deployments;
  } catch(e) {
    return [{error: e.toString()}];
  }
}

// Function untuk upload file ke Google Drive
function uploadFileToGoogleDrive(filename, mimeType, base64Data, produkNama) {
  try {
    Logger.log('Starting file upload...');
    Logger.log('Filename: ' + filename);
    Logger.log('MimeType: ' + mimeType);
    Logger.log('Base64 data length: ' + (base64Data ? base64Data.length : 'null') + ' chars');
    
    // Validasi base64 data
    if (!base64Data || base64Data.trim().length === 0) {
      throw new Error('Base64 data kosong atau null');
    }
    
    // Decode base64 string ke blob
    let binaryString;
    try {
      binaryString = Utilities.base64Decode(base64Data);
      Logger.log('Base64 decoded successfully: ' + binaryString.length + ' bytes');
    } catch(decodeError) {
      Logger.log('Error decoding base64: ' + decodeError.toString());
      throw new Error('Gagal decode base64: ' + decodeError.toString());
    }
    
    // Buat blob dari binary data
    const blob = Utilities.newBlob(binaryString, mimeType || 'image/jpeg', filename);
    Logger.log('Blob created: ' + blob.getSize() + ' bytes');
    
    // Cek apakah folder ada dan accessible
    let parentFolder;
    try {
      parentFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      Logger.log('Folder accessed: ' + DRIVE_FOLDER_ID);
    } catch(folderError) {
      Logger.log('Error accessing folder: ' + folderError.toString());
      throw new Error('Tidak bisa akses folder Drive. Cek DRIVE_FOLDER_ID dan permission.');
    }
    
    // Tentukan nama file dengan timestamp untuk hindari duplikat
    const timestamp = new Date().getTime();
    const fileExtension = getFileExtension(filename);
    const finalFilename = produkNama + '_' + timestamp + '.' + fileExtension;
    
    // Upload file ke Google Drive
    let file;
    try {
      file = parentFolder.createFile(blob);
      Logger.log('File created in Drive: ' + finalFilename);
    } catch(createError) {
      Logger.log('Error creating file: ' + createError.toString());
      throw new Error('Gagal upload ke Drive: ' + createError.toString());
    }
    
    // Set nama file
    try {
      file.setName(finalFilename);
      Logger.log('File renamed to: ' + finalFilename);
    } catch(renameError) {
      Logger.log('Error renaming file: ' + renameError.toString());
      // Lanjut meskipun rename gagal
    }
    
    // Buat link shareable
    try {
      file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
      Logger.log('File sharing set to ANYONE');
    } catch(sharingError) {
      Logger.log('Error setting sharing: ' + sharingError.toString());
      // Lanjut meskipun sharing gagal
    }
    
    const fileLink = file.getUrl();
    Logger.log('File uploaded successfully: ' + finalFilename + ' (' + fileLink + ')');
    return fileLink;
    
  } catch(error) {
    Logger.log('=== ERROR UPLOADING FILE ===');
    Logger.log('Error: ' + error.toString());
    Logger.log('Product name: ' + produkNama);
    Logger.log('Filename: ' + filename);
    throw error;
  }
}

// Helper function untuk dapat file extension
function getFileExtension(filename) {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : 'jpg';
}


