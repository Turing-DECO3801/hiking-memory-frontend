import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import LightBox from './Lightbox';
import { images as IMAGES } from "./images";

import PhotoCard from './PhotoCard';
import PhotoGallery from './PhotoGallery';
import "./Photos.scss"
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { getHikes, getImageCollection } from '../../api';
import { AuthContext } from '../../contexts/AuthContext';
import { HikeContext } from '../../contexts/HikeContext';
import { PhotosContext } from '../../contexts/PhotosContext';


const PhotoCollection = () => {
  
  const { email, password } = useContext(AuthContext);
  const { galleryIndex, gallerySelected, updateSelectedGallery, setGalleryStatus } = useContext(PhotosContext);
  
  const [selected, setSelected] = useState(false);
  const [selectionIndex, setSelectionIndex] = useState(0);
  const [galleryDisplayed, setGalleryDisplayed] = useState(false);
  const [images, setImages] = useState(IMAGES);
  const [orderedImages, setOrderedImages] = useState(images);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageCollection, setImageCollection] = useState<ImageInfo[]>();
  const [imageThumbnails, setImageThumbnails] = useState<ImageInfo[]>();

  const photos = [
    1,2,3,4,5,6,7,8,9,10,11,12
  ]

  const navigate = useNavigate();

  useEffect(() => {
    updateConfig();
    getHikeData();
  }, [])

  const updateConfig = () => {
    setSelectionIndex(galleryIndex);
    setSelected(gallerySelected);
  }

  const getHikeData = async () => {
    const images = await getImageCollection(email as string, password as string) as ImageInfo[];

    setImageCollection(images);

    const filteredImages = [];

    const map = new Object() as any;

    for (const image of images.reverse()) {
      // The path does not yet exist
      if (!map[image.path_name] && image.path_name !== null && image.imageUrl !== undefined) {
        map[image.path_name] = true;
        filteredImages.push(image);
      }
    }



    setImageThumbnails(filteredImages);

    // for (const image of images) {
    //   const img = new Image();
    //   img.src = image.imageUrl;
    //   img.onload = () => {
    //     console.log(img.height);
    //     console.log(img.width);
    //   }
    // }
  }

  /**
   * Updates the back button based on the current page selected
   * 
   * @returns Updated back button functionality
   */
  const getBackButton = () => {
    if (selected) {
      return <div className="back-button" onClick={() => setSelected(false)}>
        <FiChevronLeft className="back-icon"/>
        Back
      </div>
    } else {
      return <div className="back-button" onClick={() => navigate("/")}>
        <FiChevronLeft className="back-icon"/>
        Back
      </div>;
    }
  }

  const selectCollection = (index: number) => {
    setSelected(true);
    setSelectionIndex(index);
  }

  const displayGallery = (index: number) => {
    const start = images.slice(index, images.length);
    const end = images.slice(0, index);
    setOrderedImages(start.concat(end))
    setGalleryDisplayed(true);
  }

  return (
    <div className="photo-collection">
      <Navbar />
      <div className="header">
        {
          getBackButton()
        }
        <h2 className="section">Photo Collections </h2>
      </div>
      {
        photos.map((collections, index) => {
          if (selected && index === selectionIndex) {
            return <PhotoGallery key={index} onClick={displayGallery}/>
          }
        })
      }
      <div className="collection-selection section delay-1">
        {
          imageThumbnails?.map((collection, index) => {
            if (!selected) {
              return <PhotoCard key={index} thumbnail={collection} onClick={() => selectCollection(index)}/>
            }
          })
        }
      </div>
      <LightBox
        className={`${galleryDisplayed ? "" :"light-box-inactive"}`}
        removeGallery={() => setGalleryDisplayed(false)}
        images={orderedImages}/>
    </div>
  );
  
};

export default PhotoCollection;

