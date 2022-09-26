import React from 'react';
import './Loading.scss';
import { FaMapMarker } from 'react-icons/fa';
import { FiVolume2 } from 'react-icons/fi';

const Loading = ( ) => {
  return (
    <div className="loading-container">
      <div className="loading">
          <div className="moving"></div>
      </div>
      <div className="logo-map-marker marker-1">
        <FaMapMarker className="map-marker"/>
        <FiVolume2 className="volume-marker"/>
      </div>
      <div className="logo-map-marker marker-2">
        <FaMapMarker className="map-marker"/>
        <FiVolume2 className="volume-marker"/>
      </div>
    </div>
  );
};

export default Loading;
