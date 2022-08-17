import React from 'react';
import { Navigate } from 'react-router-dom';

const NoMatch = () => {
  return <Navigate to="/" replace />;
};

export default NoMatch;
