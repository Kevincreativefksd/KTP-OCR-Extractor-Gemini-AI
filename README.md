🇮🇩 KTP OCR Extractor — Gemini AI

<p align="center">
  <strong>Ekstraksi Data KTP Indonesia Otomatis dengan Google Gemini AI</strong>
  <br />
  Ubah foto KTP menjadi data terstruktur dalam format JSON dengan mudah dan cepat.
</p><p align="center">
  <a href="https://kevincreativefksd.github.io/KTP-OCR-Extractor-Gemini-AI/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Buka_Aplikasi-blue?style=for-the-badge" alt="Live Demo">
  </a>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License">
  <img src="https://img.shields.io/badge/Frontend-HTML5%20%7C%20JavaScript%20%7C%20TailwindCSS-brightgreen?style=for-the-badge" alt="Frontend Stack">
</p>---

📌 Tentang Proyek

KTP OCR Extractor — Gemini AI adalah aplikasi web berbasis Single Page Application (SPA) yang memanfaatkan kemampuan multimodal Google Gemini AI untuk mengekstrak informasi dari foto Kartu Tanda Penduduk (KTP) Indonesia secara otomatis.

Aplikasi dirancang agar praktis digunakan langsung melalui browser tanpa memerlukan backend atau database milik aplikasi.

🌐 Live Demo

Coba aplikasinya di sini:

👉 https://kevincreativefksd.github.io/KTP-OCR-Extractor-Gemini-AI/

---

✨ Fitur Utama

- 🤖 Ekstraksi Data Berbasis AI
  Menggunakan Google Gemini AI untuk mengenali teks pada foto KTP dan menyusunnya menjadi data terstruktur dalam format JSON.

- 📍 Penggabungan Alamat Otomatis
  Menggabungkan informasi alamat, termasuk jalan, RT/RW, kelurahan/desa, dan kecamatan, menjadi satu kolom alamat yang lebih mudah digunakan.

- 🌐 Tanpa Backend Aplikasi
  Antarmuka dan logika aplikasi berjalan langsung di browser. Foto dikirim dari browser ke Google Gemini API untuk diproses.

- 🔑 Penyimpanan API Key Lokal
  API Key dapat disimpan di "localStorage" browser sehingga pengguna tidak perlu memasukkannya kembali setiap kali membuka aplikasi pada browser yang sama.

- 📋 Salin Data dengan Mudah
  Mendukung penyalinan data per kolom maupun seluruh hasil ekstraksi dalam format teks yang ringkas.

- 🖼️ Unggah Foto Praktis
  Mendukung pemilihan gambar melalui file picker maupun fitur drag and drop.

- 📱 Antarmuka Responsif
  Dibangun dengan HTML, JavaScript, dan Tailwind CSS agar nyaman digunakan pada berbagai ukuran layar.

---

🛠️ Teknologi yang Digunakan

Teknologi| Kegunaan
HTML5| Struktur halaman aplikasi
Vanilla JavaScript (ES6+)| Logika aplikasi dan komunikasi dengan API
Tailwind CSS| Styling dan desain antarmuka
Font Awesome 6| Ikon antarmuka
Google Gemini API| Pengenalan teks dan ekstraksi informasi dari gambar

Model AI

Model Gemini yang digunakan bergantung pada konfigurasi aplikasi dan ketersediaan model pada API.

Model yang tercantum dalam konfigurasi proyek meliputi:

- "gemini-3.5-flash-lite"
- "gemini-1.5-flash"

«Catatan: Pastikan nama model yang digunakan sesuai dengan model yang tersedia dan didukung oleh Google Gemini API.»

---

🚀 Cara Menggunakan Aplikasi

1. Buka Aplikasi

Kunjungi halaman web berikut:

👉 https://kevincreativefksd.github.io/KTP-OCR-Extractor-Gemini-AI/

2. Dapatkan Gemini API Key

1. Buka "Google AI Studio" (https://aistudio.google.com/).
2. Masuk menggunakan akun Google.
3. Buat atau dapatkan Gemini API Key.
4. Salin API Key yang telah dibuat.

3. Masukkan API Key

Tempelkan API Key ke kolom Gemini API Key pada aplikasi.

Jika fitur penyimpanan lokal diaktifkan, API Key dapat disimpan di browser untuk penggunaan berikutnya.

4. Unggah Foto KTP

Pilih foto KTP melalui tombol unggah atau seret gambar ke area unggahan.

Format gambar yang didukung oleh panduan aplikasi:

- JPG
- JPEG
- PNG

Pastikan foto cukup jelas agar teks pada KTP dapat dikenali dengan lebih baik.

5. Ekstrak Data

Klik tombol Ekstrak Data KTP dan tunggu hingga proses pengenalan selesai.

Hasil ekstraksi akan ditampilkan pada kolom yang sesuai.

6. Salin Hasil Ekstraksi

Gunakan tombol salin untuk:

- Menyalin nilai dari kolom tertentu.
- Menyalin seluruh data dalam format teks.

Periksa kembali hasil ekstraksi sebelum menggunakannya karena pengenalan berbasis AI tidak selalu menghasilkan data yang sepenuhnya akurat.

---

💻 Instalasi dan Penggunaan Lokal

Ikuti langkah berikut untuk menjalankan aplikasi di komputer sendiri.

Persyaratan

- Browser modern seperti Google Chrome, Microsoft Edge, atau Mozilla Firefox.
- Git untuk mengkloning repositori.
- Gemini API Key yang valid.
- Koneksi internet untuk mengakses Google Gemini API dan resource eksternal yang digunakan aplikasi.

1. Clone Repositori

Buka terminal atau Command Prompt, kemudian jalankan:

git clone https://github.com/Kevincreativefksd/KTP-OCR-Extractor-Gemini-AI.git

2. Masuk ke Direktori Proyek

cd KTP-OCR-Extractor-Gemini-AI

3. Jalankan Aplikasi

Opsi A — Buka langsung

Buka file "index.html" menggunakan browser.

Opsi B — Menggunakan Visual Studio Code

1. Buka folder proyek di Visual Studio Code.
2. Instal ekstensi Live Server jika belum tersedia.
3. Klik kanan file "index.html".
4. Pilih Open with Live Server.

4. Gunakan Aplikasi

Setelah halaman terbuka, masukkan Gemini API Key dan unggah foto KTP untuk memulai ekstraksi.

«Penting: Aplikasi tetap memerlukan koneksi internet untuk berkomunikasi dengan Gemini API. Istilah penggunaan lokal berarti aplikasi dijalankan dari komputer sendiri, bukan berarti seluruh fungsi AI dapat digunakan tanpa internet.»

---

📋 Struktur Data JSON

Hasil ekstraksi dirancang menggunakan struktur JSON berikut:

{
  "nik": "",
  "nama": "",
  "tempat_tgl_lahir": "",
  "jenis_kelamin": "",
  "gol_darah": "",
  "agama": "",
  "alamat": "",
  "status_perkawinan": "",
  "pekerjaan": "",
  "kewarganegaraan": "",
  "berlaku_hingga": ""
}

📑 Keterangan Field

Field| Deskripsi
"nik"| Nomor Induk Kependudukan
"nama"| Nama lengkap pemilik KTP
"tempat_tgl_lahir"| Tempat dan tanggal lahir
"jenis_kelamin"| Jenis kelamin
"gol_darah"| Golongan darah
"agama"| Agama
"alamat"| Alamat lengkap
"status_perkawinan"| Status perkawinan
"pekerjaan"| Pekerjaan
"kewarganegaraan"| Kewarganegaraan
"berlaku_hingga"| Masa berlaku KTP

Nilai setiap field menggunakan string. Jika informasi tidak dapat dikenali, field dapat berisi string kosong, bergantung pada instruksi prompt dan implementasi aplikasi.

---

🔒 Privasi dan Keamanan Data

KTP mengandung informasi identitas pribadi (Personally Identifiable Information atau PII) yang perlu dilindungi.

Aplikasi ini dirancang untuk memproses gambar langsung dari browser tanpa menggunakan backend atau database perantara milik aplikasi.

Bagaimana Data Diproses?

1. Pengguna memilih foto KTP melalui browser.
2. Aplikasi mengirimkan gambar dan instruksi ekstraksi ke Google Gemini API.
3. Google Gemini API memproses gambar dan mengembalikan hasil ekstraksi.
4. Aplikasi menampilkan hasil tersebut kepada pengguna.

Hal yang Perlu Diperhatikan

- Tidak ada backend aplikasi: Foto tidak perlu melewati server backend milik proyek ini.
- API Key disimpan secara lokal: Jika fitur penyimpanan diaktifkan, API Key disimpan dalam "localStorage" browser.
- Komunikasi API: Permintaan ke Google Gemini API menggunakan HTTPS.
- Pemrosesan pihak ketiga: Foto KTP dikirim ke Google untuk diproses. Penggunaan API tunduk pada ketentuan dan kebijakan privasi Google yang berlaku.
- Keamanan API Key: Data di "localStorage" dapat diakses oleh JavaScript yang berjalan pada origin yang sama. Jangan menggunakan penyimpanan lokal sebagai tempat penyimpanan rahasia yang sepenuhnya aman.
- Akurasi hasil: Selalu periksa kembali data hasil ekstraksi sebelum digunakan untuk keperluan administratif atau proses penting lainnya.

«⚠️ Peringatan privasi: Jangan mengunggah foto KTP milik orang lain tanpa izin yang sesuai. Hindari penggunaan data identitas asli untuk pengujian jika gambar dummy dapat digunakan.»

---

⚠️ Batasan Aplikasi

Beberapa hal yang perlu diketahui sebelum menggunakan aplikasi:

- Akurasi ekstraksi bergantung pada kualitas, pencahayaan, sudut, dan keterbacaan foto.
- Foto yang buram, terpotong, terlalu gelap, atau memiliki pantulan cahaya dapat menghasilkan data yang tidak akurat.
- Ketersediaan layanan dan model Gemini bergantung pada kebijakan serta konfigurasi Google.
- Penggunaan Gemini API dapat tunduk pada kuota, batas permintaan, dan ketentuan biaya yang berlaku.
- Aplikasi membutuhkan koneksi internet untuk mengakses layanan AI.
- API Key yang digunakan pada aplikasi frontend tidak dapat dianggap sebagai rahasia dari pengguna browser yang menjalankan aplikasi.

---

📄 Lisensi

Proyek ini menggunakan MIT License.

Lisensi ini memungkinkan penggunaan, modifikasi, dan distribusi perangkat lunak sesuai dengan ketentuan lisensi MIT.

---

⭐ Dukungan

Jika proyek ini bermanfaat, pertimbangkan untuk memberikan ⭐ Star pada repositori GitHub.

Dukungan Anda membantu proyek ini menjangkau lebih banyak pengguna dan mendorong pengembangan fitur berikutnya.

---

<p align="center">
  <strong>KTP OCR Extractor — Gemini AI</strong>
  <br />
  Dibuat untuk mempermudah ekstraksi data KTP Indonesia dengan bantuan AI.
</p>