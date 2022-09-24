import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';

import PhotoCard from './PhotoCard';
import PhotoGallery from './PhotoGallery';
import "./Photos.scss"

const PhotoCollection = () => {

  const [selected, setSelected] = useState(false);
  const [selectionIndex, setSelectionIndex] = useState(0);

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
              return <PhotoGallery />
            } else if (!selected){
              return <PhotoCard onClick={() => selectCollection(index)}/>
            }
          }
          )
        }
    </div>
  );

};

export default PhotoCollection;

