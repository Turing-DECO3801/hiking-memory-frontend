import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { HikeContext } from '../../../contexts/HikeContext';
import { updateHikeName, getAHike } from '../../../api';
import Map from '../Map/Map';
import './PopUp.scss';

interface NewHikeProps {
  close: () => void,
}

const NewHike = ({ close }: NewHikeProps) => {
  
  /**
   * Contexts for shared information between components
   */
  const { hike, updateHikePath } = useContext(HikeContext);
  const { email, password } = useContext(AuthContext);

  const [hikeName, setHikeName] = useState("");
  const [path, setPath] = useState(Array<PathType>);

  /**
   * Keeps track of the current value of the input form for the name change
   * of a Hike
   * 
   * @param event Input Change Event
   */
  const onNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setHikeName(event.currentTarget.value);
  }

  /**
   * On Submit of the name change for the Hike will send a request to the
   * database to store the new hike name
   */
  const submitChange = () => {
    updateHikePath(hikeName);
    updateHikeName(hikeName, hike?.id as number, email as string, password as string);
    close();
  }

  /**
   * Loads the Hike Data on page load
   */
  useEffect(() => {
    loadHikeData()
  }, [])

  /**
   * Loads the hike data and parses the raw data for the Map API to display 
   * the path on screen
   */
  const loadHikeData = async () => {
    const data = await getAHike(hike?.id as number, email as string, password as string) as any;
      
    const decoder = new TextDecoder("utf-8");
    const csvData = decoder.decode(new Uint8Array(data.logs.Body.data))
    const split = csvData.split('\r\n');
    const hikePath = [];
  
    // Parsing Hiking Data into JSON 
    for (const line of split) {
      if (line === "") continue;
      const coord = line.split(',');
      hikePath.push({
        'lat': Number(coord[0]),
        'lng': Number(coord[1])
      })
    }
    setPath(hikePath);
  }

  /**
   * Container Styling for Google Maps API in pop up
   */
     const containerStyle = {
      width: '100%',
      height: '200px'
    };

  /**
   * Checks if the Hike Path is valid and will display the map if it is
   * 
   * @returns Google Maps Map
   */
  const getMap = () => {
    if (path.length !== 0) {
      return (<Map path={path} containerStyle={containerStyle} mini={true}/>)
    }
  }

  return (
    <div className="popup-content">
      <h3>New Hike Detected</h3>
      Where did you hike on:
      <div className="colored-text">
        {`${hike?.date.toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
      </div> 
      <input placeholder="Hike location name..." onChange={onNameChange}/>
      <div className="hike-map">
        {
          getMap()
        }
      </div>
      <div className="buttons">
        <div className="cancel-button" onClick={close}>Cancel</div>
        <div className="action-button" onClick={submitChange}>Submit</div>
      </div>
    </div>
  );
};

export default NewHike;
