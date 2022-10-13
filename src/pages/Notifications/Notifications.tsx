import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import { FiChevronLeft } from 'react-icons/fi/'
import "./Notifications.scss"
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import PopUp from '../../components/common/PopUp/PopUp';
import { AuthContext } from '../../contexts/AuthContext';
import { getHikes } from '../../api';

const Noitifications = () => { 

  const { email, password  } = useContext(AuthContext);
  
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [hikeData, setHikeData] = useState(Array<HikeData>);
  const currentDate = new Date()

  const navigate = useNavigate();

  const getHikeData = async () => {
    const hikes = await getHikes(email as string, password as string) as Array<HikeData>;

    for (const hike of hikes) {
      hike.date = new Date(hike.start_time);
    }

    hikes.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    })

    setHikeData(hikes);
  }

  // Fetch the data on page load
  useEffect(() => {
    getHikeData();
  }, [])
  
  currentDate.setDate(currentDate.getDate() - 30);

  return (
    <>
      <div className="noitifications-page">
        <Navbar />
        <br />
        <div className="header">
          <h2 className="section">Notifications</h2>
        </div>
        <div className="notifications-content section delay-1">
          <div className="notification-sublabel">
            The following hikes need path names
          </div>
          <div className="notification-section-container">
            <div>Hikes in the last month</div>
            <div>
              {
                hikeData
                .filter(hike => hike.date.getTime() >= currentDate.getTime())
                .filter(hike => hike.path_name === null)
                .length
              }
            </div>
          </div>
          {
            hikeData
            .filter(hike => hike.date.getTime() >= currentDate.getTime())
            .filter(hike => hike.path_name === null)
            .map((hike, index) => <Notification hike={hike} key={index} openPopup={() => setDisplayPopUp(true)}/>)
          }
        </div>
        <div className="notifications-content section delay-2">
          <div className="notification-section-container">
            <div>Older</div>
            <div>
            {
                hikeData
                .filter(hike => hike.date.getTime() < currentDate.getTime())
                .filter(hike => hike.path_name === null)
                .length
              }
            </div>
          </div>
          {
            hikeData
            .filter(hike => hike.date.getTime() < currentDate.getTime())
            .filter(hike => hike.path_name === null)
            .map((hike, index) => <Notification hike={hike} key={index} openPopup={() => setDisplayPopUp(true)}/>)
          }
        </div>
        <div className="bottom-margin"></div>
      </div>
      <PopUp show={displayPopUp} type="new" closeHandler={() => setDisplayPopUp(false)}/>
    </>
  );
  
};

export default Noitifications;
