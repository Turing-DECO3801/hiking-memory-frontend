import React, { useContext } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Map from '../../components/common/Map/Map';
import AudioModal from '../../components/common/AudioModal/AudioModal';
import { HikeContext } from '../../contexts/HikeContext';
import Card from 'react-bootstrap/Card';
import "./HikeTitle.scss"
import { readFile } from 'fs/promises';
import Modal from 'react-bootstrap/Modal';




interface Hike {
  title: string,
  date: string,
  path: any[],
  center: {lat: number, lng: number},
  zoom: number;
  audio: any[]
};


const SingleView = () => {
  

  const pathExample = [{lat: -27.360349, lng: 152.963009}, {lat:-27.346084, lng: 152.975356}];

  const audioEx = [{lat: -27.360349, lng: 152.963009}, {lat:-27.346084, lng: 152.975356}];


  const singleHikeInfo = {title: 'Afternoon Hike', date: "31/08/2022", path: pathExample, center: {lat: -10, lng: -38.523}, zoom: 10, audio: audioEx};

  return(
    <div>
      <div className="HikeDescription"> 
        <div className="HikeTitle"> {singleHikeInfo.title} </div>
        <div className="HikeDate"> {singleHikeInfo.date} </div>
        <div className="HikeInstructions"> Tap Memories to Upload Photos </div>
      </div>
      <Map path={singleHikeInfo.path} audio={singleHikeInfo.audio}></Map>
    </div>
  )
};

export default SingleView;