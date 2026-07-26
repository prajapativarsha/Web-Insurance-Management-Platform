import api from './api';

// Helper to attach the JWT token to requests
const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // Or extract from your AuthContext
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const claimApi = {
  // Customer Actions
  submitClaim: async (claimData, id) => {
    const response = await api.post(`/claims/my-claims/${id}/new`, claimData, getAuthHeaders());
    return response.data;
  },
  getMyClaims: async () => {
    const response = await api.get(`/claims/my-claims`, getAuthHeaders());
    return response.data;
  },

  getMyClaimsById : async (id) => {
    const response = await api.get(`/claims/my-claims/${id}`, getAuthHeaders());
    return response.data;
  },

  // Agent/Admin Actions
  getAllClaims: async (status = '') => {
    const query = status ? `?status=${status}` : '';
    const response = await api.get(`${query}`, getAuthHeaders());
    return response.data;
  },
  verifyClaim: async (id) => {
    const response = await api.put(`/${id}/verify`, {}, getAuthHeaders());
    return response.data;
  },
  approveClaim: async (id) => {
    const response = await api.put(`/${id}/approve`, {}, getAuthHeaders());
    return response.data;
  },
  rejectClaim: async (id, reason) => {
    const response = await api.put(`/${id}/reject`, { rejection_reason: reason }, getAuthHeaders());
    return response.data;
  }
};