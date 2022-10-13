import React, { useEffect, useState} from 'react';
import { FiTrendingUp, FiTrendingDown, FiActivity } from 'react-icons/fi'
import "./HighlightCard.scss"

interface HighlightCardProps {
  hikes?: HikeData[]
}

const HikeCount = ({ hikes }: HighlightCardProps) => {

  const [currentDate, setCurrentDate] = useState<Date>();
  const [previousDate, setPreviousDate] = useState<Date>();
  const [currentCount, setCurrentCount] = useState(0);
  const [previousCount, setPreviousCount] = useState(0);

  useEffect(() => {
    const date = new Date();
    const previousDate = new Date();

    previousDate.setDate(previousDate.getDate() - 30);

    setCurrentDate(date);
    setPreviousDate(previousDate);
  }, [])

  useEffect(() => {
    if (hikes === undefined) return;
    const currentLength = hikes?.filter(hike => {
      return (
        (new Date(hike.start_time)).toLocaleDateString('default', { month: "long" })
          === currentDate?.toLocaleDateString('default', { month: "long" })
      )
    }).length

    setCurrentCount (currentLength);

    const previousLength = hikes?.filter(hike => {
      return (
        (new Date(hike.start_time)).toLocaleDateString('default', { month: "long" })
          === previousDate?.toLocaleDateString('default', { month: "long" })
      )
    }).length

    setPreviousCount(previousLength);
  }, [hikes])

  /**
   * Determines what text needs to be displayed
   * 
   * @returns Text defining the type of relationship
   */
  const getEquality = () => {
    if (previousCount === currentCount) {
      return <span className="highlighted-text">the same number of</span>;
    } else if (previousCount < currentCount) {
      return <span className="highlighted-text">more</span>;
    } else  {
      return <span className="highlighted-text">less</span>;
    }
  }

  /**
   * Determines what icon needs to be displayed
   * 
   * @returns Icon determined by the month relationship
   */
  const getIcon = () => {
    if (previousCount === currentCount) {
      return <FiActivity className="bar-highlight-icon"/>
    } else if (previousCount < currentCount) {
      return <FiTrendingUp className="bar-highlight-icon"/>
    } else {
      return <FiTrendingDown className="bar-highlight-icon"/>
    }
  }

  const getCurrentWidth = () => {
    if (currentCount >= previousCount) {
      return "75%";
    } else {
      return `${75 * currentCount / previousCount}%`;
    }
  }

  const getPreviousWidth = () => {
    if (previousCount >= currentCount) {
      return "75%";
    } else {
      return `${75 * previousCount / currentCount}%`;
    }
  }

  return (
    <div className="highlight-card">
      <div className="card-text">
        You did {getEquality()} hikes this month compared to last {getIcon()}
      </div>
      <div className="bar-graphs">
        <div className="bar current" >
          <div className="current-month" style={{width: `${getCurrentWidth()}`}}>
            <div className="month-label">
              {currentDate?.toLocaleDateString('default', {month: "long"})}
            </div>
          </div>
          <div className="hike-label">
            <div className="hike-number">
              {currentCount}
            </div>
            hikes
          </div>
        </div>
        <div className="bar last">
          <div className="last-month"  style={{width: `${getPreviousWidth()}`}}>
          <div className="month-label">
              {previousDate?.toLocaleDateString('default', {month: "long"})}
            </div>
          </div>
          <div className="hike-label">
            <div className="hike-number">
              {previousCount}
            </div>
            hikes
          </div>
        </div>
      </div>
    </div>
  );

};

export default HikeCount;

