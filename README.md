
# 🪪 KTP OCR Extractor - Gemini AI

Aplikasi web ringan berbasis Single Page Application (SPA) untuk mengekstrak data dari foto Kartu Tanda Penduduk (KTP) Indonesia secara otomatis dan presisi menggunakan **Google Gemini AI**. 

Aplikasi ini berjalan 100% di sisi klien (client-side) tanpa memerlukan backend tambahan.

## ✨ Fitur Utama

- **Ekstraksi Cerdas**: Menggunakan prompt JSON terstruktur untuk menghasilkan data yang akurat dari gambar KTP (mendukung format JPG, JPEG, PNG).
- **Penggabungan Alamat Otomatis**: AI diinstruksikan untuk menggabungkan elemen alamat (Jalan, RT/RW, Kel/Desa, Kecamatan) menjadi satu baris utuh.
- **Client-Side Processing**: Tidak ada data gambar yang disimpan di server perantara. Gambar langsung dikirim ke API Google.
- **Penyimpanan API Key Aman**: Gemini API Key disimpan di `localStorage` browser, sehingga Anda tidak perlu memasukkannya berulang kali.
- **Copy to Clipboard**: Tersedia tombol untuk menyalin data individual (per kolom) maupun menyalin keseluruhan data dalam format teks.
- **Drag & Drop UI**: Antarmuka modern, responsif, dan mudah digunakan (dibangun menggunakan Tailwind CSS).

## 🛠️ Teknologi yang Digunakan

- **Frontend**: HTML5, Vanilla JavaScript
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: FontAwesome 6 (via CDN)
- **AI Engine**: Google Gemini API (`gemini-3.5-flash-lite` / `gemini-1.5-flash`)

## 🚀 Cara Penggunaan

Karena aplikasi ini sepenuhnya berbasis frontend, Anda tidak perlu melakukan instalasi dependensi (NPM/Composer) apa pun.

1. **Clone repositori ini** atau unduh file `index.html`.
   ```bash
   git clone [https://github.com/Kevincreativefksd/KTP-OCR-Extractor-Gemini-AI](https://github.com/Kevincreativefksd/KTP-OCR-Extractor-Gemini-AI)

 * Buka file index.html langsung di browser Anda, atau gunakan ekstensi seperti Live Server di VS Code.
 * Dapatkan Gemini API Key:
   * Kunjungi Google AI Studio.
   * Buat dan salin API Key Anda.
 * Mulai Ekstraksi:
   * Paste API Key pada kolom yang disediakan di bagian atas halaman web.
   * Klik atau drag-and-drop foto KTP ke area unggah.
   * Klik tombol "Ekstrak Data KTP".
   * Tunggu proses selesai, dan data akan otomatis terisi di form yang tersedia.
📦 Struktur Data JSON (Prompt AI)
AI diinstruksikan untuk merespons secara eksklusif dengan format JSON murni berikut:
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

🔒 Catatan Keamanan & Privasi
 * Data KTP adalah Data Sensitif (PII - Personally Identifiable Information).
 * Aplikasi ini TIDAK menyimpan foto KTP atau data hasil ekstraksi di database mana pun. Semua proses dilakukan di memori browser Anda.
 * Gambar KTP dikirim langsung dari browser Anda ke server Google API untuk dianalisis. Pastikan Anda memahami Kebijakan Privasi Google API terkait penggunaan data.
 * Jangan pernah mempublikasikan atau membagikan (commit) API Key Anda ke publik.
🤝 Kontribusi
Jika Anda ingin mengembangkan aplikasi ini lebih lanjut (misalnya: menambahkan fitur crop gambar sebelum diunggah, atau mengintegrasikan ke backend PHP/Node.js), silakan buat Pull Request atau buka Issue.
📄 Lisensi
MIT License - Bebas digunakan, dimodifikasi, dan didistribusikan untuk keperluan pribadi maupun komersial.