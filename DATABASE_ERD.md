# Dokumentasi Entity Relationship Diagram (ERD) & Skema Database
**Aplikasi Wisata Indonesia (Explore Nusantara) - Kelompok 9**

![Visualisasi Skema ERD](file:///C:/Users/HP/.gemini/antigravity/brain/ce403d11-d8cb-4232-8063-c2d6b958339e/database_erd_diagram_1780828284325.png)

Dokumen ini menjelaskan struktur basis data (database) yang dirancang agar sesuai dengan program React pada repositori ini. Basis data dirancang menggunakan model relasional yang cocok diimplementasikan pada **MySQL / MariaDB** (atau phpMyAdmin).

---

## 1. Visualisasi ERD (Entity Relationship Diagram)

Diagram berikut digambar menggunakan sintaks **Mermaid**. Jika Anda membuka berkas ini di GitHub, VS Code (dengan ekstensi Markdown Preview), atau *viewer* Markdown modern lainnya, diagram ini akan langsung ter-render sebagai grafis interaktif.

```mermaid
erDiagram
    USERS {
        int id PK "Auto Increment"
        string name "Nama Lengkap"
        string username UNIQUE "Username"
        string email UNIQUE "Email"
        string password "Password Hashed"
        string phone "No. Telepon"
        string location "Lokasi Pengguna"
        string avatar "URL Gambar Avatar"
        datetime join_date "Tanggal Gabung"
    }

    KATEGORI {
        string id PK "Kode Kategori (e.g. pantai, gunung)"
        string name "Nama Kategori"
        string circle_class "Kelas CSS Styling"
    }

    DESTINASI {
        string id PK "Kode Destinasi (e.g. bali, bromo)"
        string name "Nama Tempat Wisata"
        string location "Lokasi / Provinsi"
        string category_id FK "Relasi ke KATEGORI"
        decimal rating "Rating Bintang (e.g. 4.9)"
        int reviews_count "Jumlah Ulasan"
        string price "Rentang Harga"
        string hours "Jam Operasional"
        string badge "Label Badge"
        string image "URL Gambar Destinasi"
        text deskripsi "Deskripsi Lengkap"
    }

    FAVORIT {
        int id PK "Auto Increment"
        int user_id FK "Relasi ke USERS"
        string destination_id FK "Relasi ke DESTINASI"
        datetime created_at "Tanggal Ditambahkan"
    }

    ULASAN_DESTINASI {
        int id PK "Auto Increment"
        int user_id FK "Relasi ke USERS"
        string destination_id FK "Relasi ke DESTINASI"
        int stars "Bintang (1-5)"
        text comment "Komentar Ulasan"
        datetime created_at "Tanggal Ulasan"
    }

    PEMESANAN_TIKET {
        int id PK "Auto Increment"
        int user_id FK "Relasi ke USERS"
        string destination_id FK "Relasi ke DESTINASI"
        date booking_date "Tanggal Pemesanan"
        date visit_date "Tanggal Kunjungan"
        int ticket_qty "Jumlah Tiket"
        decimal total_price "Total Bayar"
        string status "Status (Pending/Lunas/Batal)"
        datetime created_at "Waktu Transaksi"
    }

    RIWAYAT_AKTIVITAS {
        int id PK "Auto Increment"
        int user_id FK "Relasi ke USERS"
        string title "Judul Aktivitas"
        text deskripsi "Detail Aktivitas"
        string icon "Nama Ikon (e.g. heart, ticket)"
        datetime created_at "Waktu Kejadian"
    }

    TESTIMONI {
        int id PK "Auto Increment"
        int user_id FK "Relasi ke USERS"
        int stars "Bintang (1-5)"
        text isi_testimoni "Pesan Testimoni"
        datetime created_at "Waktu Testimoni"
    }

    KONTAK {
        int id PK "Auto Increment"
        string name "Nama Pengirim"
        string email "Email Pengirim"
        text message "Pesan Hubungi Kami"
        datetime created_at "Waktu Dikirim"
    }

    VIDEO {
        int id PK "Auto Increment"
        string judul "Judul Video"
        string tag "Tag / Kategori Video"
        string link "URL Embed YouTube"
        text deskripsi "Deskripsi Video"
        string destination_id FK "Relasi ke DESTINASI (Opsional)"
    }

    GALLERY {
        int id PK "Auto Increment"
        string nama "Nama Foto"
        string lokasi "Lokasi Foto"
        string gambar "URL File Gambar"
        string destination_id FK "Relasi ke DESTINASI (Opsional)"
    }

    %% Relasi Tabel
    USERS ||--o{ FAVORIT : "menyukai"
    DESTINASI ||--o{ FAVORIT : "disimpan di"
    KATEGORI ||--o{ DESTINASI : "mengelompokkan"
    USERS ||--o{ RIWAYAT_AKTIVITAS : "memiliki log"
    USERS ||--o{ TESTIMONI : "memberikan"
    DESTINASI ||--o{ VIDEO : "memiliki"
    DESTINASI ||--o{ GALLERY : "memiliki foto"
    USERS ||--o{ ULASAN_DESTINASI : "menulis"
    DESTINASI ||--o{ ULASAN_DESTINASI : "menerima"
    USERS ||--o{ PEMESANAN_TIKET : "melakukan"
    DESTINASI ||--o{ PEMESANAN_TIKET : "dipesan"
```

---

## 2. Struktur & Detail Tabel Database

### A. Tabel `users` (Pengguna)
Menyimpan data akun pengguna yang melakukan pendaftaran/masuk pada halaman `LoginRegister.jsx` dan data profil pada `PROFIL.jsx`.

| Kolom | Tipe Data | Atribut | Keterangan |
|---|---|---|---|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | ID unik pengguna |
| `name` | VARCHAR(100) | NOT NULL | Nama lengkap pengguna |
| `username` | VARCHAR(50) | NOT NULL, UNIQUE | Username untuk login |
| `email` | VARCHAR(100) | NOT NULL, UNIQUE | Alamat email aktif |
| `password` | VARCHAR(255) | NOT NULL | Password (terenkripsi) |
| `phone` | VARCHAR(20) | NULL | Nomor WhatsApp/HP |
| `location` | VARCHAR(150) | NULL | Domisili asal pengguna |
| `avatar` | VARCHAR(255) | NULL | URL foto profil pengguna |
| `join_date` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Tanggal pendaftaran |

### B. Tabel `kategori` (Kategori Wisata)
Menyimpan kategori wisata seperti Pantai, Gunung, dan Budaya yang ditampilkan di halaman `KATEGORI.jsx`.

| Kolom | Tipe Data | Atribut | Keterangan |
|---|---|---|---|
| `id` | VARCHAR(50) | PRIMARY KEY | ID unik kategori (e.g. `pantai`, `gunung`) |
| `name` | VARCHAR(100) | NOT NULL | Nama kategori (e.g. `Pantai & Laut`) |
| `circle_class` | VARCHAR(100) | NULL | Class CSS untuk warna latar belakang ikon |

### C. Tabel `destinasi` (Katalog Tempat Wisata)
Menyimpan data tempat pariwisata yang ditampilkan pada katalog halaman `DESTINASI.jsx` dan detailnya di `DETAIL.jsx`.

| Kolom | Tipe Data | Atribut | Keterangan |
|---|---|---|---|
| `id` | VARCHAR(50) | PRIMARY KEY | ID unik destinasi (e.g. `bali`, `bromo`) |
| `name` | VARCHAR(150) | NOT NULL | Nama tempat wisata |
| `location` | VARCHAR(150) | NOT NULL | Provinsi/Kabupaten lokasi wisata |
| `category_id` | VARCHAR(50) | FOREIGN KEY | Relasi ke `kategori.id` |
| `rating` | DECIMAL(2,1) | DEFAULT 0.0 | Rating rata-rata (skala 1.0 - 5.0) |
| `reviews_count`| INT | DEFAULT 0 | Total jumlah ulasan yang masuk |
| `price` | VARCHAR(100) | NULL | Rentang harga tiket masuk (e.g. "Rp 15.000") |
| `hours` | VARCHAR(100) | NULL | Jam operasional buka/tutup |
| `badge` | VARCHAR(50) | NULL | Label teks (e.g. "Terpopuler", "Gunung Berapi") |
| `image` | VARCHAR(255) | NULL | URL link foto utama |
| `desc` | TEXT | NULL | Deskripsi narasi lengkap tempat wisata |

### D. Tabel `favorit` (Wisata Favorit Pengguna)
Menghubungkan pengguna dengan tempat wisata yang mereka tandai sebagai favorit di halaman `FAVORIT.jsx`.

| Kolom | Tipe Data | Atribut | Keterangan |
|---|---|---|---|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | ID unik data favorit |
| `user_id` | INT | FOREIGN KEY | Relasi ke `users.id` |
| `destination_id`| VARCHAR(50)| FOREIGN KEY | Relasi ke `destinasi.id` |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Tanggal ditandai |

### E. Tabel `ulasan_destinasi` (Ulasan & Rating Destinasi)
Menyimpan ulasan bintang dan ulasan teks yang diisi pengguna pada kolom komentar di halaman `DETAIL.jsx`.

| Kolom | Tipe Data | Atribut | Keterangan |
|---|---|---|---|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | ID unik ulasan |
| `user_id` | INT | FOREIGN KEY | Relasi ke `users.id` |
| `destination_id`| VARCHAR(50)| FOREIGN KEY | Relasi ke `destinasi.id` |
| `stars` | INT | CHECK (1-5) | Skor rating (1 sampai 5) |
| `comment` | TEXT | NULL | Teks ulasan/komentar pengunjung |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Tanggal dikirim |

### F. Tabel `pemesanan_tiket` (Transaksi Tiket Wisata)
Menyimpan data riwayat transaksi pembelian tiket wisata oleh pengguna yang diakses pada halaman `RIWAYAT.jsx`.

| Kolom | Tipe Data | Atribut | Keterangan |
|---|---|---|---|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | ID unik tiket/transaksi |
| `user_id` | INT | FOREIGN KEY | Relasi ke `users.id` |
| `destination_id`| VARCHAR(50)| FOREIGN KEY | Relasi ke `destinasi.id` |
| `booking_date` | DATE | NOT NULL | Tanggal melakukan transaksi |
| `visit_date` | DATE | NOT NULL | Tanggal kunjungan wisata |
| `ticket_qty` | INT | NOT NULL | Jumlah tiket yang dibeli |
| `total_price` | DECIMAL(12,2)| NOT NULL | Total biaya pembayaran tiket |
| `status` | VARCHAR(50) | DEFAULT 'Pending' | Status tiket (`Pending`, `Lunas`, `Batal`) |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Waktu pemesanan tercatat |

### G. Tabel `riwayat_aktivitas` (Aktivitas Dashboard)
Menyimpan log aksi pengguna (seperti mengganti foto profil, menyukai destinasi, memesan tiket) untuk ditampilkan di `DASHBOARD.jsx` bagian "Riwayat Aktivitas Terbaru".

| Kolom | Tipe Data | Atribut | Keterangan |
|---|---|---|---|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | ID unik log riwayat |
| `user_id` | INT | FOREIGN KEY | Relasi ke `users.id` |
| `title` | VARCHAR(150) | NOT NULL | Judul ringkasan aktivitas |
| `desc` | TEXT | NULL | Rincian aktivitas |
| `icon` | VARCHAR(50) | NULL | Nama kelas ikon untuk visualisasi |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Waktu terjadinya aktivitas |

### H. Tabel `testimoni` (Ulasan Aplikasi)
Menyimpan feedback/testimoni tentang website secara keseluruhan yang ditampilkan di halaman `TESTIMONI.jsx` atau `HOME.jsx`.

| Kolom | Tipe Data | Atribut | Keterangan |
|---|---|---|---|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | ID unik testimoni |
| `user_id` | INT | FOREIGN KEY | Relasi ke `users.id` |
| `stars` | INT | CHECK (1-5) | Rating untuk website |
| `text` | TEXT | NOT NULL | Pesan ulasan dari pengguna |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Tanggal pengiriman |

### I. Table `kontak` (Pesan Pengunjung)
Menyimpan data formulir pesan yang dikirim oleh pengunjung umum melalui halaman `KONTAK.jsx`.

| Kolom | Tipe Data | Atribut | Keterangan |
|---|---|---|---|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | ID unik pesan masuk |
| `name` | VARCHAR(100) | NOT NULL | Nama pengirim |
| `email` | VARCHAR(100) | NOT NULL | Email pengirim |
| `message` | TEXT | NOT NULL | Isi pesan / saran |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Tanggal pengiriman |

### J. Table `video` (Video Sinematik)
Menyimpan tautan video promosi wisata yang ditampilkan pada halaman `Video.jsx`.

| Kolom | Tipe Data | Atribut | Keterangan |
|---|---|---|---|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | ID unik video |
| `judul` | VARCHAR(150) | NOT NULL | Judul video sinematik |
| `tag` | VARCHAR(50) | NULL | Kategori tag (e.g. Pantai, Budaya) |
| `link` | VARCHAR(255) | NOT NULL | Link embed video YouTube |
| `desc` | TEXT | NULL | Keterangan video singkat |
| `destination_id`| VARCHAR(50)| FOREIGN KEY, NULL | Relasi opsional ke `destinasi.id` |

### K. Table `gallery` (Galeri Foto)
Menyimpan koleksi foto pemandangan wisata Indonesia yang dimuat pada halaman `Gallery.jsx`.

| Kolom | Tipe Data | Atribut | Keterangan |
|---|---|---|---|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | ID unik foto |
| `nama` | VARCHAR(150) | NOT NULL | Nama foto / takarir |
| `lokasi` | VARCHAR(150) | NOT NULL | Lokasi pengambilan foto |
| `gambar` | VARCHAR(255) | NOT NULL | URL file/gambar |
| `destination_id`| VARCHAR(50)| FOREIGN KEY, NULL | Relasi opsional ke `destinasi.id` |

---

## 3. Penjelasan Relasi Antar-Entitas

1. **Relasi Kategori ke Destinasi (`KATEGORI 1 --- N DESTINASI`)**:
   Satu Kategori (e.g. 'Pantai') dapat mengelompokkan banyak Destinasi wisata (e.g. 'Bali', 'Raja Ampat'). Sebaliknya, satu destinasi hanya termasuk dalam satu kategori tertentu. Relasi diikat oleh foreign key `category_id` di tabel `destinasi`.
   
2. **Relasi User ke Favorit (`USERS 1 --- N FAVORIT --- 1 DESTINASI`)**:
   Ini merupakan jembatan relasi *Many-to-Many* antara `USERS` dan `DESTINASI`. Seorang pengguna dapat menyimpan banyak destinasi favorit, dan satu destinasi dapat disukai oleh banyak pengguna.
   
3. **Relasi User ke Ulasan (`USERS 1 --- N ULASAN_DESTINASI --- N DESTINASI`)**:
   Relasi *Many-to-Many* yang mencatat ulasan bintang dan teks dari para pengguna terhadap destinasi wisata yang mereka kunjungi.
   
4. **Relasi User ke Pemesanan Tiket (`USERS 1 --- N PEMESANAN_TIKET --- N DESTINASI`)**:
   Relasi *Many-to-Many* yang mencatat pemesanan tiket masuk destinasi wisata yang dilakukan pengguna, lengkap dengan jumlah tiket dan nominal pembayaran.
   
5. **Relasi User ke Testimoni dan Riwayat (`USERS 1 --- N TESTIMONI` dan `USERS 1 --- N RIWAYAT_AKTIVITAS`)**:
   Relasi *One-to-Many*. Satu pengguna dapat menulis satu testimoni website dan menghasilkan banyak catatan log riwayat aktivitas selama mereka menjelajahi aplikasi.

---

## 4. Cara Menggunakan File `database.sql`

Untuk mengimpor rancangan basis data ini ke dalam server lokal Anda (misal menggunakan XAMPP/phpMyAdmin):
1. Pastikan program **XAMPP** (Apache dan MySQL) sudah berjalan.
2. Buka browser dan pergi ke alamat `http://localhost/phpmyadmin/`.
3. Buat database baru bernama `wisata_indonesia` (atau biarkan script SQL yang membuatnya otomatis).
4. Klik tab **Import** pada bagian atas menu phpMyAdmin.
5. Klik **Choose File** dan pilih file `database.sql` yang berada di folder root proyek ini.
6. Klik **Go** atau **Import** pada bagian bawah halaman.
7. Database beserta tabel, relasi, dan data awal (*seeds*) berhasil dibuat dan siap digunakan jika Anda ingin menghubungkannya dengan API backend Node.js/PHP/Express.
