# TIQO — Bermain, Belajar, Bertualang

PWA permainan edukasi untuk anak usia 4–6 tahun. Versi 1.0.0.

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
- Beranda: Misi Hari Ini (dipilih otomatis per anak per hari), 5 pulau, ringkasan bintang.
- Peta Kepulauan Ajaib dan halaman tiap pulau.
- 38 misi di 5 pulau: Huruf (7), Angka (10), Taman Warna (7), Logika (8), Hijaiyah (6).
- Jenis permainan: pilihan ganda, mengurutkan, temukan semua, kartu memori, bantu hitung.
- Suara pemandu otomatis (bahasa Indonesia, dari perangkat) + efek suara lembut.
- Bintang 1–3 per misi, 12 hadiah di Galeri Bintang.
- Beberapa profil anak dengan progres terpisah (tanpa email/kata sandi).
- Area Orang Tua dengan gerbang (soal hitungan + tahan tombol): progres, suara, sekolah,
  profil, unduh/pulihkan cadangan, hapus data.
- Data hanya di perangkat (IndexedDB + localStorage). Tanpa iklan, tanpa pembelian, tanpa chat.

## Struktur kode di dalam index.html

Kode disusun per bagian bernomor: 1 Konfigurasi · 2 Bank konten · 3 Utilitas · 4 Ilustrasi ·
5 Misi (generator + katalog) · 6 Penyimpanan · 7 Suara · 8 Bintang & hadiah · 9 Mesin permainan ·
10 Layar · 11 Area orang tua · 12 Rute & start.

- Menambah misi: tambahkan satu objek di `MISSIONS` (bagian 5).
- Mengganti suara otomatis dengan rekaman: isi `AUDIO_CLIPS` (bagian 7).
- Sinkronisasi akun (Supabase) belum aktif; catatan rancangannya ada di akhir bagian 1.

## Catatan

- Offline: berfungsi setelah TIQO dibuka sekali dengan internet dan `sw.js` ikut diunggah.
- Kualitas suara pemandu bergantung pada HP. Jika logatnya terdengar asing, pasang suara
  "Bahasa Indonesia" di Pengaturan HP → Text-to-speech.
