import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Map from '../../components/common/Map/Map';
import { HikeContext } from '../../contexts/HikeContext';
import "./HikeTitle.scss"
import { useJsApiLoader } from '@react-google-maps/api';
import MapMenu from '../../components/common/MapMenu/MapMenu';
import { FiChevronLeft, FiHeart } from 'react-icons/fi/'
import { useNavigate } from 'react-router-dom';
import PopUp from '../../components/common/PopUp/PopUp';
import { getAHike, setFavourite, setDistance, setViewed } from '../../api';
import { AuthContext } from '../../contexts/AuthContext';

const SingleView = () => {
     
  /**
   * Use State hooks that store information about current display
   * and data about the current path and audios
   */
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [favourited, setFavourited] = useState(false);
  const [path, setPath] = useState(Array<PathType>);
  const [audio, setAudio] = useState(Array<Audio>);
  const [hikeLength, setHikeLength] = useState(0);

  /**
   * Contexts for passing information between unrelated components
   */
  const { hike } = useContext(HikeContext);
  const { email, password } = useContext(AuthContext); 

  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBDYINIldIZy3ssEzrMpAvRA6Rdd_GN020'
  });

  /**
   * Loads the hike data for the current hike on page load
   */
  useEffect(() => {
    loadSingleHikeData();
    setViewed(1, hike?.id as number, email as string, password as string);
  }, []);

  /**
   * Loads all hike data and converts it into compatible types
   */
  const loadSingleHikeData = async () => {
    const data = await getAHike(hike?.id as number, email as string, password as string) as any;
    
    const decoder = new TextDecoder("utf-8");
    const csvData = decoder.decode(new Uint8Array(data.logs.Body.data))
    const split = csvData.split('\r\n');
    const hikePath = [];

    setFavourited(data.hike.favourite === 1 ? true : false);

    // Parsing Hiking Data into JSON 
    for (const line of split) {
      if (line === "") continue;
      const coord = line.split(',');
      hikePath.push({
        'lat': Number(coord[0]),
        'lng': Number(coord[1])
      })
    }
    
    // Parsing Audio Adata into compatible format
    const memos = []
    for (const memo of data.memos) {
      memos.push({
        id: memo.id,
        location: {
          'lat': memo.longitude,
          'lng': memo.latitude
        },
        audioFile: memo.audioUrl,
        imageFile: memo.imageUrl,
        notes: memo.notes,
        transcript: memo.transcription
      })
    }
    setAudio(memos)
    setPath(hikePath);

    //Calculation of the distance if not calculated already
    if (data.hike.distance !== null) {
      setHikeLength(data.hike.distance);
    }
  }

  useEffect(() => {
    if (hike?.distance === null && path.length !== 0 && isLoaded && google.maps.geometry !== undefined) {
      const calculatedDistance = google.maps.geometry.spherical.computeLength(path);
      setHikeLength(calculatedDistance);
      setDistance(calculatedDistance, hike?.id as number, email as string, password as string) as any;
    }
  }, [isLoaded, path])

  const onFavouritedPress = (event: React.MouseEvent<HTMLElement>) => {
    setFavourite(favourited === true ? 0 : 1, hike?.id as number, email as string, password as string);
    setFavourited(!favourited);
    event.preventDefault();
    event.stopPropagation();
  }

  const containerStyle = {
    width: '110vw',
    height: '110vh'
  };
    
  return(
    <div>
      <PopUp show={displayPopUp} type="edit" closeHandler={() => setDisplayPopUp(false)}/>
      <Navbar/>
      <div className="map-container">
        <div className="hike-description">
          <div className="back-button" onClick={() => navigate("/allhikes")}>
            <FiChevronLeft className="back-icon"/>
          </div>
          <div className="hike-card-title" onClick={() => setDisplayPopUp(true)}>
            {
              hike?.path_name === null ? "Unnamed" : hike?.path_name
            }
            <div
              className="favourites-icon-container"
              onClick={(event) => onFavouritedPress(event)}
            >
              <FiHeart
                className={`favourites-icon ${favourited ? "fill-heart" : ""}`}
              />
            </div></div>
          <div className="hike-date"> 
            {
              hike?.date.toLocaleDateString()
            }
          </div>
          <div className="hike-instructions thin-text"> Tap Memories to Upload Photos </div>
        </div>
        {
          path.length === 0 ? (null) :
          (
            <Map
              path={path}
              audio={audio}
              containerStyle={containerStyle}
            />
          )
        }
        <MapMenu />
      </div>
    </div>

  )
};

export default SingleView;