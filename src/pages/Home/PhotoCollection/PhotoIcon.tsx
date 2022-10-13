import React from 'react';
import "./PhotoCollection.scss";

interface PhotoIconProps {
  image: ImageInfo
  onClick: () => void
}

const PhotoIcon = ({ image, onClick }: PhotoIconProps ) => {

  return (
    <div className="mini-photo-card" onClick={onClick}>
      <div className="photo-card-path">
        {image.path_name}
      </div>
      <img src={image.imageUrl} />
    </div>
  );
  
};

export default PhotoIcon;

