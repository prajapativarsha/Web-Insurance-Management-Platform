// src/services/authService.js
import API from './api';

const authService = {
  /**
   * Register a new customer
   * @param {Object} data - { name, email, phone, dob, password }
   */
  register: async (data) => {
    const response = await API.post('/auth/register', data);
    return response.data;
  },

  /**
   * Login user
   * @param {Object} data - { email, password }
   */
  login: async (data) => {
    const response = await API.post('/auth/login', data);
    return response.data; // This will return the JWT and user info
  },

  /**
   * Logout user and clear local data
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default authService;