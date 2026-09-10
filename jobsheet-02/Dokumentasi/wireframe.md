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

<!-- ADDED: REGISTRASI ANGGOTA BARU WIREFRAME -->
**[ADDED - WIREFRAME: REGISTRASI ANGGOTA BARU]**

## 2.2 Contoh: Wireframe Halaman Registrasi Anggota Baru

Wireframe halaman pendaftaran untuk aktor *Tamu* (menggunakan konvensi ASCII yang sama):

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

Catatan: halaman registrasi sengaja polos; validasi dan verifikasi email adalah detail backend yang diimplementasikan nanti.

**TANDA:** Section ini ditambahkan oleh asisten dan diberi komentar HTML di atas (`<!-- ADDED: REGISTRASI ANGGOTA BARU WIREFRAME -->`).

**TANDA:** File ini ditambahkan oleh asisten — lihat komentar HTML di bagian atas (`<!-- ADDED: WIREFRAME EXAMPLE COPIED FROM USER ATTACHMENT -->`).

Jika Anda ingin saya memindahkan isi ini ke lokasi lain, menggabungkannya ke file dokumentasi lain, atau mengubah teks/format, beri tahu file tujuan atau perubahan yang diinginkan.

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

**TANDA:** Bagian dashboard ini ditambahkan oleh asisten dan diberi komentar HTML di atas sebagai penanda (`<!-- ADDED: DASHBOARD WIREFRAME EXAMPLE COPIED FROM USER ATTACHMENT -->`).

<!-- ADDED: KONSEP WIREFRAME - PENTING -->
**[ADDED - KONSEP WIREFRAME]**

## Konsistensi dengan Desain yang Sudah Berjalan

Wireframe sengaja dibuat polos (tanpa warna, tanpa font, tanpa ukuran presisi) supaya diskusi rancangan fokus ke struktur dan alur dulu—elemen apa saja yang perlu ada dan di mana posisinya secara garis besar—tanpa terjebak berdebat soal warna tombol atau jenis font di tahap yang masih sangat awal. Detail visual seperti warna, tipografi, atau ukuran sudah punya jawabannya saat implementasi: cukup mengikuti `assets/css/style.css` yang telah dibangun untuk jobsheet-02. Pendekatan ini menjaga konsistensi desain sambil mempercepat iterasi rancangan.

**TANDA:** Paragraf ini ditambahkan oleh asisten dan diberi komentar HTML di atas (`<!-- ADDED: KONSEP WIREFRAME - PENTING -->`) sebagai penanda perubahan.

<!-- ADDED: USER FLOW PEMINJAMAN -->
**[ADDED - USER FLOW: PEMINJAMAN BUKU]**

## 3.2 User Flow: Peminjaman Buku

```
[Petugas Login] -> [Dashboard] -> [Pilih menu "Peminjaman Baru"]
				 -> [Pilih Anggota] -> [Pilih Buku (stok > 0)]
				 -> [Simpan] -> [Stok buku berkurang 1] -> [Kembali ke Dashboard]
```

Mari telusuri kotak demi kotak:

1. **[Petugas Login]**: Petugas harus login lebih dulu (wireframe halaman ini sudah dibahas di bab 2 §2.1). Kotak ini menegaskan bahwa fitur peminjaman tidak bisa diakses Tamu.

2. **[Dashboard]**: Setelah login berhasil, Petugas mendarat di halaman Dashboard.

3. **[Pilih menu "Peminjaman Baru"]**: Petugas mengklik salah satu tombol "Aksi Cepat" yang ada di Dashboard.

4. **[Pilih Anggota] dan [Pilih Buku (stok > 0)]**: Dua langkah pengisian form berurutan. Catatan penting: `stok > 0` adalah aturan bisnis — buku yang stoknya habis tidak boleh muncul sebagai pilihan.

5. **[Simpan]**: Petugas menekan tombol submit. Form ini benar-benar akan diproses ke database pada tahap implementasi.

6. **[Stok buku berkurang 1]**: Efek samping otomatis di balik layar; setelah penyimpanan, sistem harus mengurangi angka stok buku tersebut.

7. **[Kembali ke Dashboard]**: Alur ditutup dengan kembali ke Dashboard, menunjukkan siklus selesai dan Petugas dapat mengulang untuk peminjaman berikutnya.

**TANDA:** Bagian "User Flow: Peminjaman Buku" ditambahkan oleh asisten dan diberi komentar HTML di atas (`<!-- ADDED: USER FLOW PEMINJAMAN -->`).

<!-- ADDED: USER FLOW PENGEMBALIAN -->
**[ADDED - USER FLOW: PENGEMBALIAN BUKU]**

## 3.3 User Flow: Pengembalian Buku

```
[Dashboard] -> [Menu "Pengembalian"] -> [Cari transaksi aktif (anggota/buku)]
			-> [Tandai "Dikembalikan"] -> [Stok buku bertambah 1] -> [Kembali ke Dashboard]
```

Penjelasan langkah demi langkah:

1. **[Dashboard]**: Petugas memulai dari Dashboard setelah login.

2. **[Menu "Pengembalian"]**: Petugas memilih menu atau tombol cepat untuk melakukan pengembalian.

3. **[Cari transaksi aktif (anggota/buku)]**: Petugas mencari transaksi peminjaman yang masih aktif, bisa dengan mencari nama anggota atau judul buku.

4. **[Tandai "Dikembalikan"]**: Petugas menandai transaksi sebagai dikembalikan (aksi konfirmasi di UI).

5. **[Stok buku bertambah 1]**: Sistem secara otomatis menambah nilai stok buku terkait (efek samping backend).

6. **[Kembali ke Dashboard]**: Alur selesai dan Petugas kembali ke Dashboard.

Catatan: seperti pada user flow peminjaman, beberapa langkah mencerminkan aturan bisnis (mis. hanya transaksi aktif yang bisa dikembalikan) dan efek samping backend (perubahan stok) yang harus diimplementasikan saat coding.

**TANDA:** Bagian "User Flow: Pengembalian Buku" ditambahkan oleh asisten dengan komentar HTML di atas (`<!-- ADDED: USER FLOW PENGEMBALIAN -->`).

<!-- ADDED: USER FLOW TUNGGAKAN -->
**[ADDED - USER FLOW: ANGGOTA TUNGGAKAN]**

## 3.4 User Flow: Menangani Anggota dengan Tunggakan

```
[Dashboard] -> [Menu "Tunggakan" / Cari Anggota] -> [Lihat Daftar Tunggakan]
			-> [Pilih Anggota] -> [Tandai Peringatan / Kirim Notifikasi]
			-> [Atur Jadwal Pelunasan / Tampilkan Denda] -> [Selesai]
```

Langkah terperinci:

1. **[Dashboard]**: Petugas memulai dari Dashboard.

2. **[Menu "Tunggakan" / Cari Anggota]**: Petugas membuka halaman khusus tunggakan atau menggunakan fitur pencarian untuk menemukan anggota yang melewati jatuh tempo.

3. **[Lihat Daftar Tunggakan]**: Sistem menampilkan daftar transaksi yang belum dikembalikan beserta informasi tanggal jatuh tempo dan jumlah hari keterlambatan.

4. **[Pilih Anggota]**: Petugas memilih anggota yang ingin ditindaklanjuti.

5. **[Tandai Peringatan / Kirim Notifikasi]**: Petugas dapat menandai transaksi, mencetak atau mengirim notifikasi (email/SMS) kepada anggota tentang keterlambatan.

6. **[Atur Jadwal Pelunasan / Tampilkan Denda]**: Jika ada kebijakan denda, sistem menampilkan perhitungan denda; petugas bisa mencatat janji pengembalian atau menerima pelunasan.

7. **[Selesai]**: Setelah tindakan, catatan diperbarui; jika buku dikembalikan maka stok diperbarui dan transaksi ditutup.

Catatan: langkah ini menekankan aturan bisnis (perhitungan denda, batas waktu tindakan) dan notifikasi backend — UI hanya menyediakan kontrol untuk mengaktifkan aksi tersebut.

**TANDA:** Bagian ini ditambahkan oleh asisten dan diberi komentar HTML di atas (`<!-- ADDED: USER FLOW TUNGGAKAN -->`).

<!-- ADDED: EDGE CASES PEMINJAMAN -->
**[ADDED - EDGE CASES: PEMINJAMAN]**

## 4. Edge Cases & Penanganan (Ringkasan)

Berikut daftar edge case penting untuk fitur peminjaman/pengembalian beserta rekomendasi penanganan singkat:

- **Duplikat peminjaman (sama buku ke anggota yang sama dua kali):** lakukan cek sebelum simpan (cek active loan untuk pasangan member/book); tolak atau tampilkan opsi perpanjangan. Terapkan constraint DB/indeks untuk mencegah peminjaman aktif ganda.

- **Peminjaman saat stok = 0:** non-aktifkan pilihan pada UI dan validasi sisi server; gunakan transaksi DB untuk decrement stok atomik.

- **Race condition (konkurensi checkout):** tangani dengan lock DB (SELECT FOR UPDATE) atau mekanisme optimistik (version) untuk menghindari stok negatif.

- **Pengembalian ganda / idempotensi return:** buat operasi return menjadi idempotent — jika transaksi sudah tertutup, jadikan no-op dan informasikan status.

- **Mengembalikan tanpa transaksi aktif:** tolak dan berikan instruksi koreksi; catat kejadian untuk audit.

- **Hapus buku dengan pinjaman aktif:** gunakan soft-delete atau tolak hapus hingga semua pinjaman tertutup.

- **Batas maksimal peminjaman per anggota & anggota diblokir:** periksa limit dan status anggota sebelum izinkan peminjaman.

- **Perhitungan denda / pelunasan parsial:** implementasikan perhitungan deterministik, simpan log transaksi pembayaran, dan pastikan atomicity saat update saldo/denda.

- **Kegagalan jaringan/DB saat transaksi:** gunakan transaksi ACID, retry idempotent, dan simpan log untuk rekonsiliasi manual.

- **Validasi input & security:** validasi client+server, batasi akses hanya untuk role `petugas`, dan simpan audit trail untuk semua perubahan stok/transaksi.

**TANDA:** Section ini ditambahkan oleh asisten dan diberi komentar HTML di atas (`<!-- ADDED: EDGE CASES PEMINJAMAN -->`).
