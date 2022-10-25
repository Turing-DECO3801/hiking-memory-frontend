import React, {  useState, useEffect, useContext } from 'react';
import "./AllHikes.scss"
import { useSwipeable, LEFT, RIGHT, SwipeEventData } from 'react-swipeable'; 
import { FiX, FiHeart } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';
import { setFavourite } from '../../api';
import { AuthContext } from '../../contexts/AuthContext';
import { HikeContext } from '../../contexts/HikeContext';
import Map from '../../components/common/Map/Map';


interface HikeCardProps {
  hike: HikeData,
  displayPopUp: (display: boolean) => void
  selected: boolean,
}

const HikeCard = ({ hike, displayPopUp, selected }: HikeCardProps) => {

  const { email, password  } = useContext(AuthContext);
  const { setHikeData } = useContext(HikeContext);

  const [swiped, setSwiped] = useState(false);
  const [favourited, setFavourited] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setSwiped(selected);
  }, [selected])

  /**
   * Container used for the map API thumbnail
   */
  const containerStyle = {
    width: '20%',
    height: '110px'
  };

  /**
   * Setting favourite based on data from the database
   */
  useEffect(() => {
    setFavourited(hike.favourite === 1 ? true : false);
  }, [])

  /**
   * Functionality that occurs when the favourite button is pressed
   * 
   * @param event Click Event
   */
  const onFavouritedPress = (event: React.MouseEvent<HTMLElement>) => {
    setFavourite(favourited === true ? 0 : 1, hike.id, email as string, password as string);
    setFavourited(!favourited);
    hike.favourite = hike.favourite === 1 ? 0 : 1;

    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Navigatess to the particular hike if it is selected
   */
  const openSingleHike = () => {
    setHikeData(hike);
    navigate("/singleview")
  }

  /**
   * Opens the delete hike popup
   */
  const deletePopup = () => {
    setHikeData(hike);
    displayPopUp(true)
  }

  /**
   * Opens the delete option on card swipe
   * 
   * @param eventData Information provided with the current swipe
   */
  const handleSwiped = (eventData: SwipeEventData) => {
    if (eventData.dir === LEFT) {
      if (swiped) {
        displayPopUp(true)
      } else {
        setSwiped(true);
      }
    } else if (eventData.dir === RIGHT) {
      setSwiped(false);
    }
  }

  // const pathExample = [
  //   { lat: 37, lng: -122 },
  // ];

  /**
   * Swipe Handler for select to delete functionaliy on left swip
   */
  const handlers = useSwipeable({
    onSwiped: handleSwiped,
    touchEventOptions: { passive: false },
    preventScrollOnSwipe: false,
  });

  const getTime = () => {
    if (hike.date.getHours() === 12) {
      return (
        `12:${hike.date.getMinutes()}${hike.date.getHours() < 12 ? "am" : "pm"}`
      )
    }
    return (
      `${hike.date.getHours() % 12}:${hike.date.getMinutes()}${hike.date.getHours() < 12 ? "am" : "pm"}`
    )
  }

  return( 
    <div className="hike-card-container">
      <div className="hike-card-delete">
        <FiX className="delete-icon"
          onClick={() => deletePopup()}
        />
      </div>
      <div
        className={`hike-card ${swiped ? "hike-card-selected" : ""}`} {...handlers}
        onClick={openSingleHike}
      >
        <div className="hike-map">
          {/* <Map path={pathExample} containerStyle={containerStyle} mini={true}/> */}
        </div>
        <div className="hike-info">
          <div className="hike-date-time"> 
            <div className="hike-date">
              <span className="hike-date-time-text">
                {/** Formatting of Date */}
                {hike?.date.toLocaleDateString()}
              </span>
            </div>
            <div className="hike-time">
                {/** Formatting of Time */}
              <span>
                {
                  getTime()
                }
              </span>
            </div>
          </div>
          <div className="hike-title">
              {hike.path_name === null ? "Unnamed Hike" : hike.path_name}
              <div
                className="favourites-icon-container"
                onClick={(event) => onFavouritedPress(event)}
              >
                <FiHeart
                  className={`favourites-icon ${favourited ? "fill-heart" : ""}`}
                />
              </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default HikeCard;
