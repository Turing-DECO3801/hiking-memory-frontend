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
    <div className="photo-gallery transition">
      <br />
      <Gallery images={images} enableImageSelection={false} onClick={onClick}/>
      <div className="banner">
        <div className="banner-header">Glass House Mountains</div>
        <div>21/02/17 - 21/03/21</div>
      </div>
    </div>
  );

};

export default PhotoGallery;

