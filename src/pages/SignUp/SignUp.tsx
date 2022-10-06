import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import TextInput from '../../components/common/TextInput/TextInput';
import Logo from '../../components/common/Logo/Logo';
import Button from '../../components/common/Button/Button';
import "./SignUp.scss"
import Loading from '../../components/common/Loading/Loading';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { signup } = useContext(AuthContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [attempting, setAttempting] = useState(false);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  }

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  }

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }

  const showError = () => {
    if (error) {
      return (
      <div className="error-message">
        Oops! Incorrect username or password
      </div>
      );
    }
  }

  const attemptSignup = async () => {
    setAttempting(true);
    if (!await signup(email, password, name)) {
      setError(true);
    }
    setAttempting(false);
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
      {
        showError()
      }
      <div className="section delay-1 sign-up-container">
        <div className="input-container">
          <div className="input-label">
            Name:
          </div>
          <input className="user-input" onChange={onNameChange}/>
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
      {
        attempting ? 
        (
          <div className="spinner-border orange-loader"></div>
        ) 
        : 
        (
          <Button className="section delay-2" onClick={attemptSignup}>Sign Up</Button>
        )
      }
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
