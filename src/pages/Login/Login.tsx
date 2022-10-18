import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import TextInput from '../../components/common/TextInput/TextInput';
import Logo from '../../components/common/Logo/Logo';
import Button from '../../components/common/Button/Button';
import "./Login.scss"
import Loading from '../../components/common/Loading/Loading';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  /**
   * Use State hooks for rerendering on variable change
   */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [attempting, setAttempting] = useState(false);
  
  /**
   * Updates the current stored value of the email when the input has changed
   * 
   * @param event On Change Event
   */
  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  }

  /**
   * Updates the current stored value of the password when the input has changed
   * 
   * @param event On Change Event
   */
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }

  /**
   * Displays an error message to the user if the log in attempt
   * was unsuccessful
   * 
   * @returns The element to be displayed on fail
   */
  const showError = () => {
    if (error) {
      return (
      <div className="error-message">
        Oops! Incorrect username or password
      </div>
      );
    }
  }

  /**
   * Attempt to login and update the loading animation while
   * the request is processing
   */
  const attemptLogin = async () => {
    setAttempting(true);
    if (!await login(email, password)) {
      setError(true);
    }
    setAttempting(false);
  }

  return (
    <>
    <div className="login">
      <div className="section login-logo">
        <div className="logo-container">
          <Loading />
        </div>
        <h1 className="title">memory trail</h1>
      </div>
      {
        showError()
      }
      <div className="section delay-1">
        <TextInput placeholder="Email" icon="user" onChange={onEmailChange}/>
        <br/>
        <TextInput placeholder="Password" icon="lock" type="password" onChange={onPasswordChange}/>
        <br/>
      </div>
      {
        attempting ? 
        (
          <div className="spinner-border orange-loader"></div>
        ) 
        : 
        (
          <Button className="section delay-2" onClick={attemptLogin}>Log in</Button>
        )
      }
      <br/>
      <div className="section delay-3">
        Don&apos;t have an account?
      </div>
      <a className="link section delay-3" onClick={() => navigate("/signup")}>
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
