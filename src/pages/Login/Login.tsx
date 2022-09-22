import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import TextInput from '../../components/common/TextInput/TextInput';
import "./Login.scss"
import Logo from '../../components/common/Logo/Logo';


const Login = () => {
  const { login } = useContext(AuthContext);
  
  return (
    <>
    <div>
      <Logo />
      <TextInput placeholder="Username" icon="user"/>
      <TextInput placeholder="Password" icon="lock"/>
      {/* <button onClick={login}>Login</button> */}
    </div>
    </>
  );
};

export default Login;
