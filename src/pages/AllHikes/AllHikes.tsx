import React, { useContext } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Map from '../../components/common/Map/Map';
import { HikeContext } from '../../contexts/HikeContext';
import "./Box.scss"
import { FiSearch } from 'react-icons/fi/'


interface Hike {
  title: string,
  date: string,
  time: string,
  path: any[],
};


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
  
  const renderCard = (hike: Hike, index: number) => {
    return( 
      <div className="hike-card">
        <div className="hike-map">
          {/*<Map path={hike.path} audio={hike.path} containerStyle={containerStyle}/>*/}
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
      <div className="filters">
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
            <div className="sort-by-card">
              Sort By
            </div>
          </div>
          <div className="search">
            <div className="search-card">
              <FiSearch className="search-icon"/>
            </div>
          </div>
      </div>

      <div className="select">
        Select
      </div>
      

      <div className="grid">
          {hikeInfo.map(renderCard)}
      </div>
    </div>
  );
  
};

export default AllHikes;

