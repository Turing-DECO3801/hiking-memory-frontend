import React from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import { FiChevronLeft } from 'react-icons/fi/'
import "./Notifications.scss"
import { useNavigate } from 'react-router-dom';

const Noitifications = () => { 

  const notifications = [
    1,2,3,4,5
  ]

  const navigate = useNavigate();

  const notification = () => {
    return (
      <div className="notification">
        <div className="new-notification" />
        <div className="notification-date-time">
          <div className="notification-date">
            29 Sep 2022
          </div>
          <div className="notification-time">
            4:49pm
          </div>
        </div>
        <div className="notification-options">
          <div className="notification-view">
            View
          </div>
          <div className="notification-edit">
            Edit
          </div>
        </div>
      </div>
    )
  }

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
      <div className="notifications-content section delay-1">
        <div className="notification-sublabel">
          The following hikes need path names
        </div>
        <div className="notification-section-container">
          <div>Hikes in the last 2 weeks</div>
          <div>2</div>
        </div>
        {
          notifications.map(() => notification())
        }
      </div>
      <div className="notifications-content section delay-2">
        <div className="notification-section-container">
          <div>Older</div>
          <div>6</div>
        </div>
        {
          notifications.map(() => notification())
        }
      </div>
    </div>
  );
  
};

export default Noitifications;
