import React from 'react';

import PhotoCard from './PhotoCard';
import "./Photos.scss"

const PhotoCollection = () => {

  const photos = [
    1,
    2,
    3,
    4,
    5
  ]

  return (
    <div className="photo-collection">
      <div className="header">
        <a href="/">Back</a>
        <br />
        <br />
        <h3>Photo Collections </h3>
      </div>
      {
        photos.map(() => (
          <PhotoCard />
        ))
      }
    </div>
  );

};

export default PhotoCollection;

