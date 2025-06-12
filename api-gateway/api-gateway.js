import express from "express";
import axios from "axios";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tạo HTTP agent để reuse kết nối
const keepAliveAgent = new http.Agent({ keepAlive: true });
const axiosInstance = axios.create({ httpAgent: keepAliveAgent });

// Service URLs
const services = {
    auth: process.env.AUTH_SERVICE_URL || "http://localhost:4001",
    post: process.env.POST_SERVICE_URL || "http://localhost:4002",
    register: process.env.REGISTER_SERVICE_URL || "http://localhost:4003",
};

// Hàm helper để forward mọi method
async function forward(req, res, targetBase) {
    try {
        const url = `${targetBase}${req.originalUrl}`;
        const options = {
            url,
            method: req.method,
            headers: {
                // loại bỏ header host để tránh lỗi
                ...req.headers,
                host: undefined
            },
            data: req.body,
            // giữ agent để reuse socket
            httpAgent: keepAliveAgent,
        };
        const resp = await axiosInstance.request(options);
        // chuyển nguyên status, headers, data về client
        res
            .status(resp.status)
            .set(resp.headers)
            .send(resp.data);
    } catch (err) {
        if (err.response) {
            // nếu backend trả lỗi, đẩy nguyên lỗi về client
            return res
                .status(err.response.status)
                .set(err.response.headers)
                .send(err.response.data);
        }
        console.error("Gateway error:", err.message);
        res.status(502).json({ error: "Bad Gateway" });
    }
}

// Áp dụng cho tất cả method tại /login, /register, /posts
app.all("/login", (req, res) => forward(req, res, services.auth));
app.all("/register", (req, res) => forward(req, res, services.register));
app.all("/posts", (req, res) => forward(req, res, services.post));

// Health endpoints
app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/gateway-health", (_req, res) =>
    res.json({ message: "Gateway up", services })
);

// Khởi động
const PORT = process.env.API_GATEWAY_PORT || 4000;
app.listen(PORT, () => console.log(`API Gateway listening on ${PORT}`));
