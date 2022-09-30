import React, { useContext, useState } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import { HikeContext } from '../../contexts/HikeContext';
import "./AllHikes.scss"
import { FiSearch, FiCheck } from 'react-icons/fi/'
import HikeCard from './HikeCard';
import PopUp from '../../components/common/PopUp/PopUp';

const AllHikes = () => { 
  const hikeContext = useContext(HikeContext);

  const [selectionType, setSelectionType] = useState("all");
  const [sortType, setSortType] = useState("recent");
  const [searchOpen, setSearchOpen] = useState(false);
  const [displayPopUp, setDisplayPopUp] = useState(false);

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

  const [isShown, setIsShown] = useState(false);

  const handleClick = (event: any) => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  const getPopUp = () => {
    return <PopUp show={displayPopUp} type={"delete"} closeHandler={() => setDisplayPopUp(false)}/>
  }

  return (
    <div className="content">
      {
        getPopUp()
      }
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
          {hikeInfo.map((hike, index) => <HikeCard key={index} hike={hike} displayPopUp={setDisplayPopUp}/>)}
      </div>
    </div>
  );
  
};

export default AllHikes;

