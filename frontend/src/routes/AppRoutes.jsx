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

import PolicyList from '../pages/Policies/PolicyList';
import PolicyForm from '../pages/Policies/PolicyForm';

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

      {/* <Route path="/policies" element={<PolicyList />} />
      <Route path="/policies/new" element={<PolicyForm />} /> */}

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


      {/* Customer Management Routes */}
      <Route path="/customers" element={
        <ProtectedRoute allowedRoles={['admin','agent']}>
          <CustomerList />
        </ProtectedRoute>
      } />

      <Route path="/customers/create" element={
        <ProtectedRoute allowedRoles={['agent','admin']}>
          <CustomerForm />
        </ProtectedRoute>
      } />

      <Route path="/customers/:id" element={
        <ProtectedRoute allowedRoles={['customer','admin','agent']}>
          <CustomerProfile />
        </ProtectedRoute>
      } />

      <Route path="/customers/edit/:id" element={
        <ProtectedRoute allowedRoles={['customer','admin','agent']}>
          <CustomerForm />
        </ProtectedRoute>
      } />

      {/* Policy Management Routes */}
      <Route path="/policies" element={
        <ProtectedRoute allowedRoles={['customer','admin','agent']}>
          <PolicyList />
        </ProtectedRoute>
      } />

      <Route path="/policies/new" element={
        <ProtectedRoute allowedRoles={['admin','agent']}>
          <PolicyForm />
        </ProtectedRoute>
      } />

    </Routes>



  );
};

export default AppRoutes;


