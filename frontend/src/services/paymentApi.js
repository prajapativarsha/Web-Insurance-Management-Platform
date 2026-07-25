// frontend/src/services/paymentApi.js
import api from './api';

export const paymentApi = {
  // Customer: Record a payment
  createPayment: async (policyId, paymentData) => {
    const response = await api.post(`/policies/${policyId}/payments`, paymentData );
    return response.data;
  },

  // Customer/Admin/Agent: Get history for a policy
  getPaymentHistory: async (policyId) => {
    const response = await api.get(`/policies/${policyId}/payments`);
    return response.data;
  },

  // Admin/Agent: Update payment status
  updateStatus: async (paymentId, status) => {
    const response = await api.patch(`/payments/${paymentId}/status`, { status });
    return response.data;
  },

  // Admin/Agent: Get overdue policies
  getOverduePremiums: async () => {
    const response = await api.get(`/payments/overdue`);
    return response.data;
  },
  
  // To get a payment history of a customer
  getCustomerPaymentHistory: async (customerId) => {
    const response = await api.get(`/payments/${customerId}`, { status });
    return response.data;
  }
  
};

