import React, { useEffect, useState } from "react";
import Path from '../../../../images/path.png';

interface HighlightCardProps {
  hikes?: HikeData[]
}

const TotalDistance = ({ hikes }: HighlightCardProps) => {

  const [distance, setDistance] = useState(0);

  /**
   * Updates the value of the total distance hiked for the current month
   * whenever the hike data changes
   */
  useEffect(() => {
    const date = new Date();

    const filteredHikes = hikes?.filter(hike => {
      return (
        (new Date(hike.start_time)).toLocaleDateString('default', { month: "long" })
        === date?.toLocaleDateString('default', { month: "long" })
      )
    })

    let totalDistance = 0;
    if (filteredHikes !== undefined)
    for (const hike of filteredHikes) {
      if (hike.distance !== null) {
        totalDistance += hike.distance
      }
    }
    setDistance(totalDistance / 1000);
  }, [hikes])

  return (
    <div className="highlight-card">
      <div className="card-text">
        The <span className="highlighted-text">total distance</span> you traveled this month
      </div>
      <div className="path-container">
        <div className="total-distance">
          {distance.toFixed(2)}
          <span className="distance-units">km</span>
        </div>
        <img className="path-image" src={Path} />
      </div>
    </div>
  )
}

export default TotalDistance;