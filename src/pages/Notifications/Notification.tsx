import React, { useContext } from 'react';
import "./Notifications.scss"
import { useNavigate } from 'react-router-dom';
import { HikeContext } from '../../contexts/HikeContext';


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
    <div className="notification">
      {
        hike.path_name === null ? <div className="new-notification" /> : null
      }
      <div className="notification-date-time" onClick={openHike}>
        <div className="notification-date">
          {
          `${hike.date.getDate()} ${hike.date.toLocaleString('default', { month: 'short' })} ${hike.date.getFullYear()}`
          }
        </div>
        <div className="notification-time">
          {`${hike.date.getHours() % 12}:${hike.date.getMinutes()}${hike.date.getHours() < 12 ? "am" : "pm"}`}
        </div>
      </div>
      <div className="notification-options">
        <div className="notification-edit" onClick={editHike}>
          Edit
        </div>
      </div>
    </div>
  )
}


export default Noitification;
