import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const VITE_API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL || "http://localhost:4000";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch(VITE_API_GATEWAY_URL + "/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                throw new Error("Đăng nhập thất bại");
            }
            const data = await response.json();
            localStorage.setItem("user", username);
            onLogin && onLogin(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: "auto", padding: 20 }}>
            <h2>Login</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </div>
            <div style={{ marginTop: 10 }}>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" style={{ marginTop: 20 }}>Login</button>
            <div style={{ marginTop: 10 }}>
                <a
                    href="/register"
                    style={{ textDecoration: "none", color: "blue" }}
                >
                    Register
                </a>
            </div>
        </form>
    );
}

export default Login;