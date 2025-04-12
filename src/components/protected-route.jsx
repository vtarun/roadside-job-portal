import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth-provider';

const ProtectedRoute = ({ children }) => {
  const { loading, user, token } = useAuth();
  const { pathname } = useLocation();
  
  if(!loading && !token){
    return <Navigate to="/?sign-in=true" />
  }

  if(user != undefined && !user?.role && pathname !== "/onboarding") {
    return <Navigate to="/onboarding" />
  }
  
  return children;
}

export default ProtectedRoute;
