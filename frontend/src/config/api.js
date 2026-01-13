import axios from "axios";

// Get the API URL from environment variables
// In development: http://localhost:5000
// In production: your deployed backend URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create axios instance with base URL
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add request interceptor to automatically add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { API_URL };
export default api;
