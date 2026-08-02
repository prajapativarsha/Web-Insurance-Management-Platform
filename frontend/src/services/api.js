// src/services/api.js
import axios from 'axios';

// Create an Axios instance with your backend's base URL
const API = axios.create({
  baseURL: 'https://web-insurance-management-platform-ytg4.onrender.com/api/v1', // Ensure this matches your backend port
});
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Or wherever you store your token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;