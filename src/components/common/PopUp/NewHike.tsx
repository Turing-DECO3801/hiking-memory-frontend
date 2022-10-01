import React, { useState } from 'react';
import Map from '../Map/Map';
import './PopUp.scss';


interface NewHikeProps {
  date: string,
  close: () => void,
}

interface Hike {
  title: string,
  date: string,
  time: string,
  path: any[],
}

const NewHike = ({ date, close }: NewHikeProps) => {

  const pathExample = [
    { lat: 37, lng: -122 },
    { lat: 37, lng: -121 },
    { lat: 38, lng: -121 },
    { lat: 38, lng: -122 }
  ];

  const hike = {title: 'Kondalilla Falls', date: '26/01/2022', time: '8:30am', path: pathExample} 
  

  const containerStyle = {
    width: '100%',
    height: '200px'
  };

  return (
    <div className="popup-content">
      <h3>New Hike Detected</h3>
      Where did you hike on:
      <div className="colored-text">
        { date }
      </div> 
      <input placeholder="Hike location name..."/>
      <div className="hike-map">
        <Map path={hike.path} containerStyle={containerStyle} mini={true}/>
      </div>
      <div className="buttons">
        <div className="cancel-button" onClick={close}>Cancel</div>
        <div className="action-button">Submit</div>
      </div>
    </div>
  );
};

export default NewHike;
