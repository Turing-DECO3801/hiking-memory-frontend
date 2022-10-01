import React from 'react';
import "./Notifications.scss"

const Noitification = () => { 

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


export default Noitification;
