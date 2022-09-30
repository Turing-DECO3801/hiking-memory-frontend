import React, { useEffect } from 'react';
import Navbar from './layout/Navbar/Navbar';
import { useLocation } from "react-router-dom";
import Routing from './Routing';
import { useAuthState, AuthContext } from '../contexts/AuthContext';
import "../styles/index.scss"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const authState = useAuthState();
  const hikeState = useAuthState();

  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }
  
  return (
    <AuthContext.Provider value={authState}>
      <AuthContext.Provider value={hikeState}>
        <ScrollToTop />
        <div>
          <Routing />
        </div>
      </AuthContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;