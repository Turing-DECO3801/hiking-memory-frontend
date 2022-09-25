import React from 'react';
import "./Photos.scss";
import { Image } from "react-grid-gallery";

interface GalleryImageProps {
  image: Image;
  onClick: () => void;
}

const GalleryImage = ({ image, onClick }: GalleryImageProps) => {

  const preventPropogation = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  }

  return (
    <div className="gallery-card" onClick={onClick}>
      <div className="gallery-image-caption">
        Hello
      </div>
      <img src={image.src} onClick={(e) => preventPropogation(e)}/>
    </div>
  );

};

export default GalleryImage;

