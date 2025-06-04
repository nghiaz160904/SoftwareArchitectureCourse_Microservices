import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Post from "./components/Post";
import Register from "./components/Register";

function LoginPage() {
  const navigate = useNavigate();
  const handleLogin = () => {
    // Sau khi đăng nhập thành công, chuyển hướng sang /posts
    navigate("/posts");
  };
  return <Login onLogin={handleLogin} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/register" element={<Register />} />
        {/* Thêm các route khác nếu cần */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;