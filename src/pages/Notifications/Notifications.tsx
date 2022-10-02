import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import { FiChevronLeft } from 'react-icons/fi/'
import "./Notifications.scss"
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import PopUp from '../../components/common/PopUp/PopUp';

const Noitifications = () => { 

  const [displayPopUp, setDisplayPopUp] = useState(false);

  const notifications = [
    1,2,3,4,5,6,7,8
  ]

  const getPopUp = () => {
    return <PopUp show={displayPopUp} type="new" closeHandler={() => setDisplayPopUp(false)}/>
  }

  const navigate = useNavigate();

  return (
    <>
      <div className="noitifications-page">
        <Navbar />
        <div className="header">
          <div className="back-button" onClick={() => navigate("/")}>
              <FiChevronLeft className="back-icon"/>
              Back
          </div>
          <h2 className="section">Notifications</h2>
        </div>
        <div className="notifications-content section delay-1">
          <div className="notification-sublabel">
            The following hikes need path names
          </div>
          <div className="notification-section-container">
            <div>Hikes in the last 2 weeks</div>
            <div>2</div>
          </div>
          {
            notifications.map((notification, index) => <Notification key={index} openPopup={() => setDisplayPopUp(true)}/>)
          }
        </div>
        <div className="notifications-content section delay-2">
          <div className="notification-section-container">
            <div>Older</div>
            <div>6</div>
          </div>
          {
            notifications.map((notification, index) => <Notification key={index} openPopup={() => setDisplayPopUp(true)}/>)
          }
        </div>
        <div className="bottom-margin"></div>
      </div>
        {
          getPopUp()
        }
    </>
  );
  
};

export default Noitifications;
