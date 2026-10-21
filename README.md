
# KTP OCR Extractor - Gemini AI

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Web-blue?style=for-the-badge&logo=github)](https://kevincreativefksd.github.io/KTP-OCR-Extractor-Gemini-AI/)
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Stack-HTML5%20%7C%20JS%20%7C%20TailwindCSS-brightgreen?style=for-the-badge)

Aplikasi web berbasis *Single Page Application* (SPA) yang berjalan 100% *client-side* untuk mengekstrak data dari foto Kartu Tanda Penduduk (KTP) Indonesia secara otomatis, presisi, dan aman menggunakan **Google Gemini AI**[span_0](start_span)[span_0](end_span).

🌐 **Live Web App:** [https://kevincreativefksd.github.io/KTP-OCR-Extractor-Gemini-AI/](https://kevincreativefksd.github.io/KTP-OCR-Extractor-Gemini-AI/)

---

## 🚀 Fitur Utama

- **Ekstraksi Cerdas & Presisi**: Memanfaatkan kemampuan multimodal Google Gemini AI untuk mengekstrak teks KTP secara terstruktur dalam format JSON[span_1](start_span)[span_1](end_span).
- **Penggabungan Alamat Otomatis**: Secara cerdas menggabungkan baris Jalan, RT/RW, Kelurahan/Desa, hingga Kecamatan menjadi satu alamat lengkap utuh[span_2](start_span)[span_2](end_span).
- **100% Client-Side & Privasi Terjaga**: Berjalan penuh di browser tanpa *backend* atau database perantara. Foto KTP langsung dikirim dari browser Anda ke Google API[span_3](start_span)[span_3](end_span).
- **Penyimpanan API Key Aman**: Gemini API Key disimpan secara lokal di `localStorage` browser Anda, tanpa risiko terekspos ke server pihak ketiga[span_4](start_span)[span_4](end_span).
- **Kemudahan Salin Data**: Dilengkapi tombol penyalin data individual per kolom maupun salin seluruh data sekaligus dalam format teks ringkas[span_5](start_span)[span_5](end_span).
- **UI Modern & Responsif**: Antarmuka bersih dengan dukungan *Drag & Drop* foto, dibuat menggunakan Tailwind CSS[span_6](start_span)[span_6](end_span).

---

## 📖 Cara Penggunaan Web

1. **Akses Web**: Buka [KTP OCR Extractor Web](https://kevincreativefksd.github.io/KTP-OCR-Extractor-Gemini-AI/)[span_7](start_span)[span_7](end_span).
2. **Masukkan Gemini API Key**: 
   - Dapatkan API Key gratis di [Google AI Studio](https://aistudio.google.com/)[span_8](start_span)[span_8](end_span).
   - Tempelkan (*paste*) pada kolom **Gemini API Key** di bagian atas[span_9](start_span)[span_9](end_span).
3. **Unggah Foto KTP**: Pilih atau seret (*drag & drop*) foto KTP (format JPG, JPEG, PNG)[span_10](start_span)[span_10](end_span).
4. **Ekstrak Data**: Klik tombol **Ekstrak Data KTP** dan tunggu beberapa detik hingga data terisi[span_11](start_span)[span_11](end_span).
5. **Salin Hasil**: Gunakan tombol salin per kolom atau tombol **Salin Semua (Format Teks)**[span_12](start_span)[span_12](end_span).

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: HTML5, Vanilla JavaScript (ES6+)[span_13](start_span)[span_13](end_span)
- **Styling**: Tailwind CSS (via CDN)[span_14](start_span)[span_14](end_span)
- **Iconography**: FontAwesome 6 (via CDN)[span_15](start_span)[span_15](end_span)
- **AI Engine**: Google Gemini API (`gemini-3.5-flash-lite` / `gemini-1.5-flash`)[span_16](start_span)[span_16](end_span)

---

## 💻 Penggunaan Lokal (Offline)

1. **Clone Repositori**
   ```bash
   git clone [https://github.com/Kevincreativefksd/KTP-OCR-Extractor-Gemini-AI.git](https://github.com/Kevincreativefksd/KTP-OCR-Extractor-Gemini-AI.git)
   cd KTP-OCR-Extractor-Gemini-AI

 * Buka Aplikasi
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
 * Aplikasi ini TIDAK menyimpan, merekam, atau mentransfer foto maupun data hasil ekstraksi ke server pihak ketiga mana pun.
 * Seluruh pemrosesan dilakukan di dalam memori lokal browser Anda dan dikirim langsung via HTTPS terenkripsi ke endpoint resmi Google API.
📄 Lisensi
Proyek ini dilindungi di bawah lisensi MIT License — bebas digunakan, dimodifikasi, dan didistribusikan.

