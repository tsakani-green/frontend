// frontend/src/lib/api.js
import axios from "axios";

const rawBase =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8002"; // dev fallback only

const API_BASE = rawBase.replace(/\/+$/, ""); // trim trailing slash

export function makeClient(getToken) {
  const client = axios.create({
    baseURL: API_BASE,
    timeout: 30000,
  });

  client.interceptors.request.use((config) => {
    const token = getToken?.();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return client;
}

export { API_BASE };

