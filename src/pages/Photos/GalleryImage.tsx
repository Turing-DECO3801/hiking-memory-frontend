import React from 'react';
import "./Photos.scss";
import { Image } from "react-grid-gallery";

interface GalleryImageProps {
  image: Image;
  onClick: () => void;
}

const GalleryImage = ({ image, onClick }: GalleryImageProps) => {

  return (
    <div className="gallery-card" onClick={onClick}>
      <img src={image.src} onClick={(e) => e.stopPropagation()}/>
    </div>
  );

};

export default GalleryImage;

