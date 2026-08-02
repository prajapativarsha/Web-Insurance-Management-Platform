// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  // If the user is not logged in, redirect them to the login screen
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If the route is restricted by role and the user's role doesn't match, redirect them
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // For now, if they try to access the wrong dashboard, boot them back to login
    return <Navigate to="/" replace />; 
  }

  // If authenticated and authorized, render the requested component
  return children;
};

export default ProtectedRoute;