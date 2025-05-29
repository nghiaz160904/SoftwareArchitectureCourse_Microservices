// src/Login.jsx
import { useState } from "react";
import axios from "axios";

function Login() {
    const [username, setUser] = useState("");
    const [password, setPass] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post(import.meta.env.VITE_AUTH_API + "/login", {
                username,
                password,
            });
            alert("Login success: " + res.data.user.username);
        } catch {
            alert("Login failed");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input onChange={(e) => setUser(e.target.value)} placeholder="username" />
            <input onChange={(e) => setPass(e.target.value)} placeholder="password" type="password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
export default Login;
