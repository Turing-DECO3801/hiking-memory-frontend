import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import TextInput from '../../components/common/TextInput/TextInput';
import Logo from '../../components/common/Logo/Logo';
import Button from '../../components/common/Button/Button';
import "./Login.scss"


const Login = () => {
  const { login } = useContext(AuthContext);
  
  return (
    <>
    <div className="login">
      <Logo />
      <h1>memory trail</h1>
      <br/>
      <TextInput placeholder="Username" icon="user"/>
      <br/>
      <TextInput placeholder="Password" icon="lock" type="password"/>
      <br/>
      <Button onClick={login}>Log in</Button>
      {/* <button onClick={login}>Login</button> */}
      <br/>
      <div>
        Don't have an account?
      </div>
      <a className="">
        Sign up here
      </a>
      <br/>
      <br/>
      <br/>
    </div>
    </>
  );
};

export default Login;
