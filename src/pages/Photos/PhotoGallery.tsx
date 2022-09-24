import React, { useState } from 'react';
import "./Photos.scss";
import { Gallery } from "react-grid-gallery";
import { images as IMAGES } from "./images";

interface PhotoGalleryProps {
    
}

const PhotoGallery = () => {

  const [images, setImages] = useState(IMAGES);

  return (
    <div className="photo-gallery">
      <br />
      <Gallery images={images} enableImageSelection={false} />
      <div className="banner">
        <div className="banner-header">Glass House Mountains</div>
        <div>21/02/17 - 21/03/21</div>
      </div>
    </div>
  );

};

export default PhotoGallery;

