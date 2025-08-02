import React from 'react';
import { useAppSelector } from '../hooks/redux';
import AuthPage from '../pages/AuthPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  
  if (!isLoggedIn) {
    return <AuthPage />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;