// ============================================================
//  Blog API Service
//  Gọi json-server qua Vite proxy: /api → http://localhost:3001
// ============================================================
//
//  Để dùng được, chạy json-server trước:
//    npm run dev:server   (hoặc npm run dev:all để chạy cả 2)
//
//  json-server tự tạo các endpoint từ db.json:
//    GET    /api/posts           → lấy danh sách
//    GET    /api/posts/:id       → lấy 1 bài
//    POST   /api/posts           → tạo mới
//    PUT    /api/posts/:id       → cập nhật toàn bộ
//    DELETE /api/posts/:id       → xoá
// ============================================================

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://json-db-data.onrender.com";

// Helper gọi fetch, ném lỗi nếu response không OK
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`[${response.status}] ${errorText || response.statusText}`);
  }

  // DELETE trả về body rỗng → trả null thay vì parse JSON
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// ── GET /posts ──────────────────────────────────────────────
// Lấy tất cả bài viết, sắp xếp mới nhất lên trước
export function getAllPosts() {
  return request("/posts?_sort=-date");
}

// ── GET /posts/:id ──────────────────────────────────────────
// Lấy chi tiết 1 bài viết theo id
export function getPostById(id) {
  return request(`/posts/${id}`);
}

// ── POST /posts ─────────────────────────────────────────────
// Tạo bài viết mới, json-server tự sinh id
export function createPost(data) {
  return request("/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ── PUT /posts/:id ──────────────────────────────────────────
// Cập nhật toàn bộ bài viết (thay thế hoàn toàn)
export function updatePost(id, data) {
  return request(`/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// ── DELETE /posts/:id ───────────────────────────────────────
// Xoá bài viết theo id
export function deletePost(id) {
  return request(`/posts/${id}`, {
    method: "DELETE",
  });
}
