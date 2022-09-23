import React from 'react';
import './Navbar.scss'

import { FiUser } from 'react-icons/fi/'
import { FaMountain } from 'react-icons/fa/'
import { FaCalendarCheck } from 'react-icons/fa/'

const Navbar = () => {

  return (
    <nav>
        <div className="user-border">
          <FiUser className="user-icon"/>
        </div>
        {/* Account */}
        <div className="pages">
          <button>
            {/* <FaCalendarCheck className="icon"/> */}
            Home
          </button>
          <button>
            {/* <FaMountain className="icon"/> */}
            Hikes
          </button>
        </div>
    </nav>
  );
};

export default Navbar;
