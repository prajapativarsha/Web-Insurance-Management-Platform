// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ProtectedRoute from './ProtectedRoute';

// Placeholder components for the dashboards (To be built in later modules)
const AdminDashboard = () => <div className="p-8 mt-16 text-center text-2xl">Admin Dashboard (Under Construction)</div>;
const AgentDashboard = () => <div className="p-8 mt-16 text-center text-2xl">Agent Dashboard (Under Construction)</div>;
const CustomerDashboard = () => <div className="p-8 mt-16 text-center text-2xl">Customer Dashboard (Under Construction)</div>;

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
    </Routes>
  );
};

export default AppRoutes;