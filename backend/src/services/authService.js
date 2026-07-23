import api from './api';

const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.data.accessToken) {
        localStorage.setItem('token', response.data.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout,
};

export default authService;