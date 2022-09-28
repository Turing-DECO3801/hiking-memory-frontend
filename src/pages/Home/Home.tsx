import React from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import { FiArrowRight, FiVolume2, FiCamera } from 'react-icons/fi/'
import { Pagination, Navigation } from "swiper";
import "./Home.scss"
import Notifications from './Notifications/Notifications';
import PhotoCollection from './PhotoCollection/PhotoCollection';
import PopUp from '../../components/common/PopUp/PopUp';

const Home = () => { 

  const getName = () => {
    return "Ella"
  }

  return (
    <div className="home">
      <Navbar />
      <br />
      <br />
      <h2>Welcome Back {getName()}!</h2>
      <br />

      {/** Latest Hike Tab, could be abstracted later */}
      <div className="latest-hike">
        <div className="left-half">
          <h5>View your latest hike</h5>
          <text className="thin-text">Mount Coo-tha 15/08</text>
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
      <div className="section-header">
        <h4>Notifications</h4>
        <a href="/">edit</a>
      </div>
      <Notifications />
      <br />
      <br />
      <div className="section-header">
        <h4>Photo Collections</h4>
        <a href="/photos">see all</a>
      </div>
      <PhotoCollection />
      <PopUp />
    </div>
  );
  
};

export default Home;
