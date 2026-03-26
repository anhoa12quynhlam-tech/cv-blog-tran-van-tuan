const BASE =
  import.meta.env.VITE_API_URL || "https://json-db-data.onrender.com";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API ${res.status}`);
  }

  return await res.json();
}

export const api = {
  // json-server v1: dùng _sort=-date  |  v0: _sort=date&_order=desc
  // Thử v1 trước, nếu lỗi thì context sẽ fallback về db.json local
  getAllPosts: () => request("/posts?_sort=date&_order=desc"),
  getPost: (id) => request(`/posts/${id}`),
  createPost: (data) =>
    request("/posts", { method: "POST", body: JSON.stringify(data) }),
  updatePost: (id, data) =>
    request(`/posts/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  patchPost: (id, data) =>
    request(`/posts/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deletePost: (id) => request(`/posts/${id}`, { method: "DELETE" }),
};
