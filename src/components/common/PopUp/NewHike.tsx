import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { HikeContext } from '../../../contexts/HikeContext';
import { updateHikeName } from '../../../api';
import Map from '../Map/Map';
import './PopUp.scss';


interface NewHikeProps {
  close: () => void,
}

const NewHike = ({ close }: NewHikeProps) => {
  
  const { hike, updateHikePath } = useContext(HikeContext);
  const { email, password } = useContext(AuthContext);

  const [hikeName, setHikeName] = useState("");

  const onNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setHikeName(event.currentTarget.value);
  }

  const submitChange = () => {
    updateHikePath(hikeName);
    updateHikeName(hikeName, hike?.id as number, email as string, password as string);
    close();
  }

  /**
   * Container Styling for Google Maps API in pop up
   */
  const containerStyle = {
    width: '100%',
    height: '200px'
  };

  return (
    <div className="popup-content">
      <h3>New Hike Detected</h3>
      Where did you hike on:
      <div className="colored-text">
        {`${hike?.date.toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
      </div> 
      <input placeholder="Hike location name..." onChange={onNameChange}/>
      <div className="hike-map">
        {/* <Map path={hike.path} containerStyle={containerStyle} mini={true}/> */}
      </div>
      <div className="buttons">
        <div className="cancel-button" onClick={close}>Cancel</div>
        <div className="action-button" onClick={submitChange}>Submit</div>
      </div>
    </div>
  );
};

export default NewHike;
