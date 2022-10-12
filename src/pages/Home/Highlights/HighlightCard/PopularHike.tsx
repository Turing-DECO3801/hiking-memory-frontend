import React, { useEffect, useState } from 'react';
import Podium from '../../../../images/podium.png';
interface HighlightCardProps {
  hikes?: HikeData[]
}

const PopularHike = ({ hikes }: HighlightCardProps) => {

  const [popularHike, setPopularHike] = useState(""); 

  /**
   * Finds the name of the hike that occurs the most times
   */
  useEffect(() => {
    if (hikes === undefined) return;
    const map = new Object() as any;

    for (const hike of hikes) {
      // The path does not yet exist
      if (hike.path_name !== null) {
        if (map[hike.path_name] === undefined) {
          map[hike.path_name] = 1;
        } else {
          map[hike.path_name] = map[hike.path_name] + 1;
        }
      }
    }
    let mostCommonPath = "";
    let currentMax = 0;
    for (const path in map) {
      if (map[path] > currentMax) {
        currentMax = map[path];
        mostCommonPath = path;
      }
    }

    setPopularHike(mostCommonPath);

  }, [hikes])

  return (
    <div className="highlight-card">
      <div className="card-text">
        Your most <span className="highlighted-text">popular</span> hike path is 
      </div>
      <div className="image-container">
        {popularHike}
        <img className="podium-image" src={Podium} />
      </div>
    </div>
  )
}

export default PopularHike