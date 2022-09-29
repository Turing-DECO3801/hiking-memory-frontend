import React from 'react';
import { useLocation } from 'react-router-dom'
import './Navbar.scss'

import { FiUser, FiHome, FiBell } from 'react-icons/fi/'
import { GiWalkingBoot } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  
  const location = useLocation();

  const navigate = useNavigate();

  return (
    <nav>
        <div className="pages">
          <div className="link" onClick={() => navigate("/")}>
            <FiHome className={`icon ${location.pathname === "/" ? "active" : ""}`}/>
            Home
          </div>
          <div className="link" onClick={() => navigate("/allhikes")}>
            <GiWalkingBoot className={`icon ${location.pathname === "/allhikes" || location.pathname === "/singleview" ? "active" : ""}`}/>
            Hikes
          </div>
          <div className="link" onClick={() => navigate("/notifications")}>
            <FiBell className={`icon ${location.pathname === "/notifications" ? "active" : ""}`}/>
            Notifications
          </div>
          <div className="link" onClick={() => navigate("/account")}>
            <FiUser className={`icon ${location.pathname === "/account" ? "active" : ""}`}/>
            Account
          </div>
        </div>
    </nav>
  );
};

export default Navbar;
