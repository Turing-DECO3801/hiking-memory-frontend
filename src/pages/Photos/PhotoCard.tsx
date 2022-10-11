import React from 'react';
import "./Photos.scss";

interface PhotoCardProps {
  onClick: () => void;
  thumbnail: ImageInfo
}

const PhotoCard = ({ onClick, thumbnail }: PhotoCardProps) => {

  return (
    <div className="photo-card" onClick={onClick}>
      <img className="photo-card-image" src={thumbnail.imageUrl} />
      <div className="banner">
        <div className="banner-header">{thumbnail.path_name}</div>
      </div>
    </div>
  );

};

export default PhotoCard;

