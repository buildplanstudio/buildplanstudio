// Single place that talks to the backend. In dev, Vite proxies /api to port 5000.
// In production set VITE_API_URL (e.g. https://api.yourdomain.com) at build time.
const BASE = import.meta.env.VITE_API_URL || "";

export function getToken() {
  return localStorage.getItem("bps_token");
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth && getToken()) headers.Authorization = `Bearer ${getToken()}`;

  const res = await fetch(`${BASE}/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  return data;
}

export const api = {
  services: () => request("/services"),
  pricing: () => request("/pricing"),
  contact: (body) => request("/contact", { method: "POST", body }),
  signup: (body) => request("/auth/signup", { method: "POST", body }),
  login: (body) => request("/auth/login", { method: "POST", body }),
  me: () => request("/auth/me", { auth: true }),
  projects: () => request("/projects", { auth: true }),
  createProject: (body) => request("/projects", { method: "POST", body, auth: true }),
  updateStatus: (id, body) => request(`/projects/${id}/status`, { method: "PATCH", body, auth: true }),
};
