import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import TextInput from '../../components/common/TextInput/TextInput';
import Logo from '../../components/common/Logo/Logo';
import Button from '../../components/common/Button/Button';
import "./SignUp.scss"
import Loading from '../../components/common/Loading/Loading';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  }

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  }

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }
  
  return (
    <>
    <div className="login">
      <div className="section sign-up-header">
        <div className="mini-logo-container">
          <Logo />
        </div>
        <h1 className="title">memory trail</h1>
      </div>
      <div className="section delay-1 sign-up-container">
        <div className="input-container">
          <div className="input-label">
            Name:
          </div>
          <input className="user-input" onChange={onNameChange}/>
        </div>
        <div className="input-container">
          <div className="input-label">
            Username:
          </div>
          <input className="user-input" onChange={onUsernameChange}/>
        </div>
        <div className="input-container">
          <div className="input-label">
            Email:
          </div>
          <input className="user-input" onChange={onEmailChange}/>
        </div>
        <div className="input-container">
          <div className="input-label">
            Password:
          </div>
          <input type="password" className="user-input" onChange={onPasswordChange}/>
        </div>
      </div>
      <Button className="section delay-2" onClick={() => null}>Sign Up</Button>
      <br/>
      <div className="section delay-3">
        Already have an account?
      </div>
      <div className="link section delay-3" onClick={() => navigate("/login")}>
        Log in here
      </div>
    </div>
    </>
  );
};

export default SignUp;
