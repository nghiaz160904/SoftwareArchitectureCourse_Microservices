require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
    // Nếu có DATABASE_URL, dùng nó; còn không, fallback về các biến riêng lẻ
    connectionString: process.env.DATABASE_URL ||
        `postgresql://${process.env.DB_USER || "postgres"}:` +
        `${process.env.DB_PASS || "password"}@` +
        `${process.env.DB_HOST || "localhost"}:` +
        `${process.env.DB_PORT || 5432}/` +
        `${process.env.DB_NAME || "auth_db"}`,
    ssl: {
        rejectUnauthorized: false
    }
});

app.post('/posts', async (req, res) => {
    try {
        const { username, title, content } = req.body;

        const result = await pool.query(
            'INSERT INTO "Post" (author, title, content) VALUES ($1, $2, $3) RETURNING *',
            [username, title, content]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi tạo bài viết' });
    }
});

// Lấy tất cả bài viết
app.get('/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Post" ORDER BY "createdAt" DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách bài viết' });
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});
app.listen(4002, () => console.log('Post service on port 4002'));
