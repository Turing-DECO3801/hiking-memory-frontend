import React, {  useState, useEffect, useContext } from 'react';
import "./AllHikes.scss"
import { useSwipeable, LEFT, RIGHT, SwipeEventData } from 'react-swipeable'; 
import Map from '../../components/common/Map/Map';
import { FiX, FiHeart } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';
import { setFavourite } from '../../api';
import { AuthContext } from '../../contexts/AuthContext';


interface HikeCardProps {
  hike: HikeData,
  displayPopUp: (display: boolean) => void 
}

interface HikeData {
  id: number,
  email: string,
  gps_logs: string,
  distance: number | null,
  start_time: string,
  end_time: string,
  path_name: string | null,
  favourite: number,
  date: Date
}

const HikeCard = ({ hike, displayPopUp }: HikeCardProps) => {

  const { email, password  } = useContext(AuthContext);

  const [swiped, setSwiped] = useState(false);
  const [favourited, setFavourited] = useState(false);

  const navigate = useNavigate();

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

  /**
   * Container used for the map API thumbnail
   */
  const containerStyle = {
    width: '100%',
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

    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Swipe Handler for select to delete functionaliy on left swip
   */
  const handlers = useSwipeable({
    onSwiped: handleSwiped,
    touchEventOptions: { passive: false },
    preventScrollOnSwipe: false,
  });

  return( 
    <div className="hike-card-container">
      <div className="hike-card-delete">
        <FiX className="delete-icon"
          onClick={() => displayPopUp(true)}
        />
      </div>
      <div
        className={`hike-card ${swiped ? "hike-card-selected" : ""}`} {...handlers}
        onClick={() => navigate("/singleview")}
      >
        <div className="hike-map">
          {/* <Map path={hike.path} containerStyle={containerStyle} mini={true}/> */}
        </div>
        <div className="hike-info">
          <div className="hike-date-time"> 
            <div className="hike-date">
              <span className="hike-date-time-text">
                {/** Formatting of Date */}
                {`${hike.date.getFullYear()}/${hike.date.getMonth() + 1}/${hike.date.getDay() + 1}`}
              </span>
            </div>
            <div className="hike-time">
                {/** Formatting of Time */}
              <span>
                {`${hike.date.getHours() % 12}:${hike.date.getMinutes()}${hike.date.getHours() < 12 ? "am" : "pm"}`}
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
