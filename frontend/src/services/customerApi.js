import api from './api';

// Interceptor to automatically attach the JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Fetch all customers (with optional search query)
const getCustomers = async (searchQuery = '') => {
    const response = await api.get(`/customers?search=${searchQuery}`);
    return response.data;
};

// Fetch a single customer by ID (including history)
const getCustomerById = async (id) => {
    const response = await api.get(`/customers/${id}`);
    return response.data;
};

// Create a new customer profile
const createCustomer = async (customerData) => {
    const response = await api.post('/customers', customerData);
    return response.data;
};
const uploadKYCDocument = async (data) =>{
    const response = await api.post('/customers/kyc-document-upload',data);
    return response.data;
}

// Update an existing customer profile
const updateCustomer = async (id, customerData) => {
    const response = await api.put(`/customers/${id}`, customerData);
    return response.data;
};

// Deactivate a customer account
const deactivateCustomer = async (id) => {
    const response = await api.delete(`/customers/${id}`);
    return response.data;
};

const customerApi = {
    getCustomers,
    getCustomerById,
    createCustomer,
    uploadKYCDocument,
    updateCustomer,
    deactivateCustomer,
};

export default customerApi;