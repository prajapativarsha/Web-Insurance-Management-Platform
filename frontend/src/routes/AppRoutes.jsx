// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

import CustomerList from '../pages/Customers/CustomerList.jsx';
import CustomerProfile from '../pages/Customers/CustomerProfile.jsx';
import CustomerForm from '../pages/Customers/CustomerForm.jsx';

// Dashboard Pages (Protected)
import AdminDashboard from '../pages/Dashboards/AdminDashboard.jsx';
import AgentDashboard from '../pages/Dashboards/AgentDashboard.jsx';
import CustomerDashboard from '../pages/Dashboards/CustomerDashboard.jsx';

import PolicyList from '../pages/Policies/PolicyList.jsx';
import PolicyForm from '../pages/Policies/PolicyForm.jsx';
import PolicyDetails from '../pages/Policies/PolicyDetails.jsx'

import PayPremium from '../pages/Payments/PayPremium.jsx';
import OverdueList from '../pages/Payments/OverdueList.jsx';
import CustomerPaymentHistory from '../pages/Payments/CustomerPaymentHistory.jsx';
import AllPaymentHistory from '../pages/Payments/AllPaymentHistory.jsx'

import SubmitClaim from '../pages/Claims/SubmitClaim.jsx';
import ManageClaims from '../pages/Claims/ManageClaims.jsx';
import MyClaimsById from '../pages/Claims/MyClaimsById.jsx';
import MyClaims from '../pages/Claims/MyClaims.jsx';
import KYCDocumentForm from '../pages/Customers/KYCDocumentForm.jsx';

import EmployeeList from '../pages/Employees/EmployeeList.jsx';
import EmployeeForm from '../pages/Employees/EmployeeForm.jsx';
import EmployeeProfile from '../pages/Employees/EmployeeProfile.jsx';
import AssignClaims from '../pages/Claims/AssignClaims.jsx';
import AssignClaimTo from '../pages/Claims/AssignClaimTo.jsx';


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

      {/* Employee Management Routes */}
       <Route path="/employees/create" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <EmployeeForm />
        </ProtectedRoute>
      } />

      <Route path="/employees" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <EmployeeList />
        </ProtectedRoute>
      } />

      <Route path="/employees/:id" element={
        <ProtectedRoute allowedRoles={[ 'admin', 'agent']}>
          <EmployeeProfile />
        </ProtectedRoute>
      } />



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

      <Route
        path="/payments/:customerId"
        element={
          <ProtectedRoute allowedRoles={['customer', 'agent', 'admin']}>
            <AllPaymentHistory />
          </ProtectedRoute>
        } />

      <Route path="/policies/:policyId/pay" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <PayPremium />
        </ProtectedRoute>
      } />

      <Route path="/policies/:policyId/payments" element={
        <ProtectedRoute allowedRoles={['customer', 'agent', 'admin']}>
          <CustomerPaymentHistory />
        </ProtectedRoute>
      } />



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
          <AssignClaims  />
        </ProtectedRoute>
      } />

       <Route path="/admin/claim/:id/assign_claim" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AssignClaimTo />
        </ProtectedRoute>
      } />

       <Route path="/customer/kyc-document-upload" element={
        <ProtectedRoute allowedRoles={['customer']}>
          <KYCDocumentForm />
        </ProtectedRoute>
      } />

      <Route path="/claims/my-claims/:id" element={
        <ProtectedRoute allowedRoles={['customer', 'agent', 'admin']}>
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


