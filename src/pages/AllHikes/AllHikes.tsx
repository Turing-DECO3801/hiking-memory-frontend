import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import { HikeContext } from '../../contexts/HikeContext';
import "./AllHikes.scss"
import { FiSearch, FiCheck } from 'react-icons/fi/'
import HikeCard from './HikeCard';
import PopUp from '../../components/common/PopUp/PopUp';
import { FiChevronLeft } from 'react-icons/fi/'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { getHikes } from '../../api';

const AllHikes = () => { 
  
  const { email, password  } = useContext(AuthContext);

  const [selectionType, setSelectionType] = useState("all");
  const [sortType, setSortType] = useState("recent");
  const [searchOpen, setSearchOpen] = useState(false);
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [hikeData, setHikeData] = useState(Array<HikeData>);
  const [isShown, setIsShown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState(false);

  // Fetch the data on page load
  useEffect(() => {
    getHikeData();
  }, [])

  const navigate = useNavigate();

  const pathExample = [
    { lat: 37, lng: -122 },
    { lat: 37, lng: -121 },
    { lat: 38, lng: -121 },
    { lat: 38, lng: -122 }
  ];

  const getHikeData = async () => {
    const hikes = await getHikes(email as string, password as string) as Array<HikeData>;
    for (const hike of hikes) {
      hike.date = new Date(hike.start_time);
    }

    hikes.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    })

    setHikeData(hikes);
  }

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value)
  }

  const handleClick = (event: any) => {
    setIsShown(current => !current);
  };

  const getPopUp = () => {
    return <PopUp show={displayPopUp} type={"delete"} closeHandler={() => setDisplayPopUp(false)}/>
  }

  return (
    <>
      <div className="header">
        <br />
        <h2 className="section">My Hikes</h2>
        {
          getPopUp()
        }
        <Navbar />
      </div>
      <div className="content">
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
          <div className={`sort-by`}>
            <div
              onClick={handleClick}
              className={`sort-by-card ${isShown ? "sort-by-active" : ""}`}>
              Sort By
            </div>
            <div className={`drop-down ${isShown ? "drop-down-active" : ""}`}>
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
            <div className="search">
              <input
                className={`search-bar ${searchOpen ? "search-bar-active" : ""}`}
                onChange={onSearchChange}
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
        <div className="select section" onClick={() => setSelected(!selected)}>
          Select
        </div>
        <div className="grid section delay-2">
            {hikeData.map((hike, index) => <HikeCard key={index} hike={hike} selected={selected} displayPopUp={setDisplayPopUp}/>)}
        </div>
      </div>
    </>
  );
  
};

export default AllHikes;

