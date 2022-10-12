import React, { useEffect, useState } from "react";
import Chart from '../../../../images/distance.png';

interface HighlightCardProps {
    hikes?: HikeData[]
}

const AverageDistance = ( { hikes }: HighlightCardProps) => {

  const [distance, setDistance] = useState(0);
 
  useEffect(() => {
    let totalDistance = 0;
    let count = 0;
    if (hikes === undefined) return
    for (const hike of hikes) {
      if (hike.distance !== null) {
        totalDistance += hike.distance;
        count++;
      }
    }
    setDistance(totalDistance / count / 1000)

  }, [hikes])

  return (
    <div className="highlight-card">
      <div className="card-text">
        The <span className="highlighted-text">average distance</span> you travel on a hike
      </div>
      <div className="graph-container average-distance">
        <img className="distance-image" src={Chart} />
        <div className="distance-label">
          <div className="distance-value">
            {distance.toFixed(2)}
          </div>
          <div className="distance-units">km</div>
        </div>
      </div>
    </div>
  )
}

export default AverageDistance;