# TIQO — Bermain, Belajar, Bertualang

PWA permainan edukasi untuk anak usia 4–6 tahun. Versi 1.4.0.

## Isi folder

| Berkas | Fungsi |
|---|---|
| `index.html` | Seluruh aplikasi: tampilan, gambar logo, dan kode. Bisa berjalan sendiri. |
| `manifest.json` | Data aplikasi agar bisa dipasang di layar utama HP. |
| `sw.js` | Service worker: membuat TIQO bisa dibuka tanpa internet setelah kunjungan pertama. |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | Ikon aplikasi. |

Semua berkas harus berada di **folder yang sama** (akar repositori).

## Cara unggah ke GitHub + Vercel

1. Buat repositori baru di GitHub (misalnya `tiqo`).
2. Unggah semua berkas di atas ke akar repositori (Add file → Upload files).
3. Di Vercel: Add New → Project → pilih repositori `tiqo` → Framework Preset: **Other** → Deploy.
   Tidak perlu build command maupun output directory.
4. Setiap kali ada `index.html` versi baru, cukup ganti berkas itu di GitHub. Vercel akan memperbarui situs otomatis, dan pengguna mendapat versi baru saat membuka aplikasi lagi dengan internet.

`manifest.json`, `sw.js`, dan ikon cukup diunggah sekali, kecuali ada catatan perubahan.

## Fitur v1

- Layar pembuka dengan logo resmi, nama sekolah (dapat diubah/dimatikan).
- Beranda: Misi Hari Ini (dipilih otomatis per anak per hari), 7 pulau, ringkasan bintang.
- Peta Kepulauan Ajaib dan halaman tiap pulau.
- 60 misi di 7 pulau: Huruf (10), Angka (12), Taman Warna (7), Logika (8), Kode (6), Bahasa (8), Hijaiyah (9).
- Pulau Kode (baru di v1.3.0): menyusun kartu panah agar bintang sampai ke portal — langkah pertama,
  urutan langkah, menghindari batu, memperbaiki kode (debugging), dan perulangan ×2/×3.
- Pulau Bahasa (baru di v1.4.0): kosakata bahasa Inggris — hewan, buah, benda, warna, angka 1–5,
  kartu kata kembar, dan sapaan (Hello, Thank you, dst.). Kata Inggris dibacakan dengan suara Inggris dari HP,
  lalu muncul artinya dalam bahasa Indonesia.
- Jenis permainan: pilihan ganda, mengurutkan, temukan semua, kartu memori, bantu hitung,
  dan menebalkan dengan jari (A–Z, 0–9, hijaiyah) — baru di v1.1.0.
- Suara pemandu otomatis (bahasa Indonesia, dari perangkat) + efek suara lembut.
- Bintang 1–3 per misi, 14 hadiah di Galeri Bintang.
- Beberapa profil anak dengan progres terpisah (tanpa email/kata sandi).
- Area Orang Tua dengan gerbang (soal hitungan + tahan tombol): progres, waktu bermain, suara,
  sekolah, profil, unduh/pulihkan cadangan, hapus data.
- Waktu bermain: batas harian per anak (15–60 menit), jam tidur (19.00/20.00/21.00 s.d. 05.00),
  peringatan 2 menit sebelum habis, layar istirahat, tambah 10 menit oleh orang tua — baru di v1.2.0.
- Data hanya di perangkat (IndexedDB + localStorage). Tanpa iklan, tanpa pembelian, tanpa chat.

## Struktur kode di dalam index.html

Kode disusun per bagian bernomor: 1 Konfigurasi · 2 Bank konten · 3 Utilitas · 4 Ilustrasi · 4b Menebalkan · 4c Pulau Kode ·
5 Misi (generator + bahasa Inggris + katalog) · 6 Penyimpanan · 7 Suara · 8 Bintang & hadiah · 8b Waktu bermain · 9 Mesin permainan ·
10 Layar · 11 Area orang tua · 12 Rute & start.

- Menambah misi: tambahkan satu objek di `MISSIONS` (bagian 5).
- Kata Inggris di kalimat ditandai `[[en:Kata]]` agar dibaca dengan suara Inggris.
- Mengganti suara otomatis dengan rekaman: isi `AUDIO_CLIPS` (bagian 7).
- Sinkronisasi akun (Supabase) belum aktif; catatan rancangannya ada di akhir bagian 1.

## Catatan

- Offline: berfungsi setelah TIQO dibuka sekali dengan internet dan `sw.js` ikut diunggah.
- Suara Inggris juga berasal dari HP (Text-to-speech bahasa Inggris). Jika terdengar kurang jelas, pasang suara "English (US)" di Pengaturan HP.
- Kualitas suara pemandu bergantung pada HP. Jika logatnya terdengar asing, pasang suara
  "Bahasa Indonesia" di Pengaturan HP → Text-to-speech.

## Riwayat versi

- **1.4.0** — Pulau Bahasa: 8 misi kosakata bahasa Inggris + hadiah Jago Bahasa.
- **1.3.0** — Pulau Kode: 6 misi coding untuk anak + hadiah Ahli Kode.
- **1.2.0** — Pengatur waktu bermain & jam tidur di Area Orang Tua.
- **1.1.0** — Permainan menebalkan dengan jari: huruf A–Z, angka 0–9, huruf hijaiyah (8 misi baru).
- **1.0.1** — Identitas pengembang IdeA1 + kontak WhatsApp di Tentang TIQO.
- **1.0.0** — Rilis pertama.
