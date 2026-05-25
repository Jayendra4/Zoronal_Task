import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  // If VITE_API_URL is provided, use it. Otherwise, use relative /api for local dev proxy.
  baseURL: apiURL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for easy error handling
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(message);
  }
);

export default axiosInstance;
