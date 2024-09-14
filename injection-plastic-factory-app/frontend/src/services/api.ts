import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Make sure this matches your backend URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const login = (username: string, password: string) =>
  api.post('/users/login', { username, password });

// ... other API functions ...

export default api;