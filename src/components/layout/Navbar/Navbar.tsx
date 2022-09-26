import React from 'react';
import './Navbar.scss'

import { FiUser } from 'react-icons/fi/'
import { FaMountain } from 'react-icons/fa/'
import { FaCalendarCheck } from 'react-icons/fa/'

const Navbar = () => {

  return (
    <nav>
        <a href="/account" className="user-border">
          <FiUser className="user-icon"/>
        </a>
        {/* Account */}
        <div className="pages">
          <a href="/">
            {/* <FaCalendarCheck className="icon"/> */}
            Home
          </a>
          <button>
            {/* <FaMountain className="icon"/> */}
            Hikes
          </button>
        </div>
    </nav>
  );
};

export default Navbar;
