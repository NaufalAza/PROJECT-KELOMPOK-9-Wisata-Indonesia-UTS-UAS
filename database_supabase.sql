-- ========================================================
-- Database Schema for Wisata Indonesia (Explore Nusantara)
-- PostgreSQL / Supabase Dialect
-- Kelompok 9 - Pemrograman Web Semester 4
-- File: database_supabase.sql
-- ========================================================

-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS video CASCADE;
DROP TABLE IF EXISTS kontak CASCADE;
DROP TABLE IF EXISTS testimoni CASCADE;
DROP TABLE IF EXISTS riwayat_aktivitas CASCADE;
DROP TABLE IF EXISTS pemesanan_tiket CASCADE;
DROP TABLE IF EXISTS ulasan_destinasi CASCADE;
DROP TABLE IF EXISTS favorit CASCADE;
DROP TABLE IF EXISTS destinasi CASCADE;
DROP TABLE IF EXISTS kategori CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Table: USERS (Pengguna)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    location VARCHAR(150) NULL,
    avatar VARCHAR(255) NULL,
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table: KATEGORI (Category)
CREATE TABLE kategori (
    id VARCHAR(50) PRIMARY KEY, -- e.g., 'pantai', 'gunung', 'budaya'
    name VARCHAR(100) NOT NULL,
    circle_class VARCHAR(100) NULL -- CSS class for icon container styling
);

-- 3. Table: DESTINASI (Tourism Destination)
CREATE TABLE destinasi (
    id VARCHAR(50) PRIMARY KEY, -- e.g., 'bali', 'bromo', 'raja-ampat'
    name VARCHAR(150) NOT NULL,
    location VARCHAR(150) NOT NULL,
    category_id VARCHAR(50) NOT NULL REFERENCES kategori(id) ON DELETE CASCADE ON UPDATE CASCADE,
    rating DECIMAL(2,1) DEFAULT 0.0,
    reviews_count INT DEFAULT 0,
    price VARCHAR(100) NULL,
    hours VARCHAR(100) NULL,
    badge VARCHAR(50) NULL,
    image VARCHAR(255) NULL,
    "desc" TEXT NULL
);

-- 4. Table: FAVORIT (User Bookmarks/Favorites)
CREATE TABLE favorit (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    destination_id VARCHAR(50) NOT NULL REFERENCES destinasi(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_fav UNIQUE (user_id, destination_id)
);

-- 5. Table: ULASAN_DESTINASI (Destination Reviews/Comments)
CREATE TABLE ulasan_destinasi (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    destination_id VARCHAR(50) NOT NULL REFERENCES destinasi(id) ON DELETE CASCADE,
    stars INT NOT NULL CHECK (stars BETWEEN 1 AND 5),
    comment TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Table: PEMESANAN_TIKET (Ticket Bookings)
CREATE TABLE pemesanan_tiket (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    destination_id VARCHAR(50) NOT NULL REFERENCES destinasi(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    visit_date DATE NOT NULL,
    ticket_qty INT NOT NULL CHECK (ticket_qty > 0),
    total_price DECIMAL(12,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Lunas', 'Batal'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Table: RIWAYAT_AKTIVITAS (Activity Logs)
CREATE TABLE riwayat_aktivitas (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    "desc" TEXT NULL,
    icon VARCHAR(50) NULL, -- SVG or Icon class representation
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Table: TESTIMONI (General Website Testimonials)
CREATE TABLE testimoni (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stars INT NOT NULL CHECK (stars BETWEEN 1 AND 5),
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Table: KONTAK (Contact Form submissions)
CREATE TABLE kontak (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Table: VIDEO (Cinematic Videos)
CREATE TABLE video (
    id SERIAL PRIMARY KEY,
    judul VARCHAR(150) NOT NULL,
    tag VARCHAR(50) NULL,
    link VARCHAR(255) NOT NULL, -- YouTube or video URL
    "desc" TEXT NULL,
    destination_id VARCHAR(50) NULL REFERENCES destinasi(id) ON DELETE SET NULL
);

-- 11. Table: GALLERY (Photo Gallery)
CREATE TABLE gallery (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(150) NOT NULL,
    lokasi VARCHAR(150) NOT NULL,
    gambar VARCHAR(255) NOT NULL,
    destination_id VARCHAR(50) NULL REFERENCES destinasi(id) ON DELETE SET NULL
);


-- ========================================================
-- INSERT INITIAL DATA (SEEDS MOCK DATA)
-- ========================================================

-- Insert Users
INSERT INTO users (id, name, username, email, password, phone, location, avatar) VALUES
(1, 'Naufal Aza', 'naufalaza', 'naufal@example.com', 'password123', '08123456789', 'Jakarta', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150'),
(2, 'Kelompok Sembilan', 'kelompok9', 'kelompok9@example.com', 'kelompok9pwd', '08987654321', 'Bandung', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150');

-- Reset SERIAL sequence for users table after manual inserts
SELECT setval(pg_get_serial_sequence('users', 'id'), coalesce(max(id), 1)) FROM users;

-- Insert Kategori
INSERT INTO kategori (id, name, circle_class) VALUES
('pantai', 'Pantai & Laut', 'bg-teal-light'),
('gunung', 'Gunung & Alam', 'bg-orange-light'),
('budaya', 'Budaya & Sejarah', 'bg-blue-light');

-- Insert Destinasi
INSERT INTO destinasi (id, name, location, category_id, rating, reviews_count, price, hours, badge, image, "desc") VALUES
('bali', 'Bali', 'Bali', 'pantai', 4.9, 128, 'Rp 1.5M - 5M', '24 Jam', 'Pantai & Pura', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=500', 'Menyuguhkan pesona pantai berpasir putih, tempat berselancar kelas dunia, serta keunikan budaya tari kecak.'),
('raja-ampat', 'Raja Ampat', 'Papua Barat', 'pantai', 5.0, 42, 'Rp 3M - 8M', '08.00 - 18.00', 'Diving Paradiso', 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=500', 'Kepulauan karst menawan di Papua Barat. Tempat impian bagi penyelam di seluruh dunia dengan kekayaan biota laut terlengkap.'),
('bromo', 'Gunung Bromo', 'Jawa Timur', 'gunung', 4.8, 85, 'Rp 500rb - 1.5M', '03.00 - 17.00', 'Gunung Berapi', 'https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=500', 'Kawah vulkanik aktif yang dikelilingi hamparan pasir luas bertajuk Pasir Berbisik. Sangat pas untuk melihat sunrise.');

-- Insert Favorit
INSERT INTO favorit (id, user_id, destination_id) VALUES
(1, 1, 'bali'),
(2, 1, 'raja-ampat'),
(3, 2, 'bromo');

SELECT setval(pg_get_serial_sequence('favorit', 'id'), coalesce(max(id), 1)) FROM favorit;

-- Insert Ulasan
INSERT INTO ulasan_destinasi (id, user_id, destination_id, stars, comment) VALUES
(1, 1, 'bali', 5, 'Luar biasa indah pantainya dan sunset di Pura Tanah Lot sangat magis!'),
(2, 2, 'bromo', 4, 'Sangat dingin di pagi hari tapi pemandangan sunrise-nya sepadan.');

SELECT setval(pg_get_serial_sequence('ulasan_destinasi', 'id'), coalesce(max(id), 1)) FROM ulasan_destinasi;

-- Insert Pemesanan Tiket
INSERT INTO pemesanan_tiket (id, user_id, destination_id, booking_date, visit_date, ticket_qty, total_price, status) VALUES
(1, 1, 'bali', '2026-06-05', '2026-06-12', 2, 3000000.00, 'Lunas'),
(2, 2, 'bromo', '2026-06-07', '2026-06-20', 3, 1500000.00, 'Pending');

SELECT setval(pg_get_serial_sequence('pemesanan_tiket', 'id'), coalesce(max(id), 1)) FROM pemesanan_tiket;

-- Insert Riwayat Aktivitas
INSERT INTO riwayat_aktivitas (id, user_id, title, "desc", icon) VALUES
(1, 1, 'Menyukai Bali', 'Menambahkan Bali ke daftar favorit Anda.', 'heart'),
(2, 1, 'Pesan Tiket Bali', 'Melakukan pemesanan tiket untuk 2 orang.', 'ticket');

SELECT setval(pg_get_serial_sequence('riwayat_aktivitas', 'id'), coalesce(max(id), 1)) FROM riwayat_aktivitas;

-- Insert Testimoni
INSERT INTO testimoni (id, user_id, stars, text) VALUES
(1, 1, 5, 'Website yang sangat membantu mencari rekomendasi wisata di Indonesia. Tampilannya keren dan responsif!');

SELECT setval(pg_get_serial_sequence('testimoni', 'id'), coalesce(max(id), 1)) FROM testimoni;

-- Insert Video
INSERT INTO video (id, judul, tag, link, "desc", destination_id) VALUES
(1, 'Bali Cinematic Tour', 'Pantai', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Video keindahan pantai dan kebudayaan di Bali.', 'bali'),
(2, 'Raja Ampat Underwater Heaven', 'Diving', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Menyusuri keindahan bawah laut Raja Ampat.', 'raja-ampat');

SELECT setval(pg_get_serial_sequence('video', 'id'), coalesce(max(id), 1)) FROM video;

-- Insert Gallery
INSERT INTO gallery (id, nama, lokasi, gambar, destination_id) VALUES
(1, 'Sunset Pantai Kuta', 'Bali', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=500', 'bali'),
(2, 'Gugusan Karst Raja Ampat', 'Papua Barat', 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=500', 'raja-ampat');

SELECT setval(pg_get_serial_sequence('gallery', 'id'), coalesce(max(id), 1)) FROM gallery;
