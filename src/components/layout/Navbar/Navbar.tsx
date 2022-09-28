import React from 'react';
import { useLocation } from 'react-router-dom'
import './Navbar.scss'

import { FiUser, FiHome, FiBell } from 'react-icons/fi/'
import { GiWalkingBoot } from 'react-icons/gi'

const Navbar = () => {
  
  const location = useLocation();

  return (
    <nav>
        <div className="pages">
          <a href="/">
            <FiHome className={`icon ${location.pathname === "/" ? "active" : ""}`}/>
            Home
          </a>
          <a href="/account">
            <FiUser className={`icon ${location.pathname === "/account" ? "active" : ""}`}/>
            Account
          </a>
          <a href="/allhikes">
            <GiWalkingBoot className={`icon ${location.pathname === "/allhikes" ? "active" : ""}`}/>
            Hikes
          </a>
          <a href="/allhikes">
            <FiBell className={`icon ${location.pathname === "/allhikes" ? "active" : ""}`}/>
            Notifications
          </a>
        </div>
    </nav>
  );
};

export default Navbar;
