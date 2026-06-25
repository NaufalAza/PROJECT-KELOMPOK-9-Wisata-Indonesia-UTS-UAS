-- ==========================================
-- Database Schema for Wisata Indonesia (Explore Nusantara)
-- Kelompok 9 - Pemrograman Web Semester 4
-- File: database.sql
-- ==========================================

CREATE DATABASE IF NOT EXISTS wisata_indonesia;
USE wisata_indonesia;

-- 1. Table: USERS (Pengguna)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    join_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    avatar LONGTEXT NULL,
    phone VARCHAR(20) NULL,
    location VARCHAR(150) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Table: KATEGORI (Category)
CREATE TABLE IF NOT EXISTS kategori (
    id VARCHAR(50) PRIMARY KEY, -- e.g., 'pantai', 'gunung', 'budaya'
    name VARCHAR(100) NOT NULL,
    circle_class VARCHAR(100) NULL -- CSS class for icon container styling
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Table: DESTINASI (Tourism Destination)
CREATE TABLE IF NOT EXISTS destinasi (
    id VARCHAR(50) PRIMARY KEY, -- e.g., 'bali', 'bromo', 'raja-ampat'
    name VARCHAR(150) NOT NULL,
    location VARCHAR(150) NOT NULL,
    category_id VARCHAR(50) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0.0,
    reviews_count INT DEFAULT 0,
    price VARCHAR(100) NULL,
    hours VARCHAR(100) NULL,
    badge VARCHAR(50) NULL,
    image VARCHAR(255) NULL,
    `desc` TEXT NULL,
    FOREIGN KEY (category_id) REFERENCES kategori(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Table: FAVORIT (User Bookmarks/Favorites)
CREATE TABLE IF NOT EXISTS favorit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    destination_id VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_fav (user_id, destination_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES destinasi(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Table: ULASAN_DESTINASI (Destination Reviews/Comments)
CREATE TABLE IF NOT EXISTS ulasan_destinasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    destination_id VARCHAR(50) NOT NULL,
    stars INT NOT NULL CHECK (stars BETWEEN 1 AND 5),
    comment TEXT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES destinasi(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Table: PEMESANAN_TIKET (Ticket Bookings)
CREATE TABLE IF NOT EXISTS pemesanan_tiket (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    destination_id VARCHAR(50) NOT NULL,
    booking_date DATE NOT NULL,
    visit_date DATE NOT NULL,
    ticket_qty INT NOT NULL CHECK (ticket_qty > 0),
    total_price DECIMAL(12,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Lunas', 'Batal'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES destinasi(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Table: RIWAYAT_AKTIVITAS (Activity Logs)
CREATE TABLE IF NOT EXISTS riwayat_aktivitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    `desc` TEXT NULL,
    icon VARCHAR(50) NULL, -- SVG or Icon class representation
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Table: TESTIMONI (General Website Testimonials)
CREATE TABLE IF NOT EXISTS testimoni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    stars INT NOT NULL CHECK (stars BETWEEN 1 AND 5),
    text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Table: KONTAK (Contact Form submissions)
CREATE TABLE IF NOT EXISTS kontak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Table: VIDEO (Cinematic Videos)
CREATE TABLE IF NOT EXISTS video (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(150) NOT NULL,
    tag VARCHAR(50) NULL,
    link VARCHAR(255) NOT NULL, -- YouTube or video URL
    `desc` TEXT NULL,
    destination_id VARCHAR(50) NULL,
    FOREIGN KEY (destination_id) REFERENCES destinasi(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Table: GALLERY (Photo Gallery)
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(150) NOT NULL,
    lokasi VARCHAR(150) NOT NULL,
    gambar VARCHAR(255) NOT NULL,
    destination_id VARCHAR(50) NULL,
    FOREIGN KEY (destination_id) REFERENCES destinasi(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ==========================================
-- INSERT INITIAL DATA (SEEDS MOCK DATA)
-- ==========================================

-- Insert Users
INSERT INTO users (name, username, email, password) VALUES
('Naufal Aza', 'naufalaza', 'naufal@example.com', 'password123'),
('Kelompok Sembilan', 'kelompok9', 'kelompok9@example.com', 'kelompok9pwd');

-- Insert Kategori
INSERT INTO kategori (id, name, circle_class) VALUES
('pantai', 'Pantai & Laut', 'bg-teal-light'),
('gunung', 'Gunung & Alam', 'bg-orange-light'),
('budaya', 'Budaya & Sejarah', 'bg-blue-light');

-- Insert Destinasi
INSERT INTO destinasi (id, name, location, category_id, rating, reviews_count, price, hours, badge, image, `desc`) VALUES
('bali', 'Bali', 'Bali', 'pantai', 4.9, 128, 'Rp 20.000', '24 Jam', 'Pantai & Pura', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=500', 'Menyuguhkan pesona pantai berpasir putih, tempat berselancar kelas dunia, serta keunikan budaya tari kecak.'),
('raja-ampat', 'Raja Ampat', 'Papua Barat', 'pantai', 5.0, 42, 'Rp 500.000', '08.00 - 18.00', 'Diving Paradiso', 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=500', 'Kepulauan karst menawan di Papua Barat. Tempat impian bagi penyelam di seluruh dunia dengan kekayaan biota laut terlengkap.'),
('bromo', 'Gunung Bromo', 'Jawa Timur', 'gunung', 4.8, 85, 'Rp 29.000', '03.00 - 17.00', 'Gunung Berapi', 'https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=500', 'Kawah vulkanik aktif yang dikelilingi hamparan pasir luas bertajuk Pasir Berbisik. Sangat pas untuk melihat sunrise.');

-- Insert Favorit
INSERT INTO favorit (user_id, destination_id) VALUES
(1, 'bali'),
(1, 'raja-ampat'),
(2, 'bromo');

-- Insert Ulasan
INSERT INTO ulasan_destinasi (user_id, destination_id, stars, comment) VALUES
(1, 'bali', 5, 'Luar biasa indah pantainya dan sunset di Pura Tanah Lot sangat magis!'),
(2, 'bromo', 4, 'Sangat dingin di pagi hari tapi pemandangan sunrise-nya sepadan.');

-- Insert Pemesanan Tiket
INSERT INTO pemesanan_tiket (user_id, destination_id, booking_date, visit_date, ticket_qty, total_price, status) VALUES
(1, 'bali', '2026-06-05', '2026-06-12', 2, 3000000.00, 'Lunas'),
(2, 'bromo', '2026-06-07', '2026-06-20', 3, 1500000.00, 'Pending');

-- Insert Riwayat Aktivitas
INSERT INTO riwayat_aktivitas (user_id, title, `desc`, icon) VALUES
(1, 'Menyukai Bali', 'Menambahkan Bali ke daftar favorit Anda.', 'heart'),
(1, 'Pesan Tiket Bali', 'Melakukan pemesanan tiket untuk 2 orang.', 'ticket');

-- Insert Testimoni
INSERT INTO testimoni (user_id, stars, text) VALUES
(1, 5, 'Website yang sangat membantu mencari rekomendasi wisata di Indonesia. Tampilannya keren dan responsif!');

-- Insert Video
INSERT INTO video (judul, tag, link, `desc`, destination_id) VALUES
('Bali Cinematic Tour', 'Pantai', '/videos/Bali.mp4', 'Video keindahan pantai dan kebudayaan di Bali.', 'bali'),
('Raja Ampat Underwater Heaven', 'Diving', '/videos/Raja Empat.mp4', 'Menyusuri keindahan bawah laut Raja Ampat.', 'raja-ampat'),
('Bromo Sunrise Majesty', 'Gunung', '/videos/Bromo.mp4', 'Pemandangan menakjubkan matahari terbit di atas kaldera Gunung Bromo.', 'bromo');

-- Insert Gallery
INSERT INTO gallery (nama, lokasi, gambar, destination_id) VALUES
('Sunset Pantai Kuta', 'Bali', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=500', 'bali'),
('Gugusan Karst Raja Ampat', 'Papua Barat', 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=500', 'raja-ampat');
