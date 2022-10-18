import React, { useContext } from 'react';
import './PopUp.scss';
import { FiTrendingUp } from 'react-icons/fi';
import { GiPathDistance, GiBootPrints } from 'react-icons/gi'
import { HikeContext } from '../../../contexts/HikeContext';
interface HikeSummaryProps {
  steps: string,
  distance: string,
  altitude: string,
  close: () => void,
}

const HikeSummary = ({ steps, altitude, close }: HikeSummaryProps) => {

  const { hike } = useContext(HikeContext);

  /**
   * Returns a formatted string of the distance value
   * 
   * @returns Formatted distance
   */
  const getDistance = () => {
    if (hike !== null && hike !== undefined) {
      if (hike.distance !== null) {
        return (hike.distance / 1000).toFixed(2) 
      }
    }
  }

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
            { getDistance() } km travelled
        </div>
        <div className="stats">
          <div className="stats-icon-container">
            <FiTrendingUp className="stats-icon"/>
          </div>
          { altitude } altitude
        </div>
        <div className="done-button-container">
          <div className="cancel-button" onClick={close}>Done</div>
        </div>
    </div>
  );
};

export default HikeSummary;
