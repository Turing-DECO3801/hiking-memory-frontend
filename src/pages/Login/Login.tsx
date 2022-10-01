import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import TextInput from '../../components/common/TextInput/TextInput';
import Logo from '../../components/common/Logo/Logo';
import Button from '../../components/common/Button/Button';
import "./Login.scss"
import Loading from '../../components/common/Loading/Loading';


const Login = () => {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  }

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }

  return (
    <>
    <div className="login">
      <div className="section login-logo">
        <Logo />
        <h1>hiking memory maker</h1>
      </div>
      <br/>
      <div className="section delay-1">
        <TextInput placeholder="Username" icon="user" onChange={onUsernameChange}/>
        <br/>
        <TextInput placeholder="Password" icon="lock" type="password" onChange={onPasswordChange}/>
        <br/>
      </div>
      <Button className="section delay-2" onClick={login}>Log in</Button>
      <br/>
      <div className="section delay-3">
        Don&apos;t have an account?
      </div>
      <a className="link section delay-3">
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
