import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiURL && apiURL !== '' ? apiURL : '/api',
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
