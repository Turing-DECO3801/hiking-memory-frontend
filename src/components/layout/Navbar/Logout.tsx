import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

const Logout = () => {
  
  /**
   * Functionality to handle the logging out of a user
   */
  const { logout } = useContext(AuthContext);
  function performLogout(e: { preventDefault: () => void }) {
    e.preventDefault();
    logout();
  }

  return (
    <nav>
      <button onClick={performLogout}>Logout</button>
    </nav>
  );
};

export default Logout;
