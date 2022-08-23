import React from 'react';
import './Navbar.scss'

import { FiUser } from 'react-icons/fi/'
import { FaMountain } from 'react-icons/fa/'
import { FaCalendarCheck } from 'react-icons/fa/'

const Navbar = () => {

  return (
    <nav>
        <button>
        <FiUser className="icon"/>
          Memories
        </button>
        <button>
          <FaCalendarCheck className="icon"/>
          Memories
        </button>
        <button>
          <FaMountain className="icon"/>
          Hikes
        </button>
    </nav>
  );
};

export default Navbar;
