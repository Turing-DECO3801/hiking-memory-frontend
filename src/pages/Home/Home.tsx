import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import { FiArrowRight, FiVolume2, FiCamera } from 'react-icons/fi/'
import { Pagination, Navigation } from "swiper";
import "./Home.scss"
import Highlights from './Highlights/Highlights';
import PhotoCollection from './PhotoCollection/PhotoCollection';
import PopUp from '../../components/common/PopUp/PopUp';
import { useNavigate } from 'react-router-dom';

import { getHikes, getImageCollection } from '../../api';
import { AuthContext } from '../../contexts/AuthContext';
import { HikeContext } from '../../contexts/HikeContext';
import { PhotosContext } from '../../contexts/PhotosContext';
import Loading from '../../components/common/Loading/Loading';

const Home = () => { 

  const { name, email, password } = useContext(AuthContext);
  const { setHikeData } = useContext(HikeContext);
  const { updateSelectedGallery, setGalleryStatus } = useContext(PhotosContext);

  const [latestHike, setLatestHike] = useState<HikeData>();
  const [allHikes, setAllHikes] = useState<HikeData[]>();
  const [imageCollection, setImageCollection] = useState<ImageInfo[]>();

  const navigate = useNavigate();

  useEffect(() => {
    getHikeData()
  }, [])

  const getHikeData = async () => {
    const hikes = await getHikes(email as string, password as string) as HikeData[];

    for (const hike of hikes) {
      hike.date = new Date(hike.start_time);
    }

    hikes.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    })     

    setLatestHike(hikes[hikes.length - 1]);
    setHikeData(hikes[hikes.length - 1]);
    setAllHikes(hikes);
    hikes[hikes.length - 1].date = new Date(hikes[hikes.length - 1].start_time as string)

    const images = await getImageCollection(email as string, password as string) as ImageInfo[];

    setImageCollection(images);
  }

  /**
   * Open single hike view with the correct hike being displayed
   */
  const openHike = () => {
    setHikeData(latestHike as HikeData);

    navigate('/singleview')
  }

  const openAllPhotos = () => {
    updateSelectedGallery(0);
    setGalleryStatus(false);
    navigate('/photos')
  }

  return (
    <div className="home">
      {/* <div className={`page-loading-container ${latestHike === undefined ? "" : "loading-inactive"}`}>
        <Loading />
      </div>
      {
        latestHike === undefined ? <></>
        : 
        <>         */}
          <Navbar />
          <br />
          <h2 className="section">Welcome Back {name}!</h2>
          <br />
          <div className="latest-hike section delay-1">
            <div className="left-half">
              <h5>View your latest hike</h5>
              <div className="thin-text latest-hike-name">
                {
                  latestHike?.path_name === null ? "Unnamed " : `${latestHike?.path_name} `
                }
                {
                  latestHike?.date === undefined ? "" : latestHike?.date.toLocaleDateString()
                }
              </div>
            </div>
            <div className="notification-button" onClick={() => openHike()}>
              <FiArrowRight className="arrow-right"/>
            </div>
            <div className="icons">
              <div className="camera-icon-container">
                <FiCamera className="camera-icon" />
              </div>
              <div className="sound-icon-container">
                <FiVolume2 className="volume-icon" />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="section delay-2">
            <div className="section-header">
              <h4>Highlights</h4>
            </div>
            <Highlights hikes={allHikes}/>
          </div>
          <br />
          <div className="section delay-3">
            <div className="section-header">
              <h4>Photo Collections</h4>
              <div className="link" onClick={() => openAllPhotos()}>see all</div>
            </div>
            <PhotoCollection images={imageCollection}/>
          </div>
          {
            latestHike === undefined || (latestHike?.viewed === 1) || (latestHike?.path_name !== null) ? 
            null : <PopUp show={true} type="new"/>
          }
        {/* </>
      } */}

    </div>
  );
  
};

export default Home;
