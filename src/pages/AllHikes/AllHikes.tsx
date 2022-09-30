import React, { useContext, useState } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Map from '../../components/common/Map/Map';
import { HikeContext } from '../../contexts/HikeContext';
import "./AllHikes.scss"
import { FiSearch, FiCheck } from 'react-icons/fi/'


interface Hike {
  title: string,
  date: string,
  time: string,
  path: any[],
}


const AllHikes = () => { 
  const hikeContext = useContext(HikeContext);

  const [selectionType, setSelectionType] = useState("all");
  const [sortType, setSortType] = useState("recent");
  const [searchOpen, setSearchOpen] = useState(false);

  const pathExample = [{ lat: 37, lng: -122 },
    { lat: 37, lng: -121 },
    { lat: 38, lng: -121 },
    { lat: 38, lng: -122 }];

  const hikeInfo = [ 
    {title: 'Kondalilla Falls', date: '26/01/2022', time: '8:30am', path: pathExample}, 
    {title: 'Mount Coot-Tha', date: '26/01/2022', time: '8:30am', path: pathExample},
    {title: 'Kondalilla Falls', date: '26/01/2022', time: '8:30am', path: pathExample}, 
    {title: 'Mount Coot-Tha', date: '26/01/2022', time: '8:30am', path: pathExample},
    {title: 'Kondalilla Falls', date: '26/01/2022', time: '8:30am', path: pathExample}, 
    {title: 'Mount Coot-Tha', date: '26/01/2022', time: '8:30am', path: pathExample},
    {title: 'Kondalilla Falls', date: '26/01/2022', time: '8:30am', path: pathExample}, 
    {title: 'Mount Coot-Tha', date: '26/01/2022', time: '8:30am', path: pathExample},
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
      <br />
      <div className="filters section">
        <div className="all-favourites">
          <div className="all-favourites-card">
            <div 
              className={`all ${selectionType === "all" ? "selected" : ""}`}
              onClick={() => setSelectionType("all")}
            >
              All
            </div>
            <div
              className={`favourites ${selectionType === "all" ? "" : "selected"}`}
              onClick={() => setSelectionType("favourites")}  
            >
              Favourites
            </div>
          </div>
        </div>
        <div className="sort-by">
          <div
            onClick={handleClick}
            className={`sort-by-card ${isShown ? "sort-by-active" : ""}`}>
            Sort By
          </div>
          {isShown ? (
          <div className="drop-down">
            <div
              className={`selection-option ${sortType === "recent" ? "selected" : ""}`}
              onClick={() => setSortType("recent")}
            >
              Most Recent
              <FiCheck className={`selection-icon ${sortType === "recent" ? "tick-active" : ""}`}/>
            </div>
            <div className="divider" />
            <div
              className={`selection-option ${sortType === "longest" ? "selected" : ""}`}
              onClick={() => setSortType("longest")}
            >
              Longest Distance
              <FiCheck className={`selection-icon ${sortType === "longest" ? "tick-active" : ""}`}/>
            </div>
            <div className="divider" />
            <div
              className={`selection-option ${sortType === "shortest" ? "selected" : ""}`}
              onClick={() => setSortType("shortest")}
            >
              Shortest Distance
              <FiCheck className={`selection-icon ${sortType === "shortest" ? "tick-active" : ""}`}/>
            </div>
            <div className="divider" />
            <div
              className={`selection-option ${sortType === "most" ? "selected" : ""}`}
              onClick={() => setSortType("most")}
            >
              Most Travelled
              <FiCheck className={`selection-icon ${sortType === "most" ? "tick-active" : ""}`}/>
            </div>
            <div className="divider" />
          </div>
          ): <></>}
          <div className="search">
            <input
              className={`search-bar ${searchOpen ? "search-bar-active" : ""}`}
            /> 
            <div
              className={`search-card ${searchOpen ? "search-active" : ""}`}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FiSearch className={`search-icon ${searchOpen ? "search-icon-active" : ""}`}/>
            </div>
          </div>
        </div>
      </div>
      <div className="select section">
        Select
      </div>

      

      <div className="grid section delay-2">
          {hikeInfo.map(renderCard)}
      </div>
    </div>
  );
  
};

export default AllHikes;

