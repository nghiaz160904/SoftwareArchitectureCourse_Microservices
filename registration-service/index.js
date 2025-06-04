import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

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

// registration endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // check if username already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    try {
        const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        res.status(201).json({ message: "User registered successfully", user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});
app.listen(4002, () => console.log('Registration service on port 4002'));