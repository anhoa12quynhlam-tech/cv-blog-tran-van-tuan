import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { api } from "../services/api";

// ─── Fallback data đọc thẳng từ db.json ────────────────────────────────────
// Đây là bản copy của db.json — dùng khi json-server chưa chạy.
// Khi json-server chạy, data thật từ API sẽ ghi đè lên.
import DB_FALLBACK from "../../db.json";

const BlogContext = createContext(null);

export function BlogProvider({ children }) {
  // Khởi tạo ngay bằng data db.json — UI không bao giờ trắng
  const [posts, setPosts] = useState(DB_FALLBACK.posts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serverOnline, setServerOnline] = useState(false);

  // ── Fetch từ json-server, fallback về db.json nếu lỗi ──────────────────
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAllPosts();
      // json-server có thể trả về [] nếu db rỗng — giữ fallback lúc đó
      if (Array.isArray(data)) {
        setPosts(data);
      }
      setServerOnline(true);
    } catch (err) {
      // json-server chưa chạy → dùng fallback db.json, không báo lỗi to
      console.warn(
        "[BlogContext] json-server offline, dùng db.json local:",
        err.message,
      );
      setPosts(DB_FALLBACK.posts);
      setServerOnline(false);
      setError(
        "json-server chưa chạy — đang hiển thị dữ liệu offline từ db.json",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const getPost = (id) => posts.find((p) => String(p.id) === String(id));

  const createPost = async (formData) => {
    const payload = {
      ...formData,
      date: new Date().toISOString().split("T")[0],
      readTime: `${Math.max(1, Math.ceil(formData.content.split(" ").length / 200))} min`,
    };

    if (serverOnline) {
      const created = await api.createPost(payload);
      setPosts((prev) => [created, ...prev]);
      return created;
    } else {
      // Offline: chỉ cập nhật state, không ghi vào file
      const created = { ...payload, id: String(Date.now()) };
      setPosts((prev) => [created, ...prev]);
      return created;
    }
  };

  const updatePost = async (id, formData) => {
    const existing = getPost(id);
    const payload = {
      ...existing,
      ...formData,
      readTime: `${Math.max(1, Math.ceil(formData.content.split(" ").length / 200))} min`,
    };

    if (serverOnline) {
      const updated = await api.updatePost(id, payload);
      setPosts((prev) =>
        prev.map((p) => (String(p.id) === String(id) ? updated : p)),
      );
      return updated;
    } else {
      setPosts((prev) =>
        prev.map((p) => (String(p.id) === String(id) ? payload : p)),
      );
      return payload;
    }
  };

  const deletePost = async (id) => {
    if (serverOnline) await api.deletePost(id);
    setPosts((prev) => prev.filter((p) => String(p.id) !== String(id)));
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        loading,
        error,
        serverOnline,
        getPost,
        createPost,
        updatePost,
        deletePost,
        refetch: fetchPosts,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error("useBlog must be used within BlogProvider");
  return ctx;
}
