import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HikeContext {
  isAuthed: boolean | undefined;
  checkAuth: () => void;
  login: () => void;
  logout: () => void;
}

export const HikeContext = createContext<HikeContext>({
  isAuthed: undefined,
  checkAuth: () => {},
  login: () => {},
  logout: () => {}
});

export const useHikeContext = (): HikeContext => {
  const [authed, setAuthed] = useState<boolean>();
  const API = process.env.REACT_APP_BACKEND_API;
  const navigate = useNavigate();

  // Initial check to see if user is logged in
  const checkAuth = async () => {
    setAuthed(true);
  };

  const login = () => {
    setAuthed(true);
    // Navigate to home upon successful login
    navigate('/');
  };

  const logout = () => {
    setAuthed(false);
  };

  return { isAuthed: authed, checkAuth, login, logout };
};
