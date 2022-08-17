import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  
  return (
    <>
      <h1>Login Page</h1>
      <button onClick={login}>Login</button>
    </>
  );
};

export default Login;
