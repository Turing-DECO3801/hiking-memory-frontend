import React from 'react';
import "./Notifications.scss"
import { useNavigate } from 'react-router-dom';

interface NotificationProps {
  openPopup: () => void;
}

const Noitification = ({ openPopup }: NotificationProps) => {
  
  const navigate = useNavigate();

  return (
    <div className="notification">
      <div className="new-notification" />
      <div className="notification-date-time" onClick={() => navigate('/singleview')}>
        <div className="notification-date">
          29 Sep 2022
        </div>
        <div className="notification-time">
          4:49pm
        </div>
      </div>
      <div className="notification-options">
        <div className="notification-edit" onClick={openPopup}>
          Edit
        </div>
      </div>
    </div>
  )
}


export default Noitification;
