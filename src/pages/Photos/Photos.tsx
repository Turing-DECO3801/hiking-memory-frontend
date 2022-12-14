import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import LightBox from './Lightbox';
import { images as IMAGES } from "./images";
import PhotoCard from './PhotoCard';
import PhotoGallery from './PhotoGallery';
import "./Photos.scss"
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { getImageCollection } from '../../api';
import { AuthContext } from '../../contexts/AuthContext';
import { PhotosContext } from '../../contexts/PhotosContext';
import { Image as ImageType } from 'react-grid-gallery'

const PhotoCollection = () => {
  
  const { email, password } = useContext(AuthContext);
  const { galleryIndex, gallerySelected, updateSelectedGallery, setGalleryStatus } = useContext(PhotosContext);
  
  const [selected, setSelected] = useState(false);
  const [selectionIndex, setSelectionIndex] = useState(0);
  const [galleryDisplayed, setGalleryDisplayed] = useState(false);
  const [images, setImages] = useState(IMAGES);
  const [orderedImages, setOrderedImages] = useState(images);
  const [imageCollection, setImageCollection] = useState<ImageInfo[]>();
  const [imageThumbnails, setImageThumbnails] = useState<ImageInfo[]>();
  const [assortedImages, setAssortedImages] = useState<ImageType[][]>();
  const [loaded, setLoaded] = useState(false);

  let numLoaded = 0;

  const navigate = useNavigate();

  useEffect(() => {
    updateConfig();
    storeImages();
  }, [])

  /**
   * Updates Context stored status of the photo gallery
   */
  const updateConfig = () => {
    setSelectionIndex(galleryIndex);
    setSelected(gallerySelected);
  }

  /**
   * Stores the images and their size data for the gallery collage
   */
  const storeImages = async () => {
    const images = await getImageCollection(email as string, password as string) as ImageInfo[];

    setImageCollection(images);

    const filteredImages = [];

    const map = new Object() as any;

    for (const image of images.reverse()) {
      // The path does not yet exist
      if (!map[image.path_name] && image.path_name !== null && image.imageUrl !== undefined
        && image.image !== null) {
        map[image.path_name] = true;
        filteredImages.push(image);
      }
    }

    /**
     * Creates a count of all valid images to determine when all
     * images have finished loading
     */
    let count = 0;
    for (const image of images) {
      if (image.path_name !== null && image.image !== null) {
        count++;
      }
    }

    const sortMap = new Object() as any;

    /**
     * Sorts the images and creates a load to obtain width and height information
     */
    for (const image of images) {
      if (!sortMap[image.path_name] && image.path_name !== null && image.imageUrl !== undefined) {
        sortMap[image.path_name] = [];
      }
      if (sortMap[image.path_name] !== undefined && image.image !== null) {
        const imageInfo = {
          src: image.imageUrl,
          caption: image.path_name,
          width: 0,
          height: 0,
        }
        const img = new Image();
        img.src = image.imageUrl;

        img.onload = () => {
          imageInfo.width = img.width 
          imageInfo.height = img.height
          numLoaded++;
          if (numLoaded === count) {
            setLoaded(true);
          }
        }
        sortMap[image.path_name].push(imageInfo)
      }
    }

    /**
     * Sorts the images into a 2D array based on their hike
     */
    let index = 0;
    const assortedImages = new Array(Object.keys(sortMap).length) as Array<Array<ImageType>>;
    for (const path in sortMap) {
      assortedImages[index] = sortMap[path];
      index++;
    }
    setAssortedImages(assortedImages);
    setImageThumbnails(filteredImages);
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

  /**
   * Selects the current gallery to be displayed
   * 
   * @param index Index of the gallery to display
   */
  const selectCollection = (index: number) => {
    setSelected(true);
    setSelectionIndex(index);
    if (assortedImages !== undefined) {
      setImages(assortedImages[index])
      console.log(assortedImages[index])
    }
  }

  /**
   * Shows the lightbox of the image based on the image that
   * was selected
   * 
   * @param index Index of the image to display
   */
  const displayGallery = (index: number) => {
    const start = images.slice(index, images.length);
    const end = images.slice(0, index);
    setOrderedImages(start.concat(end))
    setGalleryDisplayed(true);
  }

  /**
   * Gets the collection to be shown based on the collection index
   * 
   * @returns The gallery of the current index
   */
  const getCollection = () => {    
    if (assortedImages !== undefined && loaded) {
      return (
        assortedImages.map((collection, index) => {
          if (selected && index === selectionIndex) {
            return <PhotoGallery collection={collection} key={index} onClick={displayGallery}/>
          }
        })
      )
    }
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
        getCollection()
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

