import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Map from '../../components/common/Map/Map';
import { HikeContext } from '../../contexts/HikeContext';
import "./HikeTitle.scss"
import { pathExample } from './pathExample';
import MapMenu from '../../components/common/MapMenu/MapMenu';
import { FiChevronLeft, FiHeart } from 'react-icons/fi/'
import { useNavigate } from 'react-router-dom';
import PopUp from '../../components/common/PopUp/PopUp';
import { getAHike } from '../../api';
import { AuthContext } from '../../contexts/AuthContext';

interface PathType {
  lat: number,
  lng: number
}

interface Audio {
  id: number,
  location: PathType,
  audioFile: string,
  imageFile: string,
  notes: string,
  transcript: string
}

const SingleView = () => {
     
  // const audioEx = [{location: {lat: -27.360349, lng: 152.963009}, audioFile: "./test.mp3", imageFile: "./image1.jpg"}, 
  //                   {location: {lat: -27.346084, lng: 152.975356}, audioFile: "./test2.mp3", imageFile: "./image2.jpg"}];
  const singleHikeInfo = {title: 'Afternoon Hike', date: "31/08/2022", path: pathExample};
 

  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [favourited, setFavourited] = useState(false);
  const [path, setPath] = useState(Array<PathType>);
  const [audio, setAudio] = useState(Array<Audio>);

  const { hike } = useContext(HikeContext);
  const { email, password } = useContext(AuthContext); 

  useEffect(() => {
    loadSingleHikeData();
  }, []);

  const loadSingleHikeData = async () => {
    const data = await getAHike(hike?.id as number, email as string, password as string) as any;
    
    const decoder = new TextDecoder("utf-8");
    const csvData = decoder.decode(new Uint8Array(data.logs.Body.data))
    const split = csvData.split('\r\n');
    const hikePath = [];

    // Parsing Hiking Data into JSON 
    for (let line of split) {
      if (line === "") continue;
      const coord = line.split(',');
      hikePath.push({
        'lat': Number(coord[0]),
        'lng': Number(coord[1])
      })
    }

    console.log(data.memos);
    
    // Parsing Audio Adata into compatible format
    const memos = []
    for (let memo of data.memos) {
      memos.push({
        id: memo.id,
        location: {
          'lat': memo.longitude,
          'lng': memo.latitude
        },
        audioFile: memo.audioUrl,
        imageFile: '',
        notes: memo.notes,
        transcript: memo.transcription
      })
    }
    setAudio(memos)
    setPath(hikePath);
  }

  const getPopUp = () => {
    return <PopUp show={displayPopUp} type="edit" closeHandler={() => setDisplayPopUp(false)}/>
  }

  const onFavouritedPress = (event: React.MouseEvent<HTMLElement>) => {
    setFavourited(!favourited);
    event.preventDefault();
    event.stopPropagation();
  }

  const containerStyle = {
    width: '110vw',
    height: '110vh'
  };
  
  const navigate = useNavigate();
  

  return(
    <div>
      {
        getPopUp()
      }
      <Navbar/>
      <div className="map-container">
        <div className="hike-description">
          <div className="back-button" onClick={() => navigate("/allhikes")}>
            <FiChevronLeft className="back-icon"/>
          </div>
          <div className="hike-card-title" onClick={() => setDisplayPopUp(true)}> {singleHikeInfo.title}
              <div
                className="favourites-icon-container"
                onClick={(event) => onFavouritedPress(event)}
              >
                <FiHeart
                  className={`favourites-icon ${favourited ? "fill-heart" : ""}`}
                />
              </div></div>
          <div className="hike-date"> {singleHikeInfo.date} </div>
          <div className="hike-instructions thin-text"> Tap Memories to Upload Photos </div>
        </div>
        {
          path.length === 0 ? 
          (
            null
          )
          :
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