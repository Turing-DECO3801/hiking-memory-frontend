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

const PopUp = ({ show, type, closeHandler }: PopUpProps) => {

  const [displayed, setDisplayed] = useState(show);
  const [popupType, setPopupType] = useState(type);

  /**
   * Updates the PopUp on whether the view status and the type of the
   * pop up has changed
   */
  useEffect(() => { setDisplayed(show) }, [show]);
  useEffect(() => { setPopupType(type ) }, [type]);

  /**
   * Determines which particular popup should be displayed to the screen
   * 
   * @param popupType Type of the PopUp to be displayed
   * @returns 
   */
  const getPopUpType = (popupType: string) => {
    if (!popupType) {
      return null
    } else if (type === "delete") {
      return <DeleteHike close={onClose} />;
    } else if (type === "edit") {
      return <EditHike close={onClose}/>;
    } else if (type === "summary") {
      return <HikeSummary steps="10,500" distance="15" altitude="1500m" close={onClose}/>;
    } else if (type === "new") {
      return <NewHike close={onClose}/>;
    }
  }

  /**
   * Handles the closing of the popup
   */
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
