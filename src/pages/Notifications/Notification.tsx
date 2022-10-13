import React, { useContext } from 'react';
import "./Notifications.scss"
import { useNavigate } from 'react-router-dom';
import { HikeContext } from '../../contexts/HikeContext';
import { FiPlus } from 'react-icons/fi';


interface NotificationProps {
  hike: HikeData
  openPopup: () => void;
}

const Noitification = ({ hike, openPopup }: NotificationProps) => {
  
  const { setHikeData } = useContext(HikeContext);

  const navigate = useNavigate();

  /**
   * Open pop up with the relevant hike being displayed
   */
  const editHike = () => {
    setHikeData(hike);

    openPopup();
  }

  /**
   * Open single hike view with the correct hike being displayed
   */
  const openHike = () => {
    setHikeData(hike);

    navigate('/singleview')
  }

  return (
    <div className={`notification`}>
      {
        hike.viewed === null ? <div className="new-notification" /> : null
      }
      <div className="notification-date-time" onClick={openHike}>
        <div className="notification-date">
          {
          `${hike.date.getDate()} ${hike.date.toLocaleString('default', { month: 'short' })} ${hike.date.getFullYear()}`
        }
        </div>
        <div className="notification-time">
          {`${hike.date.toLocaleTimeString('default', { hour12: true, hour: '2-digit', minute: '2-digit' })}`}
        </div>
      </div>
      <div className="notification-options">
        <div className="notification-name" onClick={editHike}>
          <FiPlus className="notification-plus-icon"/> Name
        </div>
      </div>
    </div>
  )
}


export default Noitification;
