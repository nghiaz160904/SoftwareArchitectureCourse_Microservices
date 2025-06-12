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

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await pool.query('SELECT * FROM "User" WHERE username = $1', [username]);

    if (user.rows.length && user.rows[0].password === password) {
        res.json({ message: "Login success", user: { username: "nghia1" } });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});
app.listen(4001, () => console.log('Auth service on port 4001'));