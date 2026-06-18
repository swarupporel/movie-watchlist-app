import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const GuestRoute: React.FC = () => {
  const { userEmail } = useAuth();
  return userEmail ? <Navigate to="/" replace /> : <Outlet />;
};
