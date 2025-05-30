require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "auth_db",
    password: process.env.DB_PASS || "password",
    port: "5432" || process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

app.post('/posts', async (req, res) => {
    try {
        const { username, title, content } = req.body;

        const result = await pool.query(
            'INSERT INTO posts (username, title, content) VALUES ($1, $2, $3) RETURNING *',
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
        const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách bài viết' });
    }
});

app.listen(4001, () => console.log('Post service on port 4001'));
