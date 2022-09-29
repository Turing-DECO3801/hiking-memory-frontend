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
      <div className="section">
        <Logo />
        <h1>hiking memory maker</h1>
      </div>
      <br/>
      <div className="section delay-1">
        <TextInput placeholder="Username" icon="user"/>
        <br/>
        <TextInput placeholder="Password" icon="lock" type="password"/>
        <br/>
      </div>
      <Button className="section delay-2" onClick={login}>Log in</Button>
      <br/>
      <div className="section delay-3">
        Don't have an account?
      </div>
      <a className="link section delay-3">
        Sign up here
      </a>
      <br/>
      <br/>
      <br/>
      <Loading />
      {/* <svg height="512" width="384">
        <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/>
      </svg> */}
    </div>
    </>
  );
};

export default Login;
