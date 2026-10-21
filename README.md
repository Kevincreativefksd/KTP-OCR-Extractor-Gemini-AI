
# KTP OCR Extractor - Gemini AI

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Web-blue?style=for-the-badge&logo=github)](https://kevincreativefksd.github.io/KTP-OCR-Extractor-Gemini-AI/)
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Stack-HTML5%20%7C%20JS%20%7C%20TailwindCSS-brightgreen?style=for-the-badge)

# KTP OCR Extractor - Gemini AI

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Web-blue?style=for-the-badge&logo=github)](https://kevincreativefksd.github.io/KTP-OCR-Extractor-Gemini-AI/)
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Stack-HTML5%20%7C%20JS%20%7C%20TailwindCSS-brightgreen?style=for-the-badge)

Aplikasi web berbasis *Single Page Application* (SPA) yang berjalan 100% *client-side* untuk mengekstrak data dari foto Kartu Tanda Penduduk (KTP) Indonesia secara otomatis, presisi, dan aman menggunakan **Google Gemini AI**.

🌐 **Live Web App:** [https://kevincreativefksd.github.io/KTP-OCR-Extractor-Gemini-AI/](https://kevincreativefksd.github.io/KTP-OCR-Extractor-Gemini-AI/)

---

## 🚀 Fitur Utama

- **Ekstraksi Cerdas & Presisi**: Memanfaatkan kemampuan multimodal Google Gemini AI untuk mengekstrak teks KTP secara terstruktur dalam format JSON.
- **Penggabungan Alamat Otomatis**: Secara cerdas menggabungkan baris Jalan, RT/RW, Kelurahan/Desa, hingga Kecamatan menjadi satu alamat lengkap utuh.
- **100% Client-Side & Privasi Terjaga**: Berjalan penuh di browser tanpa *backend* atau database perantara. Foto KTP langsung dikirim dari browser Anda ke Google API.
- **Penyimpanan API Key Aman**: Gemini API Key disimpan secara lokal di `localStorage` browser Anda, tanpa risiko terekspos ke server pihak ketiga.
- **Kemudahan Salin Data**: Dilengkapi tombol penyalin data individual per kolom maupun salin seluruh data sekaligus dalam format teks ringkas.
- **UI Modern & Responsif**: Antarmuka bersih dengan dukungan *Drag & Drop* foto, dibuat menggunakan Tailwind CSS.

---

## 📖 Cara Penggunaan Web

1. **Akses Web**: Buka [KTP OCR Extractor Web](https://kevincreativefksd.github.io/KTP-OCR-Extractor-Gemini-AI/).
2. **Masukkan Gemini API Key**: 
   - Dapatkan API Key gratis di [Google AI Studio](https://aistudio.google.com/).
   - Tempelkan (*paste*) pada kolom **Gemini API Key** di bagian atas.
3. **Unggah Foto KTP**: Pilih atau seret (*drag & drop*) foto KTP (format JPG, JPEG, PNG).
4. **Ekstrak Data**: Klik tombol **Ekstrak Data KTP** dan tunggu beberapa detik hingga data terisi.
5. **Salin Hasil**: Gunakan tombol salin per kolom atau tombol **Salin Semua (Format Teks)**.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: HTML5, Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS (via CDN)
- **Iconography**: FontAwesome 6 (via CDN)
- **AI Engine**: Google Gemini API (`gemini-3.5-flash-lite` / `gemini-1.5-flash`)

---

## 💻 Penggunaan Lokal (Offline)

1. **Clone Repositori**
   ```bash
   git clone [https://github.com/Kevincreativefksd/KTP-OCR-Extractor-Gemini-AI.git](https://github.com/Kevincreativefksd/KTP-OCR-Extractor-Gemini-AI.git)
   cd KTP-OCR-Extractor-Gemini-AI


2. **Buka Aplikasi**
Cukup buka file index.html langsung di browser Anda atau gunakan ekstensi Live Server di VS Code.
📋 Schema Data JSON
Prompt AI diinstruksikan untuk merespons secara eksklusif dalam format JSON murni berikut:
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
🔒 Privasi & Keamanan Data (PII)
Data pada Kartu Tanda Penduduk (KTP) merupakan Personally Identifiable Information (PII) yang bersifat sensitif.
Aplikasi ini TIDAK menyimpan, merekam, atau mentransfer foto maupun data hasil ekstraksi ke server pihak ketiga mana pun.
Seluruh pemrosesan dilakukan di dalam memori lokal browser Anda dan dikirim langsung via HTTPS terenkripsi ke endpoint resmi Google API.
📄 Lisensi
Proyek ini dilindungi di bawah lisensi MIT License — bebas digunakan, dimodifikasi, dan didistribusikan