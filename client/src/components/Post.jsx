import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Post() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Kiểm tra đăng nhập
    useEffect(() => {
        if (!localStorage.getItem("user")) {
            navigate("/");
        }
    }, [navigate]);

    // Lấy danh sách bài viết
    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:4001/posts");
            if (!response.ok) {
                throw new Error("Không thể lấy danh sách bài viết");
            }
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("user")) return;
        fetchPosts();
    }, []);

    // Xử lý logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    // Xử lý tạo bài viết mới
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await fetch("http://localhost:4001/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: localStorage.getItem("user"),
                    title,
                    content,
                    created_at: Date.now()
                }),
            });
            if (!response.ok) {
                throw new Error("Không thể tạo bài viết");
            }
            setTitle("");
            setContent("");
            fetchPosts();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Danh sách bài viết</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>
            {/* Form tạo bài viết mới */}
            <form onSubmit={handleSubmit} style={{ marginBottom: 24, border: "1px solid #eee", padding: 16, borderRadius: 8 }}>
                <div>
                    <input
                        type="text"
                        placeholder="Tiêu đề"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        style={{ width: "100%", marginBottom: 8, padding: 8 }}
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Nội dung"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                        style={{ width: "100%", marginBottom: 8, padding: 8 }}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Đang đăng..." : "Đăng bài"}
                </button>
            </form>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <ul style={{ listStyle: "none", padding: 0 }}>
                {posts.map((post) => (
                    <li key={post.id} style={{ border: "1px solid #ccc", marginBottom: 16, padding: 12, borderRadius: 8 }}>
                        <div style={{ fontWeight: "bold" }}>{post.title}</div>
                        <div>{post.content}</div>
                        <div style={{ fontSize: 13, color: "#555" }}>
                            Đăng bởi: <b>{post.username}</b> | {new Date(post.created_at).toLocaleString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Post;