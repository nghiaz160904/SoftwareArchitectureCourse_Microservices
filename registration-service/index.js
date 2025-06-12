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

// registration endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // check if username already exists
    const existingUser = await pool.query('SELECT * FROM "User" WHERE username = $1', [username]);
    if (existingUser.rows.length) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    try {
        const result = await pool.query('INSERT INTO "User" (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        res.status(201).json({ message: "User registered successfully", user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});
app.listen(4003, () => console.log('Registration service on port 4003'));