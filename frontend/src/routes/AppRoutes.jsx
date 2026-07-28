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
import PolicyDetails from '../pages/Policies/PolicyDetails'

import PayPremium from '../pages/Payments/PayPremium';
import OverdueList from '../pages/Payments/OverdueList';
import CustomerPaymentHistory from '../pages/Payments/CustomerPaymentHistory';
import AllPaymentHistory from '../pages/Payments/AllPaymentHistory'

import SubmitClaim from '../pages/Claims/SubmitClaim';
import ManageClaims from '../pages/Claims/ManageClaims';
import MyClaimsById from '../pages/Claims/MyClaimsById';
import MyClaims from '../pages/Claims/MyClaims';
import KYCDocumentForm from '../pages/Customers/KYCDocumentForm';

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


      {/* Customer Management Routes */}
      <Route path="/customers" element={
        <ProtectedRoute allowedRoles={['admin', 'agent']}>
          <CustomerList />
        </ProtectedRoute>
      } />

      <Route path="/customers/create" element={
        <ProtectedRoute allowedRoles={['agent', 'admin']}>
          <CustomerForm />
        </ProtectedRoute>
      } />

      <Route path="/customers/:id" element={
        <ProtectedRoute allowedRoles={['customer', 'admin', 'agent']}>
          <CustomerProfile />
        </ProtectedRoute>
      } />

      <Route path="/customers/edit/:id" element={
        <ProtectedRoute allowedRoles={['admin', 'agent']}>
          <CustomerForm />
        </ProtectedRoute>
      } />

      {/*View all payment history of a customer */}
      <Route
        path="/payments/:customerId"
        element={
          <ProtectedRoute allowedRoles={['customer', 'agent', 'admin']}>
            <AllPaymentHistory />
          </ProtectedRoute>
        }
      />

      {/*Claim Management Routes */}
      <Route path="/claims/my-claims/:id/new-claim" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <SubmitClaim />
        </ProtectedRoute>
      } />

      <Route path="/agent/claims" element={
        <ProtectedRoute allowedRoles={['agent']}>
          <ManageClaims />
        </ProtectedRoute>
      } />

      <Route path="/admin/claims" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <ManageClaims />
        </ProtectedRoute>
      } />

       <Route path="/customer/kyc-document-upload" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <KYCDocumentForm />
        </ProtectedRoute>
      } />

      <Route path="/claims/my-claims/:id" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <MyClaimsById />
        </ProtectedRoute>
      } />

      <Route path="/claims/my-claims" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <MyClaims />
        </ProtectedRoute>
      } />






      {/* Policy Management Routes */}
      <Route path="/policies" element={
        <ProtectedRoute allowedRoles={['customer', 'admin', 'agent']}>
          <PolicyList />
        </ProtectedRoute>
      } />

      <Route path="/policies/new" element={
        <ProtectedRoute allowedRoles={['admin', 'agent']}>
          <PolicyForm />
        </ProtectedRoute>
      } />

      <Route path="/policies/:id" element={
        <ProtectedRoute allowedRoles={['customer', 'admin', 'agent']}>
          <PolicyDetails />
        </ProtectedRoute>
      } />

      <Route path="/policies/edit/:id" element={
        <ProtectedRoute allowedRoles={['admin', 'agent']}>
          <PolicyForm />
        </ProtectedRoute>
      } />


      {/* Customer Protected Routes */}
      <Route path="/policies/:policyId/pay" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <PayPremium />
        </ProtectedRoute>
      } />
      <Route path="/policies/:policyId/payments" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <CustomerPaymentHistory />
        </ProtectedRoute>
      } />

      {/* Admin/Agent Protected Routes */}
      <Route path="/admin/payments/overdue" element={
        <ProtectedRoute allowedRoles={['admin', 'agent']}>
          <OverdueList />
        </ProtectedRoute>
      } />


      {/* Catch-all route: redirect unknown URLs to login */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>

  );
};

export default AppRoutes;


