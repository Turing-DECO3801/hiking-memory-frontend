import React, { useState } from 'react';
import "./Photos.scss";
import { Gallery } from "react-grid-gallery";
import { images as IMAGES } from "./images";
import { Image } from 'react-grid-gallery';

interface PhotoGalleryProps {
    onClick: (index: number) => void;
    collection: Image[]
}

const PhotoGallery = ({ onClick, collection }: PhotoGalleryProps) => {

  const [images, setImages] = useState<Image[]>(collection);

  const getName = () => {
    if (collection !== undefined && collection.length != 0) {
      return collection[0].caption;
    }
  }

  return (
    <div className="photo-gallery">
      <div className="banner">
        <div className="banner-header">{getName()}</div>
      </div>
      <Gallery images={images} enableImageSelection={false} onClick={onClick}/>
    </div>
  );

};

export default PhotoGallery;

