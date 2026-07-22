// src/services/api.js
import axios from 'axios';

// Create an Axios instance with your backend's base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Ensure this matches your backend port
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;