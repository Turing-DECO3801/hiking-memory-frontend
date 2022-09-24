import React from 'react';
import "./Photos.scss";

interface PhotoCardProps {
  onClick: () => void;

}

const PhotoCard = ({ onClick }: PhotoCardProps) => {

  return (
    <div className="photo-card" onClick={onClick}>
      <div className="banner">
        <div className="banner-header">Kondalilla Falls</div>
      </div>
    </div>
  );

};

export default PhotoCard;

