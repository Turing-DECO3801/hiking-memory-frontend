import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import TextInput from '../../components/common/TextInput/TextInput';
import Logo from '../../components/common/Logo/Logo';
import Button from '../../components/common/Button/Button';
import "./Login.scss"
import Loading from '../../components/common/Loading/Loading';


const Login = () => {
  const { login } = useContext(AuthContext);
  
  return (
    <>
    <div className="login">
      <Logo />
      <h1>hiking memory maker</h1>
      <br/>
      <TextInput placeholder="Username" icon="user"/>
      <br/>
      <TextInput placeholder="Password" icon="lock" type="password"/>
      <br/>
      <Button onClick={login}>Log in</Button>
      <br/>
      <div>
        Don't have an account?
      </div>
      <a className="link">
        Sign up here
      </a>
      <br/>
      <br/>
      <br/>
      <Loading />
    </div>
    </>
  );
};

export default Login;
