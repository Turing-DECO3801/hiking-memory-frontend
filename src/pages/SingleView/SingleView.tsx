import React, { useContext, useState } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Map from '../../components/common/Map/Map';
import { HikeContext } from '../../contexts/HikeContext';
import Card from 'react-bootstrap/Card';
import "./HikeTitle.scss"
import { pathExample } from './pathExample';
import MapMenu from '../../components/common/MapMenu/MapMenu';
import { FiChevronLeft } from 'react-icons/fi/'
import { useNavigate } from 'react-router-dom';
import PopUp from '../../components/common/PopUp/PopUp';

interface Hike {
  title: string,
  date: string,
  path: any[],
  center: {lat: number, lng: number},
  zoom: number;
  audio: any[]
}


const SingleView = () => {
     
  const audioEx = [{location: {lat: -27.360349, lng: 152.963009}, audioFile: "./test.mp3", imageFile: "./image1.jpg"}, 
                    {location: {lat: -27.346084, lng: 152.975356}, audioFile: "./test2.mp3", imageFile: "./image2.jpg"}];
   
  const [displayPopUp, setDisplayPopUp] = useState(false);

  const getPopUp = () => {
    return <PopUp show={displayPopUp} type="edit" closeHandler={() => setDisplayPopUp(false)}/>
  }
                

  const singleHikeInfo = {title: 'Afternoon Hike', date: "31/08/2022", path: pathExample, center: {lat: -10, lng: -38.523}, zoom: 10, audio: audioEx};

  const containerStyle = {
    width: '110vw',
    height: '110vh'
  };
  
    const navigate = useNavigate();
  

  return(
    <div>
      {
        getPopUp()
      }
      <Navbar/>
      <div className="map-container">
        <div className="hike-description">
          <div className="back-button" onClick={() => navigate("/allhikes")}>
            <FiChevronLeft className="back-icon"/>
            Back
          </div>
          <div className="hike-title" onClick={() => setDisplayPopUp(true)}> {singleHikeInfo.title} </div>
          <div className="hike-date"> {singleHikeInfo.date} </div>
          <div className="hike-instructions thin-text"> Tap Memories to Upload Photos </div>
        </div>
        <Map path={singleHikeInfo.path} audio={singleHikeInfo.audio} containerStyle={containerStyle}></Map>
        <MapMenu />
      </div>
    </div>

  )
};

export default SingleView;