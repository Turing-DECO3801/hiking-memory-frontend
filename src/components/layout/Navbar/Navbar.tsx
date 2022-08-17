import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

const Navbar = () => {
  // Logout functionality here
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

export default Navbar;
