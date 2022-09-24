import React from 'react';
import Navbar from './layout/Navbar/Navbar';
import Routing from './Routing';
import { useAuthState, AuthContext } from '../contexts/AuthContext';
import "../styles/index.scss"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const authState = useAuthState();
  const hikeState = useAuthState();
  
  return (
    <AuthContext.Provider value={authState}>
      <AuthContext.Provider value={hikeState}>
        <div>
          <Routing />
        </div>
      </AuthContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;