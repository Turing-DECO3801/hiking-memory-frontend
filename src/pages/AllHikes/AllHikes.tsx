import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import "./AllHikes.scss"
import { FiSearch, FiCheck } from 'react-icons/fi/'
import HikeCard from './HikeCard';
import PopUp from '../../components/common/PopUp/PopUp';
import { AuthContext } from '../../contexts/AuthContext';
import { getHikes } from '../../api';

const AllHikes = () => { 
  
  // Auth Contexts for User ID 
  const { email, password } = useContext(AuthContext);

  /**
   * Use State hooks for render updates on variable changes
   */
  const [selectionType, setSelectionType] = useState("all");
  const [sortType, setSortType] = useState("recent");
  const [searchOpen, setSearchOpen] = useState(false);
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [hikeData, setHikeData] = useState(Array<HikeData>);
  const [isShown, setIsShown] = useState(false);
  const [selected, setSelected] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  /**
   * Fetch the data on page load
   */
  useEffect(() => {
    getHikeData();
  }, [])

  /**
   * Gets all of the hike data and sorts them based on time
   */
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

  /**
   * Updates the value of the keywords for search
   * 
   * @param event On Input Change Event
   */
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedSearch(event.currentTarget.value)
  }

  /**
   * Prevents the search from occurring immediately but only after a delay
   */
  useEffect(() => {
    const timerId = setTimeout(() => {
        setDebouncedSearch(debouncedSearch);
    }, 500)
    return () => {
        clearTimeout(timerId);
    }
  }, [debouncedSearch]);

  /**
   * Updates the order of the hikes list based on the current sorting method
   */
  useEffect(() => {
    
    const newHikes = [...hikeData];

    if (sortType === "longest") {
      newHikes.sort((a, b) => {
        if (a.distance === null) {
          return 1
        } else if (b.distance === null) {
          return -1
        }
        return b.distance - a.distance;
      })
    } else if (sortType === "shortest") {
      newHikes.sort((a, b) => {
        if (a.distance === null) {
          return 1
        } else if (b.distance === null) {
          return -1
        }
        return a.distance - b.distance;
      })
    } else if (sortType === "recent") {
      newHikes.sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
      })     
    } else {
      newHikes.sort((a, b) => {
        if (a.path_name === null) {
          return 1
        } else if (b.path_name === null) {
          return -1
        }
        return a.path_name.localeCompare(b.path_name);
      })   
    }

    setHikeData(newHikes);

  }, [sortType])

  /**
   * Alternates the status of whether the hikes should be shown or not
   */
  const handleClick = () => {
    setIsShown(current => !current);
  };

  /**
   * Gets the PopUp to be displayed if a user decides to delete a hiek
   * 
   * @returns PopUp JSX Element with the Delete Type
   */
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
                className={`selection-option ${sortType === "alphabetical" ? "selected" : ""}`}
                onClick={() => setSortType("alphabetical")}
              >
                Alphabetical
                <FiCheck className={`selection-icon ${sortType === "alphabetical" ? "tick-active" : ""}`}/>
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
            {hikeData
              .map((hike, index) => {
                if (hike.favourite === 1 && selectionType === "favourites" || selectionType === "all") {
                  if (hike.path_name?.toLowerCase().includes(debouncedSearch.toLowerCase())) {
                    return (
                      <HikeCard key={index} hike={hike} selected={selected} displayPopUp={setDisplayPopUp}/>
                    )
                  }
                }
              })
              }
        </div>
      </div>
    </>
  );
  
};

export default AllHikes;

