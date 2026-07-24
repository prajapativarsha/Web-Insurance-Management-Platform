import api from './api'; // Adjust this import based on where your configured Axios instance is

const API_URL = '/policies';

const policyApi = {
    // Get all policies (with optional filters/pagination/search)
    getPolicies: async (params = {}) => {
        const response = await api.get(API_URL, { params });
        return response.data;
    },

    // Get a single policy by ID (includes customers, claims, payments)
    getPolicyById: async (id) => {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    },

    // Create a new policy
    createPolicy: async (policyData) => {
        const response = await api.post(API_URL, policyData);
        return response.data;
    },

    // Update allowed fields on a policy
    updatePolicy: async (id, updateData) => {
        const response = await api.put(`${API_URL}/${id}`, updateData);
        return response.data;
    },

    // Soft cancel a policy
    cancelPolicy: async (id) => {
        const response = await api.delete(`${API_URL}/${id}`);
        return response.data;
    },

    // Renew a policy
    renewPolicy: async (id, renewData) => {
        const response = await api.put(`${API_URL}/${id}/renew`, renewData);
        return response.data;
    }
};

export default policyApi;