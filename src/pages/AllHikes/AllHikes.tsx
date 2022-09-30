import React, { useContext, useState } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Map from '../../components/common/Map/Map';
import { HikeContext } from '../../contexts/HikeContext';
import "./AllHikes.scss"
import { FiSearch } from 'react-icons/fi/'


interface Hike {
  title: string,
  date: string,
  time: string,
  path: any[],
}


const AllHikes = () => { 
  const hikeContext = useContext(HikeContext);

  const pathExample = [{ lat: 37, lng: -122 },
    { lat: 37, lng: -121 },
    { lat: 38, lng: -121 },
    { lat: 38, lng: -122 }];

  const hikeInfo = [ 
    {title: 'Hike 1', date: '26/01/2022', time: '8:30am', path: pathExample}, 
    {title: 'Hike 2', date: '26/01/2022', time: '8:30am', path: pathExample},
    {title: 'Hike 3', date: '26/01/2022', time: '8:30am', path: pathExample}, 
    {title: 'Hike 4', date: '26/01/2022', time: '8:30am', path: pathExample}, 
    {title: 'Hike 5', date: '26/01/2022', time: '8:30am', path: pathExample},
    {title: 'Hike 6', date: '26/01/2022', time: '8:30am', path: pathExample},
    {title: 'Hike 7', date: '26/01/2022', time: '8:30am', path: pathExample},
    {title: 'Hike 8', date: '26/01/2022', time: '8:30am', path: pathExample}
  ];

  const containerStyle = {
    width: '100%',
    height: '110px'
  };

  const [isShown, setIsShown] = useState(false);

  const handleClick = (event: any) => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };
  
  const renderCard = (hike: Hike, index: number) => {
    return( 
      <div className="hike-card">
        <div className="hike-map">
          {/* <Map path={hike.path} audio={hike.path} containerStyle={containerStyle}/> */}
        </div>
        <div className="hike-info">
          <div className="hike-date-time"> 
            <div className="hike-date">
              <span className="hike-date-time-text"> {hike.date}</span>
            </div>
            <div className="hike-time">
              <span>{hike.time}</span>
            </div>
          </div>
          <div className="hike-title">
              {hike.title}
           </div>
        </div>
      </div>
    )
  }

  return (
    <div className="content">
      <Navbar />
      <br/>
      <br/>
      <div className="filters section">
          <div className="all-favourites">
            <div className="all-favourites-card">
              <div className="all">
                All
              </div>
              <div className="favourites">
                Favourites
              </div>
            </div>
          </div>
          <div className="sort-by">
            <div onClick={handleClick} className="sort-by-card">
              Sort By
            </div>
          </div>
          <div className="search">
            <div className="search-card">
              <FiSearch className="search-icon"/>
            </div>
          </div>
      </div>
      <div className="select section">
        Select
      </div>

      {isShown ? (
        <div className="drop-down">
          <div>
            Longest Distance
          </div>
          <div>
            Shortest Distance
          </div>
          <div>
            Most Travelled
          </div>
          <div>
            Most Recent
          </div>
        </div>
        ): <></>}

      

      <div className="grid section delay-2">
          {hikeInfo.map(renderCard)}
      </div>
    </div>
  );
  
};

export default AllHikes;

