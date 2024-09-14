import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (username: string, password: string) =>
  api.post('/users/login', { username, password });

export const register = (username: string, password: string, role: string) =>
  api.post('/users/register', { username, password, role });

export const getPallets = () => api.get('/pallets');

export const createPallet = (jobOrderId: number) =>
  api.post('/pallets', { job_order_id: jobOrderId });

export const getJobOrders = () => api.get('/job-orders');

export const createJobOrder = (orderNumber: string, productName: string, quantity: number) =>
  api.post('/job-orders', { order_number: orderNumber, product_name: productName, quantity });

export const logout = () => {
  localStorage.removeItem('token');
};

export default api;