// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ProtectedRoute from './ProtectedRoute';

import CustomerList from '../pages/Customers/CustomerList';
import CustomerProfile from '../pages/Customers/CustomerProfile';
import CustomerForm from '../pages/Customers/CustomerForm';

// Dashboard Pages (Protected)
import AdminDashboard from '../pages/Dashboards/AdminDashboard';
import AgentDashboard from '../pages/Dashboards/AgentDashboard';
import CustomerDashboard from '../pages/Dashboards/CustomerDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Agent Routes */}
      <Route
        path="/agent/dashboard"
        element={
          <ProtectedRoute allowedRoles={['agent']}>
            <AgentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Customer Routes */}
      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route: redirect unknown URLs to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
      
      {/* Customer management routes */}
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/customers/create" element={<CustomerForm />} />
      <Route path="/customers/:id" element={<CustomerProfile />} />
      <Route path="/customers/edit/:id" element={<CustomerForm />} />


    </Routes>



  );
};

export default AppRoutes;