import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import LightBox from './Lightbox';
import { images as IMAGES } from "./images";

import PhotoCard from './PhotoCard';
import PhotoGallery from './PhotoGallery';
import "./Photos.scss"

const PhotoCollection = () => {

  const [selected, setSelected] = useState(false);
  const [selectionIndex, setSelectionIndex] = useState(0);
  const [galleryDisplayed, setGalleryDisplayed] = useState(false);
  const [images, setImages] = useState(IMAGES);
  const [orderedImages, setOrderedImages] = useState(images);
  const [imageIndex, setImageIndex] = useState(0);

  const photos = [
    1,2,3,4,5
  ]

  const getBackButton = () => {
    if (selected) {
      return <div className="back-button" onClick={() => setSelected(false)}>Back</div>
    } else {
      return <a href="/">Back</a>;
    }
  }

  const selectCollection = (index: number) => {
    setSelected(true);
    setSelectionIndex(index);
  }

  const displayGallery = (index: number) => {

    let start = images.slice(index, images.length);
    let end = images.slice(0, index);
    setOrderedImages(start.concat(end))
    setGalleryDisplayed(true);
  }

  const getGalleryDisplay = () => {
    if (galleryDisplayed) {
      return <LightBox removeGallery={() => setGalleryDisplayed(false)} images={orderedImages}/>
    }
  }

  return (
    <div className="photo-collection">
      <Navbar />
      <div className="header">
        {
          getBackButton()
        }
        <h2>Photo Collections </h2>
      </div>
      {
        photos.map((collections, index) => {
          if (selected && index === selectionIndex) {
            return <PhotoGallery onClick={displayGallery}/>
          }
        })
      }
      <div className="collection-selection">
        {
          photos.map((collections, index) => {
            if (!selected) {
              return <PhotoCard onClick={() => selectCollection(index)}/>
            }
          })
        }
      </div>
      {
        getGalleryDisplay()
      }
    </div>
  );
  
};

export default PhotoCollection;

