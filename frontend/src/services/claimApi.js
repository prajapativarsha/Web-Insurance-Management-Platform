import api from './api.js';

// // Helper to attach the JWT token to requests
// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token'); // Or extract from your AuthContext
//   return { headers: { Authorization: `Bearer ${token}` } };
// };

export const claimApi = {
  // Customer Actions
  submitClaim: async (claimData, id) => {
    const response = await api.post(`/claims/my-claims/${id}/new`, claimData);
    return response.data;
  },
  getMyClaims: async () => {
    const response = await api.get(`/claims/my-claims`);
    return response.data;
  },

  getMyClaimsById : async (id) => {
    const response = await api.get(`/claims/my-claims/${id}`);
    return response.data;
  },

  // Agent/Admin Actions
  getAllClaims: async (status = '') => {
    const query = status ? `?status=${status}` : '';
    const response = await api.get(`/claims/${query}`);
    return response.data;
  },
  getAgentClaims: async () => {
    const response = await api.get(`/claims/review-claims`);
    return response.data;
  },
   assignClaim: async (claim_id, employee_id) => {
    const response = await api.put(`/claims/${claim_id}/assign/${employee_id}`);
    return response.data;
  },
  verifyClaim: async (id) => {
    const response = await api.put(`/claims/${id}/verify`, {});
    return response.data;
  },
  approveClaim: async (id) => {
    const response = await api.put(`/claims/${id}/approve`, {});
    return response.data;
  },
  rejectClaim: async (id, reason) => {
    const response = await api.put(`/claims/${id}/reject`, { rejection_reason: reason });
    return response.data;
  }
};