import React, { useState } from 'react';
import './MapMenu.scss';

import { FiList, FiEdit, FiTrash2, FiTrendingUp, FiX } from 'react-icons/fi';
import PopUp from '../PopUp/PopUp';

const MapMenu = () => {

  /**
   * States for the Hike Menu for rerendering of the screen
   */
  const [menuState, setMenuState] = useState(false);
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState("");

  /**
   * Checks the current status to determine what the functionality of the
   * menu button should be 
   */
  const getMenuButton = () =>  {
    if (!menuState) {
      return (
        <FiList className="menu-button"/>
      );
    } else {
      return (
        <FiX className="menu-button"/>
      );
    }
  }

  /**
   * Opens the popup screen to the correct type on click
   * 
   * @param event On Click Mouse event
   * @param type Popup Type
   */
  const openPopUp = (event:React.MouseEvent<HTMLDivElement>, type:string) => {   
    setDisplayPopUp(!displayPopUp);
    setPopUpType(type);
    event.stopPropagation();
  }

  /**
   * Opens or closes the Map Menu based on the previous state
   * 
   * @param event On Click Mouse event
   */
  const menuButtonClick = (event:React.MouseEvent<HTMLDivElement>) => {
    setMenuState(!menuState);
    event.stopPropagation();
  }

  /**
   * Returns the PopUp JSX Element to the displayed to the screen if the
   * user chooses to click on a menu option
   * 
   * @returns The PopUp JSX Element
   */
  const getPopUp = () => {
    return <PopUp show={displayPopUp} type={popUpType} closeHandler={() => setDisplayPopUp(false)}/>
  }

  return (
    <>
      {
        getPopUp()
      }
      <div className={`map-menu-container ${menuState ? "" : "no-filter"}`} onClick={() => setMenuState(false)}>
        <div className="map-menu">
          <div className="menu-control" onClick={(e) => menuButtonClick(e)}>
            <div className="menu-button-container">
              {
                getMenuButton()
              }
            </div>
          </div>
          <div
            className={`menu-option ${menuState ? "" : "hide-option"}`}
            onClick={(e) => openPopUp(e, "summary")}
          >
            <div className="option-label">
              Hike Summary
            </div>
            <div className="menu-button-container">
              <FiTrendingUp className="menu-button"/>
            </div>
          </div>
          <div
            className={`menu-option delay-1 ${menuState ? "" : "hide-option"}`}
            onClick={(e) => openPopUp(e, "edit")}
          >
            <div className="option-label">
              Edit Hike Name
            </div>
            <div className="menu-button-container">
                  <FiEdit className="menu-button"/>
            </div>
          </div>
          <div
            className={`menu-option delay-2 ${menuState ? "" : "hide-option"}`}
            onClick={(e) => openPopUp(e, "delete")}
          >          <div className="option-label">
              Delete Hike
            </div>
            <div className="menu-button-container">
              <FiTrash2 className="menu-button"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapMenu;
