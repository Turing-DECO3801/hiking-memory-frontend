import React from 'react';
import Navbar from './layout/Navbar/Navbar';
import Routing from './Routing';
import { useAuthState, AuthContext } from '../contexts/AuthContext';

const App = () => {
  const authState = useAuthState();
  
  return (
    <AuthContext.Provider value={authState}>
      <Navbar />
      <div>
        <Routing />
      </div>
    </AuthContext.Provider>
  );
};

export default App;