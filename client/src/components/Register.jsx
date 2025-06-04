import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const REGISTER_SERVICE_URL = import.meta.env.VITE_REGISTER_SERVICE_URL || "http://localhost:4000";

function Register({ onRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(REGISTER_SERVICE_URL + "/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            if (response.status === 400) {
                const data = await response.json();
                setError(data.message || "Username already exists");
                return;
            }
            if (!response.ok) {
                throw new Error("Registration failed");
            }
            const data = await response.json();
            setSuccess("Registration successful!");
            onRegister && onRegister(data);

            // Navigate to login page after successful registration
            setTimeout(() => navigate("/login"), 2000); // Optional delay for user to see success message
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: "auto", padding: 20 }}>
            <h2>Register</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {success && <div style={{ color: "green" }}>{success}</div>}
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
            <div style={{ marginTop: 10 }}>
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" style={{ marginTop: 20 }}>Register</button>
            <div style={{ marginTop: 10 }}>
                <a
                    href="/login"
                    style={{ textDecoration: "none", color: "blue" }}
                >
                    Back to Login
                </a>
            </div>
        </form>
    );
}

export default Register;