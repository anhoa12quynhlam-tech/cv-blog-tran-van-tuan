/**
 * Blog API service — gọi json-server qua Vite proxy
 *
 * Vite proxy: /api/* → http://localhost:3001/*
 *
 * Endpoints json-server tự sinh từ db.json:
 *   GET    /api/posts          - tất cả bài viết
 *   GET    /api/posts/:id      - 1 bài viết
 *   POST   /api/posts          - tạo mới
 *   PUT    /api/posts/:id      - cập nhật toàn bộ
 *   PATCH  /api/posts/:id      - cập nhật một phần
 *   DELETE /api/posts/:id      - xoá
 *
 * json-server v1 sort syntax: ?_sort=-date (dấu - = descending)
 * json-server v0 sort syntax: ?_sort=date&_order=desc  ← KHÁC NHAU
 */

const BASE = "https://json-db-data.onrender.com";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  // json-server v1: dùng _sort=-date  |  v0: _sort=date&_order=desc
  // Thử v1 trước, nếu lỗi thì context sẽ fallback về db.json local
  getAllPosts: () => request("/posts?_sort=-date"),
  getPost: (id) => request(`/posts/${id}`),
  createPost: (data) =>
    request("/posts", { method: "POST", body: JSON.stringify(data) }),
  updatePost: (id, data) =>
    request(`/posts/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  patchPost: (id, data) =>
    request(`/posts/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deletePost: (id) => request(`/posts/${id}`, { method: "DELETE" }),
};
