<!-- MERGED FROM Dokumentasi/wireframe.md - ADDED BY ASSISTANT -->
# Jobsheet 02 — Dokumentasi & Wireframes

Ringkasan materi dan dokumentasi untuk Jobsheet 02. Bagian-bagian penting disimpan di folder `Dokumentasi/`.

## Wireframe (digabung dari `Dokumentasi/wireframe.md`)

<!-- MERGED CONTENT START -->
<!-- ADDED: WIREFRAME EXAMPLE COPIED FROM USER ATTACHMENT -->
**[ADDED - WIREFRAME EXAMPLE]**

# 2. Cara Membaca Wireframe

Wireframe yang dipakai di `docs/wireframe.md` ditulis dalam bentuk ASCII art (gambar dari karakter teks biasa) di dalam blok kode markdown, mirip pendekatan yang tadinya dipakai untuk diagram box model di dokumentasi jobsheet-02 sebelum diganti SVG. Bedanya, untuk *wireframe* rancangan (bukan diagram final yang dipublikasi), ASCII art justru pilihan yang tepat: cepat digambar, mudah diubah lagi kalau rancangan berubah, dan tidak butuh alat desain khusus, cocok untuk tahap "sketsa kasar" sebelum sesuatu benar-benar dibangun.

## 2.1 Contoh: Wireframe Halaman Login

Berikut contoh wireframe halaman login dalam ASCII art:

```
+------------------------------------+
|            SIMPUS-Mini             |
|                                    |
|       [ Login Petugas ]            |
|                                    |
|  Username : [______________]       |
|  Password : [______________]       |
|                                    |
|       [    Masuk     ]             |
|                                    |
|  Belum punya akun? Daftar di sini  |
+------------------------------------+
```

---

<!-- ADDED: REGISTRASI ANGGOTA BARU WIREFRAME (MERGED) -->
**[ADDED - WIREFRAME: REGISTRASI ANGGOTA BARU]**

## 2.2 Contoh: Wireframe Halaman Registrasi Anggota Baru

```
 +--------------------------------------------+
 |                SIMPUS-Mini                 |
 |                                            |
 |         [ Registrasi Anggota Baru ]        |
 |                                            |
 |  Nama Lengkap : [______________________]   |
 |  Email        : [______________________]   |
 |  Password     : [______________________]   |
 |  Konfirmasi   : [______________________]   |
 |                                            |
 |   [  Daftar  ]     [  Kembali ke Beranda ] |
 |                                            |
 |  Catatan: Tamu dapat mendaftar sendiri; setelah verifikasi, mereka menjadi Anggota. |
 +--------------------------------------------+
```

Ringkasan dan penjelasan lengkap ada di `Dokumentasi/wireframe.md`.

<!-- ADDED: DASHBOARD WIREFRAME EXAMPLE COPIED FROM USER ATTACHMENT -->
**[ADDED - DASHBOARD WIREFRAME]**

## 2.3 Wireframe yang Lebih Kompleks: Dashboard Petugas

Contoh wireframe dashboard petugas — navbar diperluas, kartu statistik, aksi cepat, dan tabel transaksi terbaru:

```
+-----------------------------------------------------------+
| SIMPUS-Mini   | Beranda | Buku | Anggota | Peminjaman | (Nama Petugas) Logout |
|-------------------------------------------------------------|
|  [ Total Buku ]  [ Total Anggota ]  [ Sedang Dipinjam ]     |
|                                                           |
| Aksi Cepat:                                               |
|  [ + Peminjaman Baru ]   [ + Pengembalian ]               |
|                                                           |
| Transaksi Terbaru:                                        |
|  -------------------------------------------------------  |
|  Anggota  | Buku            | Tgl Pinjam  | Status        |
|  -------------------------------------------------------  |
|  (baris data transaksi...)                                 |
+-----------------------------------------------------------+
```

Perhatikan: navigasi atas menambah menu "Peminjaman" dan indikator login petugas di kanan (`(Nama Petugas) Logout`). Baris kartu statistik (`[ Total Buku ] [ Total Anggota ] [ Sedang Dipinjam ]`) merepresentasikan kartu yang dapat diimplementasikan menggunakan CSS Grid.

---

<!-- ADDED: KONSEP WIREFRAME - PENTING -->
**[ADDED - KONSEP WIREFRAME]**

## Konsistensi dengan Desain yang Sudah Berjalan

Wireframe sengaja dibuat polos (tanpa warna, tanpa font, tanpa ukuran presisi) supaya diskusi rancangan fokus ke struktur dan alur dulu—elemen apa saja yang perlu ada dan di mana posisinya secara garis besar—tanpa terjebak berdebat soal warna tombol atau jenis font di tahap yang masih sangat awal. Detail visual seperti warna, tipografi, atau ukuran sudah punya jawabannya saat implementasi: cukup mengikuti `assets/css/style.css` yang telah dibangun untuk jobsheet-02. Pendekatan ini menjaga konsistensi desain sambil mempercepat iterasi rancangan.

<!-- MERGED CONTENT END -->

---

Untuk dokumentasi lebih lengkap lihat folder `Dokumentasi/` atau buka [jobsheet-02/Dokumentasi/wireframe.md](jobsheet-02/Dokumentasi/wireframe.md).

<!-- NOTE: README dibuat/diisi otomatis oleh asisten berdasarkan permintaan pengguna untuk menggabungkan wireframe.md -->

<!-- ADDED: USER FLOW PEMINJAMAN (MERGED) -->
**[ADDED - USER FLOW: PEMINJAMAN BUKU]**

## 3.2 User Flow: Peminjaman Buku

```
[Petugas Login] -> [Dashboard] -> [Pilih menu "Peminjaman Baru"]
				 -> [Pilih Anggota] -> [Pilih Buku (stok > 0)]
				 -> [Simpan] -> [Stok buku berkurang 1] -> [Kembali ke Dashboard]
```

Ringkasan alur dan penjelasan langkah-langkah tersedia lengkap di `Dokumentasi/wireframe.md`.

<!-- ADDED: USER FLOW PENGEMBALIAN (MERGED) -->
**[ADDED - USER FLOW: PENGEMBALIAN BUKU]**

## 3.3 User Flow: Pengembalian Buku

```
[Dashboard] -> [Menu "Pengembalian"] -> [Cari transaksi aktif (anggota/buku)]
			-> [Tandai "Dikembalikan"] -> [Stok buku bertambah 1] -> [Kembali ke Dashboard]
```

Ringkasan langkah dan penjelasan lengkap tersedia di `Dokumentasi/wireframe.md`.

<!-- ADDED: USER FLOW TUNGGAKAN (MERGED) -->
**[ADDED - USER FLOW: ANGGOTA TUNGGAKAN]**

## 3.4 User Flow: Menangani Anggota dengan Tunggakan

```
[Dashboard] -> [Menu "Tunggakan" / Cari Anggota] -> [Lihat Daftar Tunggakan]
			-> [Pilih Anggota] -> [Tandai Peringatan / Kirim Notifikasi]
			-> [Atur Jadwal Pelunasan / Tampilkan Denda] -> [Selesai]
```

Ringkasan dan penjelasan lengkap tersedia di `Dokumentasi/wireframe.md`.

<!-- ADDED: EDGE CASES PEMINJAMAN (MERGED) -->
**[ADDED - EDGE CASES: PEMINJAMAN]**

Ringkasan edge case penting (duplikat peminjaman, stok=0, race conditions, pengembalian ganda, hapus buku dengan pinjaman aktif, batas peminjaman, perhitungan denda, kegagalan transaksi, validasi & security). Untuk detail dan rekomendasi penanganan, lihat `Dokumentasi/wireframe.md`.

