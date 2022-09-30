import React from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import { FiArrowRight, FiVolume2, FiCamera } from 'react-icons/fi/'
import { Pagination, Navigation } from "swiper";
import "./Home.scss"
import Notifications from './Notifications/Notifications';
import PhotoCollection from './PhotoCollection/PhotoCollection';
import PopUp from '../../components/common/PopUp/PopUp';
import { useNavigate } from 'react-router-dom';

const Home = () => { 

  const getName = () => {
    return "Ella"
  }

  const navigate = useNavigate();

  return (
    <div className="home">
      <Navbar />
      <br />
      <h2 className="section">Welcome Back {getName()}!</h2>
      <br />

      {/** Latest Hike Tab, could be abstracted later */}
      <div className="latest-hike section delay-1">
        <div className="left-half">
          <h5>View your latest hike</h5>
          <div className="thin-text latest-hike-name">Mount Coo-tha 15/08</div>
        </div>
        <div className="notification-button">
          <FiArrowRight className="arrow-right"/>
        </div>
        <div className="icons">
          <div className="camera-icon-container">
            <FiCamera className="camera-icon" />
          </div>
          <div className="sound-icon-container">
            <FiVolume2 className="volume-icon" />
          </div>
        </div>
      </div>

      <br />
      <br />

      {/** Notifications Tab */}
      <div className="section delay-2">
        <div className="section-header">
          <h4>Notifications</h4>
          <div className="link" onClick={() => navigate("/notifications")}>edit</div>
        </div>
        <Notifications />
      </div>
      <br />
      <div className="section delay-3">
        <div className="section-header">
          <h4>Photo Collections</h4>
          <div className="link" onClick={() => navigate("/photos")}>see all</div>
        </div>
        <PhotoCollection />
      </div>
      <br />
      <br />
      <PopUp show={true} type="new" />
    </div>
  );
  
};

export default Home;
