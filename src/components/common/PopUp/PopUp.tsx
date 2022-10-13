import React, { useState, useEffect } from 'react';
import DeleteHike from './DeleteHike';
import EditHike from './EditHike';
import HikeSummary from './HikeSummary';
import NewHike from './NewHike';
import './PopUp.scss';

interface PopUpProps {
  children?: React.ReactNode
  show: boolean
  type: string
  closeHandler?: () => void
}

const PopUp = ({ children, show, type, closeHandler }: PopUpProps) => {

  const [displayed, setDisplayed] = useState(show);
  const [popupType, setPopupType] = useState(type);

  useEffect(() => { setDisplayed(show) }, [show]);
  useEffect(() => { setPopupType(type ) }, [type]);

  const getPopUpType = (popupType: string) => {
    if (!popupType) {
      return null
    } else if (type === "delete") {
      return <DeleteHike close={onClose} hikeName="Kondallila Falls" date="12/01/2022"/>;
    } else if (type === "edit") {
      return <EditHike close={onClose}/>;
    } else if (type === "summary") {
      return <HikeSummary steps="10,500" distance="15" altitude="1500m" close={onClose}/>;
    } else if (type === "new") {
      return <NewHike close={onClose}/>;
    }
  }

  const onClose = () => {
    setDisplayed(false);
    if (closeHandler) {
      closeHandler();
    }
  }

  return (
    <div className={`popup-screen ${displayed ? "" : "no-popup"}`} onClick={onClose}>
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          {
            getPopUpType(popupType)
          }
        </div>
    </div>
  );
};

export default PopUp;
