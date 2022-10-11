import React, { useState } from 'react';
import "./Photos.scss";
import { Gallery } from "react-grid-gallery";
import { images as IMAGES } from "./images";

interface PhotoGalleryProps {
    onClick: (index: number) => void;
}

const PhotoGallery = ({ onClick }: PhotoGalleryProps) => {

  const [images, setImages] = useState(IMAGES);

  return (
    <div className="photo-gallery">
      <div className="banner">
        <div className="banner-header">Glass House Mountains</div>
      </div>
      <Gallery images={images} enableImageSelection={false} onClick={onClick}/>
    </div>
  );

};

export default PhotoGallery;

