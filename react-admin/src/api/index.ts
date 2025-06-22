import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = (username: string, password: string, name: string, mobileNumber: string) =>
  API.post('/signup', { username, password, name, mobileNumber });

export const login = (username: string, password: string) =>
  API.post('/login', { username, password });

export default API; 