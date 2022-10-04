import * as React from 'react';
import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface RequireAuthProps {
  children: React.ReactElement;
  secured?: boolean;
  redirectTo?: string;
}

/**
 * Component used to wrap the react-router 'Route' component
 * to check if user has been authenticated before rendering
 * the component.
 *
 * Source: https://ui.dev/react-router-protected-routes-authentication
 */
const RequireAuth = ({ children, secured, redirectTo }: RequireAuthProps): React.ReactElement => {
  const { isAuthed, checkAuth } = useContext(AuthContext);
  
  useEffect(() => {
    // Checks auth on backend
    checkAuth();
  }, [redirectTo]);
  
  if (isAuthed || secured === false) {
    return children;
  } else if (isAuthed === undefined || isAuthed === false) {
    return <Navigate to="/login" replace />;
  }

  return <div className="spinner-border" role="status" />;
};

export default RequireAuth;
