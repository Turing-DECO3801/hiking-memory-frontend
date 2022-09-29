import React, { useState } from 'react';
import './PopUp.scss';

import { FiTrendingUp } from 'react-icons/fi';
import { GiPathDistance, GiBootPrints } from 'react-icons/gi'

interface HikeSummaryProps {
  steps: string,
  distance: string,
  altitude: string
}

const HikeSummary = ({ steps, distance, altitude }: HikeSummaryProps) => {

  return (
    <div className="popup-content">
      <h3>Hike Summary<FiTrendingUp className="title-icon"/></h3>
        <div className="stats">
          <div className="stats-icon-container">
            <GiBootPrints className="stats-icon"/>
          </div>
          { steps } steps
        </div>
        <div className="stats">
          <div className="stats-icon-container">
            <GiPathDistance className="stats-icon"/>
          </div>
          { distance }km travelled
        </div>
        <div className="stats">
          <div className="stats-icon-container">
            <FiTrendingUp className="stats-icon"/>
          </div>
          { altitude } altitude
        </div>
    </div>
  );
};

export default HikeSummary;