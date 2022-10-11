import React from 'react';
import "./PhotoCollection.scss";

interface PhotoIconProps {
  image: ImageInfo
}

const PhotoIcon = ({ image }: PhotoIconProps ) => {

  return (
    <div className="mini-photo-card">
      <div className="photo-card-path">
        {image.path_name}
      </div>
      <img src={image.imageUrl} />
    </div>
  );
  
};

export default PhotoIcon;

