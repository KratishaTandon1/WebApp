import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const userInfo = localStorage.getItem('userInfo');

  // If user is not logged in, redirect to /login
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, show the child route (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;