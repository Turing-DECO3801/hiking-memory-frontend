import React, { useContext } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Map from '../../components/common/Map/Map';
import { HikeContext } from '../../contexts/HikeContext';
import Card from 'react-bootstrap/Card';
import "./HikeTitle.scss"
import { readFile } from 'fs/promises';
import Modal from 'react-bootstrap/Modal';
import { pathExample } from './pathExample';



interface Hike {
  title: string,
  date: string,
  path: any[],
  center: {lat: number, lng: number},
  zoom: number;
  audio: any[]
};


const SingleView = () => {
     
  const audioEx = [{location: {lat: -27.360349, lng: 152.963009}, audioFile: "./test.mp3", imageFile: "./image1.jpg"}, 
                    {location: {lat: -27.346084, lng: 152.975356}, audioFile: "./test2.mp3", imageFile: "./image2.jpg"}];
   

                

  const singleHikeInfo = {title: 'Afternoon Hike', date: "31/08/2022", path: pathExample, center: {lat: -10, lng: -38.523}, zoom: 10, audio: audioEx};

  const containerStyle = {
    width: '100vw',
    height: '100vh'
  };
  


  return(
    <div>
      <Navbar/>
      <div className="map-container">
        <div className="hike-description"> 
          <div className="hike-title"> {singleHikeInfo.title} </div>
          <div className="hike-date"> {singleHikeInfo.date} </div>
          <div className="hike-instructions thin-text"> Tap Memories to Upload Photos </div>
        </div>
        <Map path={singleHikeInfo.path} audio={singleHikeInfo.audio} containerStyle={containerStyle}></Map>
      </div>
    </div>

  )
};

export default SingleView;