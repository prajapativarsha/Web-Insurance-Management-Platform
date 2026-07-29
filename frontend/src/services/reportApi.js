import API from './api';

const API_URL = '/reports'; 

// Fetch Dashboard Summary KPIs
export const fetchDashboardSummary = async () => {
  const response = await API.get(`${API_URL}/dashboard/summary`);
  return response.data;
};

// Fetch Policy Sales Data
export const fetchPolicySales = async () => {
  const response = await API.get(`${API_URL}/policy-sales`);
  return response.data;
};

// Fetch Premium Collections Data
export const fetchPremiumCollections = async () => {
  const response = await API.get(`${API_URL}/premium-collections`);
  return response.data;
};

// Fetch Claims Statistics
export const fetchClaimsStats = async () => {
  const response = await API.get(`${API_URL}/claims-stats`);
  return response.data;
};