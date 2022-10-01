import React from 'react';
import { useLocation } from 'react-router-dom'
import './Navbar.scss'

import { FiUser, FiHome, FiBell } from 'react-icons/fi/'
import { FaMountain } from 'react-icons/fa/'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  
  const location = useLocation();

  const navigate = useNavigate();

  return (
    <nav>
        <div className="pages">
          <div
            className={`link ${location.pathname === "/" ? "active-border" : ""}`}
            onClick={() => navigate("/")}>
            <FiHome className={`icon ${location.pathname === "/" ? "active" : ""}`}/>
          </div>
          <div
            className={`link ${location.pathname === "/allhikes" || location.pathname === "/singleview" ? "active-border" : ""}`}
            onClick={() => navigate("/allhikes")}
          >
            <FaMountain className={`icon ${location.pathname === "/allhikes" || location.pathname === "/singleview" ? "active" : ""}`}/>
          </div>
          <div
            className={`link ${location.pathname === "/notifications" ? "active-border" : ""}`}
            onClick={() => navigate("/notifications")}
          >
            <FiBell className={`icon ${location.pathname === "/notifications" ? "active" : ""}`}/>
          </div>
          <div
            className={`link ${location.pathname === "/account" ? "active-border" : ""}`}
            onClick={() => navigate("/account")}
          >
            <FiUser className={`icon ${location.pathname === "/account" ? "active" : ""}`}/>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;
