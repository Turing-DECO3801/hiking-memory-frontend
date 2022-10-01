import React, {  useState } from 'react';
import "./AllHikes.scss"
import { useSwipeable, LEFT, RIGHT, SwipeEventData } from 'react-swipeable'; 
import Map from '../../components/common/Map/Map';
import { FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';

interface HikeCardProps {
  hike: Hike,
  displayPopUp: (display: boolean) => void 
}

interface Hike {
  title: string,
  date: string,
  time: string,
  path: any[],
}

const HikeCard = ({ hike, displayPopUp }: HikeCardProps) => {

  const [swiped, setSwiped] = useState(false);

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

  const containerStyle = {
    width: '100%',
    height: '110px'
  };

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
    </div>
  )
};

export default HikeCard;
