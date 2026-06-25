import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function initDatabase() {
  console.log('Memulai inisialisasi database...');
  
  // Konfigurasi koneksi tanpa menentukan nama database terlebih dahulu
  // karena database mungkin belum dibuat
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true // Mengizinkan eksekusi banyak query sekaligus
  };

  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Berhasil terhubung ke server MySQL XAMPP.');

    // Baca file database.sql
    const sqlFilePath = path.join(process.cwd(), 'database.sql');
    if (!fs.existsSync(sqlFilePath)) {
      throw new Error(`File database.sql tidak ditemukan di: ${sqlFilePath}`);
    }

    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    console.log('Membaca file database.sql...');

    // Drop database lama agar bersih dan terhindar dari error duplicate entry
    console.log('Menghapus database lama (jika ada)...');
    await connection.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME || 'wisata_indonesia'};`);

    // Eksekusi seluruh isi database.sql
    console.log('Sedang membuat database baru dan tabel-tabel...');
    await connection.query(sqlContent);

    console.log('==================================================');
    console.log('DATABASE BERHASIL DIINISIALISASI & DIHUBUNGKAN!');
    console.log(`Database name: ${process.env.DB_NAME || 'wisata_indonesia'}`);
    console.log('Semua tabel dan data awal (mock data) telah berhasil diimport.');
    console.log('==================================================');

    await connection.end();
  } catch (error) {
    console.error('Gagal menginisialisasi database:');
    console.error(error.message);
    console.log('\nTips Troubleshooting:');
    console.log('1. Pastikan XAMPP (khususnya MySQL/MariaDB) sudah dijalankan (status: Running).');
    console.log('2. Pastikan port MySQL adalah default (3306). Jika tidak, sesuaikan konfigurasi.');
    console.log('3. Periksa file .env untuk memastikan DB_HOST, DB_USER, dan DB_PASSWORD sudah benar.');
  }
}

initDatabase();
