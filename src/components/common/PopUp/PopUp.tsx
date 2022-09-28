import React, { useState } from 'react';
import DeleteHike from './DeleteHike';
import EditHike from './EditHike';
import HikeSummary from './HikeSummary';
import NewHike from './NewHike';
import './PopUp.scss';

interface PopUpProps {
  children?: React.ReactNode
  show: boolean
}

const PopUp = ({ children, show }: PopUpProps) => {

  const [displayed, setDisplayed] = useState(show);

  return (
    <div className={`popup-screen ${displayed ? "" : "no-popup"}`} onClick={() => setDisplayed(false)}>
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          <DeleteHike hikeName="Kondallila Falls" date="12/01/2022"/>
          {/* <EditHike />
          <HikeSummary steps="10,500" distance="15" altitude="1500m"/>
          <NewHike date="6th December 2022"/> */}
        </div>
    </div>
  );
};

export default PopUp;
