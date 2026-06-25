import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connection pool configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'wisata_indonesia'
};

const pool = mysql.createPool(dbConfig);

// Endpoint: Check health
app.get('/api/health', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({ status: 'ok', message: 'Connected to MySQL database' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Endpoint: User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({ error: 'Semua bidang wajib diisi!' });
    }

    // Check if email or username already exists
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Username atau Email sudah terdaftar!' });
    }

    // Insert user
    const [result] = await pool.execute(
      'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)',
      [name, username, email, password]
    );

    res.status(201).json({ message: 'Registrasi berhasil!', userId: result.insertId });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada database saat registrasi.' });
  }
});

// Endpoint: User Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Username/Email dan kata sandi wajib diisi!' });
    }

    // Search user by email or username, and match password
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?',
      [email, email, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Username/Email atau kata sandi salah!' });
    }

    const user = users[0];
    delete user.password; // Don't send back password for security

    res.json({ message: 'Login berhasil!', user });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada database saat login.' });
  }
});

// Endpoint: Update User Avatar
app.post('/api/user/update-avatar', async (req, res) => {
  try {
    const { userId, avatar } = req.body;
    if (!userId || avatar === undefined) {
      return res.status(400).json({ error: 'userId dan avatar wajib diisi!' });
    }

    // Update avatar in database
    await pool.execute(
      'UPDATE users SET avatar = ? WHERE id = ?',
      [avatar, userId]
    );

    // Fetch updated user to send back
    const [users] = await pool.execute(
      'SELECT id, name, username, email, join_date, avatar FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan!' });
    }

    res.json({ message: 'Foto profil berhasil diperbarui!', user: users[0] });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui foto profil.' });
  }
});

// Endpoint: Update User Profile Information
app.post('/api/user/update-info', async (req, res) => {
  try {
    const { userId, name, email, phone, location } = req.body;
    if (!userId || !name || !email) {
      return res.status(400).json({ error: 'userId, Nama, dan Email wajib diisi!' });
    }

    // Check if email is already taken by another user
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE email = ? AND id != ?',
      [email, userId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email sudah digunakan oleh akun lain!' });
    }

    // Update in database
    await pool.execute(
      'UPDATE users SET name = ?, email = ?, phone = ?, location = ? WHERE id = ?',
      [name, email, phone || null, location || null, userId]
    );

    // Fetch updated user to send back
    const [users] = await pool.execute(
      'SELECT id, name, username, email, join_date, avatar, phone, location FROM users WHERE id = ?',
      [userId]
    );

    res.json({ message: 'Profil berhasil diperbarui!', user: users[0] });
  } catch (error) {
    console.error('Error updating profile info:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui informasi profil.' });
  }
});

// Endpoint: Get all destinasi (with optional category filter)
app.get('/api/destinasi', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM destinasi';
    const params = [];

    if (category && category !== 'all') {
      query += ' WHERE category_id = ?';
      params.push(category);
    }

    const [rows] = await pool.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching destinasi:', error);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// Endpoint: Get popular destinasi (limit 3)
app.get('/api/destinasi/popular', async (req, res) => {
  try {
    // Select top 3 ordered by rating descending
    const query = 'SELECT * FROM destinasi ORDER BY rating DESC LIMIT 3';
    const [rows] = await pool.execute(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching popular destinasi:', error);
    res.status(500).json({ error: 'Database error occurred' });
  }
});
// Endpoint: Get single destinasi by ID
app.get('/api/destinasi/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM destinasi WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Destinasi tidak ditemukan' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching single destinasi:', error);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// Endpoint: Get reviews for a destination
app.get('/api/ulasan', async (req, res) => {
  try {
    const { destinationId } = req.query;
    if (!destinationId) {
      return res.status(400).json({ error: 'destinationId is required' });
    }

    const [rows] = await pool.execute(
      'SELECT u.*, us.name as user_name, us.avatar as user_avatar FROM ulasan_destinasi u JOIN users us ON u.user_id = us.id WHERE u.destination_id = ? ORDER BY u.created_at DESC',
      [destinationId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// Endpoint: Post a new review
app.post('/api/ulasan', async (req, res) => {
  try {
    const { userId, destinationId, stars, comment } = req.body;
    if (!userId || !destinationId || !stars || !comment) {
      return res.status(400).json({ error: 'Semua bidang ulasan wajib diisi!' });
    }

    // Insert review
    await pool.execute(
      'INSERT INTO ulasan_destinasi (user_id, destination_id, stars, comment) VALUES (?, ?, ?, ?)',
      [userId, destinationId, stars, comment]
    );

    // Calculate new average rating and review count
    const [stats] = await pool.execute(
      'SELECT COUNT(*) as count, AVG(stars) as avg_stars FROM ulasan_destinasi WHERE destination_id = ?',
      [destinationId]
    );

    const count = stats[0].count;
    const avg = stats[0].avg_stars;

    // Update destinasi
    await pool.execute(
      'UPDATE destinasi SET rating = ?, reviews_count = ? WHERE id = ?',
      [avg, count, destinationId]
    );

    // Get destinasi name for logging
    const [dest] = await pool.execute('SELECT name FROM destinasi WHERE id = ?', [destinationId]);
    const destName = dest[0]?.name || destinationId;

    // Insert activity log
    await pool.execute(
      'INSERT INTO riwayat_aktivitas (user_id, title, `desc`, icon) VALUES (?, ?, ?, ?)',
      [
        userId,
        `Memberikan ulasan di ${destName}`,
        `Menulis ulasan bintang ${stars} mengenai destinasi ${destName}.`,
        'message-square'
      ]
    );

    res.status(201).json({ message: 'Ulasan berhasil ditambahkan!' });
  } catch (error) {
    console.error('Error posting review:', error);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// Endpoint: Get user's favorites list
app.get('/api/favorit', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const [rows] = await pool.execute(
      'SELECT f.id as fav_id, d.* FROM favorit f JOIN destinasi d ON f.destination_id = d.id WHERE f.user_id = ? ORDER BY f.created_at DESC',
      [userId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// Endpoint: Toggle user favorite
app.post('/api/favorit/toggle', async (req, res) => {
  try {
    const { userId, destinationId } = req.body;
    if (!userId || !destinationId) {
      return res.status(400).json({ error: 'userId and destinationId are required' });
    }

    // Check if already favorited
    const [existing] = await pool.execute(
      'SELECT id FROM favorit WHERE user_id = ? AND destination_id = ?',
      [userId, destinationId]
    );

    // Get destinasi name for logging
    const [dest] = await pool.execute('SELECT name FROM destinasi WHERE id = ?', [destinationId]);
    const destName = dest[0]?.name || destinationId;

    if (existing.length > 0) {
      // Remove favorite
      await pool.execute('DELETE FROM favorit WHERE user_id = ? AND destination_id = ?', [
        userId,
        destinationId
      ]);

      // Log activity
      await pool.execute(
        'INSERT INTO riwayat_aktivitas (user_id, title, `desc`, icon) VALUES (?, ?, ?, ?)',
        [
          userId,
          `Menghapus ${destName} dari favorit`,
          `Menghapus destinasi ${destName} dari daftar simpanan liburan Anda.`,
          'heart-off'
        ]
      );

      return res.json({ message: 'Dihapus dari favorit!', isFavorited: false });
    } else {
      // Add favorite
      await pool.execute('INSERT INTO favorit (user_id, destination_id) VALUES (?, ?)', [
        userId,
        destinationId
      ]);

      // Log activity
      await pool.execute(
        'INSERT INTO riwayat_aktivitas (user_id, title, `desc`, icon) VALUES (?, ?, ?, ?)',
        [
          userId,
          `Menambahkan ${destName} ke favorit`,
          `Menandai destinasi ${destName} ke dalam daftar simpanan liburan Anda.`,
          'heart'
        ]
      );

      return res.json({ message: 'Ditambahkan ke favorit!', isFavorited: true });
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// Endpoint: Get user's activity logs
app.get('/api/riwayat', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const [rows] = await pool.execute(
      'SELECT * FROM riwayat_aktivitas WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// Endpoint: Add an activity log
app.post('/api/riwayat', async (req, res) => {
  try {
    const { userId, title, desc, icon } = req.body;
    if (!userId || !title) {
      return res.status(400).json({ error: 'userId dan title wajib diisi!' });
    }

    // Check if user exists to prevent foreign key errors
    const [user] = await pool.execute('SELECT id FROM users WHERE id = ?', [userId]);
    if (user.length === 0) {
      return res.status(400).json({ error: 'User tidak valid atau sesi telah berakhir.' });
    }

    await pool.execute(
      'INSERT INTO riwayat_aktivitas (user_id, title, `desc`, icon) VALUES (?, ?, ?, ?)',
      [userId, title, desc || null, icon || null]
    );

    res.status(201).json({ message: 'Riwayat aktivitas berhasil dicatat!' });
  } catch (error) {
    console.error('Error logging activity:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mencatat riwayat.' });
  }
});

// Endpoint: Get all photo gallery items
app.get('/api/gallery', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM gallery ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// Endpoint: Get all cinematic videos
app.get('/api/video', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM video ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// Endpoint: Get all website testimonials
app.get('/api/testimoni', async (req, res) => {
  try {
    const { userId } = req.query;
    let query = 'SELECT t.*, u.name as user_name, u.avatar as user_avatar FROM testimoni t JOIN users u ON t.user_id = u.id';
    const params = [];
    if (userId) {
      query += ' WHERE t.user_id = ?';
      params.push(userId);
    }
    query += ' ORDER BY t.created_at DESC';
    const [rows] = await pool.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

// Endpoint: Post a website testimonial
app.post('/api/testimoni', async (req, res) => {
  try {
    const { userId, stars, text } = req.body;
    if (!userId || !stars || !text) {
      return res.status(400).json({ error: 'Semua bidang testimoni wajib diisi!' });
    }

    // Insert testimonial
    await pool.execute(
      'INSERT INTO testimoni (user_id, stars, text) VALUES (?, ?, ?)',
      [userId, stars, text]
    );

    // Insert activity log
    await pool.execute(
      'INSERT INTO riwayat_aktivitas (user_id, title, `desc`, icon) VALUES (?, ?, ?, ?)',
      [
        userId,
        'Memberikan testimoni website',
        `Menulis testimoni bintang ${stars} mengenai pengalaman menggunakan website Explore Nusantara.`,
        'message-square'
      ]
    );

    res.status(201).json({ message: 'Testimoni berhasil ditambahkan!' });
  } catch (error) {
    console.error('Error posting testimonial:', error);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
