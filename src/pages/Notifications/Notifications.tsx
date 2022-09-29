import React from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import { FiChevronLeft } from 'react-icons/fi/'
import "./Notifications.scss"
import { useNavigate } from 'react-router-dom';

const Noitifications = () => { 


  const navigate = useNavigate();

  return (
    <div className="noitifications">
      <Navbar />
      <div className="header">
        <div className="back-button" onClick={() => navigate("/")}>
            <FiChevronLeft className="back-icon"/>
            Back
        </div>
        <h2 className="section">Notifications</h2>
      </div>
    </div>
  );
  
};

export default Noitifications;
