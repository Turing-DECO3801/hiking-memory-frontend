import React, { useEffect, useState, useContext } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import "swiper/css";
import { FreeMode } from "swiper";

import "./PhotoCollection.scss"
import PhotoIcon from './PhotoIcon';
import { PhotosContext } from '../../../contexts/PhotosContext';

interface PhotoCollectionProps {
  images: ImageInfo[] | undefined
}

const PhotoCollection = ({ images }: PhotoCollectionProps ) => {
  
  const { updateSelectedGallery, setGalleryStatus } = useContext(PhotosContext);
  
  const [imageThumbnails, setImageThumbnails] = useState<ImageInfo[]>();
  
  const navigate = useNavigate();

  /**
   * Processes the set of images to only include unique paths
   */
  useEffect(() => {
    if (images === undefined) return;
  
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
  }, [images])

  const onPhotoSelect = (index: number) => {
    setGalleryStatus(true);
    updateSelectedGallery(index);
    navigate('/photos');
  }

  return (
    <div className="home-photo-collection">
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper photos"
      >
        {
          imageThumbnails?.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <PhotoIcon image={image} onClick={() => onPhotoSelect(index)}/>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  );
  
};

export default PhotoCollection;

