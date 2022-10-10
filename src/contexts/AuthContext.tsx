import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from "axios";
import { serverURL } from './../constants/index'

interface AuthState {
  isAuthed: boolean | undefined;
  email: string | undefined;
  password: string | undefined;
  name: string | undefined;
  checkAuth: () => void;
  login: (email: string, password: string) => Promise<boolean> | undefined;
  signup: (email: string, password: string, name: string) => Promise<boolean> | undefined;
  logout: () => void;
}

export const AuthContext = createContext<AuthState>({
  isAuthed: undefined,
  email: undefined,
  password: undefined,
  name: undefined,
  checkAuth: () => undefined,
  login:  () => undefined,
  signup:  () => undefined,
  logout: () => undefined
});

export const useAuthState = (): AuthState => {
  const [email, setEmail] = useState<string | undefined>(localStorage.getItem('email') || undefined);
  const [password, setPassword] = useState<string | undefined>(localStorage.getItem('password') || undefined);
  const [name, setName] = useState<string | undefined>(localStorage.getItem('name') || undefined);
  const [authed, setAuthed] = useState<boolean | undefined>((localStorage.getItem('email') && localStorage.getItem('password') && localStorage.getItem('name')) !== null);

  const navigate = useNavigate();

  // Initial check to see if user is logged in
  const checkAuth = async () => {
    if (authed === undefined || !authed) {
      setAuthed(false);
    }
  };

  const login = async (email: string, password: string) => {
    let success = false;
    const data = await axios.post(`${serverURL}auth/login`,
      { email: email, password: password }
    )
    .then((res) => {
      success = res.data;
      if (success) {
        setAuthed(true);
        navigate("/");
        setEmail(res.data.user.email);
        setPassword(res.data.user.password);
        setName(res.data.user.name);
        // Save login details
        localStorage.setItem('email', res.data.user.email);
        localStorage.setItem('password', res.data.user.password);
        localStorage.setItem('name', res.data.user.name);
      } else {
        setAuthed(false);
      }
    })
    .catch(() => {
      setAuthed(false);
    })
    return success;
  };

  const logout = () => {
    setAuthed(false);
    setEmail(undefined);
    setPassword(undefined);
  };

  const signup = async (email: string, password: string, name: string) => {
    let success = false;

    const data = await axios.post(`${serverURL}auth/signup`,
      { email: email, password: password, name: name }
    )
    .then((res) => {
      success = res.data;
      if (success) {
        setAuthed(true);
        navigate("/");
        setEmail(res.data.user.email);
        setPassword(res.data.user.password);
        setName(res.data.user.name);
        // Save login details
        localStorage.setItem('email', res.data.user.email);
        localStorage.setItem('password', res.data.user.password);
        localStorage.setItem('name', res.data.user.name);
      } else {
        setAuthed(false);
      }
    })
    .catch((err) => {
      setAuthed(false);
      console.log(err);
    })

    return success;
  }

  return { isAuthed: authed, email, password, name, checkAuth, login, signup, logout };
};
