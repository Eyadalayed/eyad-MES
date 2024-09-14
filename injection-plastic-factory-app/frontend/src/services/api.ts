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

export const getJobOrders = () => api.get('/job-orders');

export const createJobOrder = (orderData: {
  order_number: string;
  product_name: string;
  quantity: number;
  due_date: string;
  special_instructions?: string;
}) => api.post('/job-orders', orderData);

export const getJobOrderById = (id: string) => api.get(`/job-orders/${id}`);

export const updateJobOrderStatus = (id: string, status: string) =>
  api.patch(`/job-orders/${id}/status`, { status });

export const getJobOrderProgress = (id: string) => api.get(`/job-orders/${id}/progress`);

export const getPallets = () => api.get('/pallets');

export const createPallet = (jobOrderId: number) =>
  api.post('/pallets', { job_order_id: jobOrderId });

export const logout = () => {
  localStorage.removeItem('token');
};


export default api;