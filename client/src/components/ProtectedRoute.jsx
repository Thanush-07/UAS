// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = Cookies.get('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (adminOnly && decoded.role !== 'admin') {
      return <Navigate to="/profile" replace />;
    }
    return children;
  } catch (error) {
    console.error("Invalid token:", error);
    Cookies.remove('token');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
