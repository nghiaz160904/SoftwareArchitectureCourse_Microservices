require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

app.post('/posts', async (req, res) => {
    const { userId, content } = req.body;
    const result = await pool.query(
        'INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *',
        [userId, content]
    );
    res.json(result.rows[0]);
});

app.get('/posts', async (req, res) => {
    const result = await pool.query('SELECT * FROM posts');
    res.json(result.rows);
});

app.listen(4001, () => console.log('Post service on port 4001'));
