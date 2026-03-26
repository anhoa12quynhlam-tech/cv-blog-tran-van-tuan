import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAllPosts,
  getPostById,
  createPost  as apiCreate,
  updatePost  as apiUpdate,
  deletePost  as apiDelete,
} from '../services/api';

// ============================================================
//  BlogContext — quản lý state bài viết, gọi API thật
// ============================================================

const BlogContext = createContext(null);

export function BlogProvider({ children }) {
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);  // đang fetch lần đầu
  const [error,   setError]   = useState(null);  // lỗi kết nối server

  // ── 1. GET /posts — tải danh sách khi app khởi động ───────
  useEffect(() => {
    fetchAllPosts();
  }, []);

  async function fetchAllPosts() {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPosts();          // GET /api/posts
      setPosts(data);
    } catch (err) {
      setError(err.message);
      console.error('GET /posts thất bại:', err.message);
    } finally {
      setLoading(false);
    }
  }

  // ── 2. GET /posts/:id — tìm trong state hiện có ───────────
  // (không cần fetch lại nếu đã có trong danh sách)
  function getPost(id) {
    return posts.find((p) => String(p.id) === String(id)) ?? null;
  }

  // ── 3. POST /posts — tạo bài mới ──────────────────────────
  async function addPost(formData) {
    const payload = {
      ...formData,
      date:     new Date().toISOString().split('T')[0],
      readTime: `${Math.max(1, Math.ceil(formData.content.split(' ').length / 200))} min`,
    };

    const created = await apiCreate(payload);   // POST /api/posts
    setPosts((prev) => [created, ...prev]);     // cập nhật state ngay
    return created;
  }

  // ── 4. PUT /posts/:id — cập nhật bài ──────────────────────
  async function editPost(id, formData) {
    const existing = getPost(id);
    const payload  = {
      ...existing,
      ...formData,
      readTime: `${Math.max(1, Math.ceil(formData.content.split(' ').length / 200))} min`,
    };

    const updated = await apiUpdate(id, payload); // PUT /api/posts/:id
    setPosts((prev) =>
      prev.map((p) => String(p.id) === String(id) ? updated : p)
    );
    return updated;
  }

  // ── 5. DELETE /posts/:id — xoá bài ────────────────────────
  async function removePost(id) {
    await apiDelete(id);                        // DELETE /api/posts/:id
    setPosts((prev) => prev.filter((p) => String(p.id) !== String(id)));
  }

  return (
    <BlogContext.Provider
      value={{
        posts,
        loading,
        error,
        // CRUD
        getPost,
        createPost: addPost,
        updatePost: editPost,
        deletePost: removePost,
        refetch:    fetchAllPosts,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error('useBlog phải được dùng bên trong <BlogProvider>');
  return ctx;
}
