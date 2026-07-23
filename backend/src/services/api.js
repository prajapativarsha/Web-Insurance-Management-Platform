import axios from 'axios';

const api = axios.create({
    // Ensure this matches your Node.js backend port
    baseURL: 'http://localhost:3000/api/v1', 
    headers: {
        'Content-Type': 'application/json',
    },
});

// We will add interceptors here later to automatically attach the JWT token
export default api;