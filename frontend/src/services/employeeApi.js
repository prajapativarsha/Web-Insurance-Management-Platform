import api from "./api.js";

// Interceptor to automatically attach the JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Create a new employee profile
const createEmployee = async (employeeData) => {
  const response = await api.post("/employees", employeeData);
  return response.data;
};

// Fetch all employees (with optional search query)
const getEmployeeList = async (searchQuery = "") => {
  const response = await api.get(`/employees?search=${searchQuery}`);
  return response.data;
};

// Fetch a single employee by ID (including history)
const getEmployee = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return response.data;
};

// Update an existing employee profile
const updateEmployee = async (id, employeeData) => {
  const response = await api.put(`/employees/${id}`, employeeData);
  return response.data;
};

// Deactivate a employee account
const deactivateEmployee = async (id) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};

const employeeApi = {
  getEmployeeList,
  getEmployee,
  createEmployee,
  updateEmployee,
  deactivateEmployee,
};

export default employeeApi;
