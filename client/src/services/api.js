// src/services/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  // IMPORTANT: Replace with your actual backend URL
  baseURL: 'https://your-backend-api.vercel.app/api', 
});

// Request interceptor to add the token to headers
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
