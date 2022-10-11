import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { FreeMode } from "swiper";

import "./PhotoCollection.scss"
import PhotoIcon from './PhotoIcon';

interface PhotoCollectionProps {
  images: ImageInfo[] | undefined
}

const PhotoCollection = ({ images }: PhotoCollectionProps ) => {

  const [imageThumbnails, setImageThumbnails] = useState<ImageInfo[]>();

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
                <PhotoIcon image={image}/>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  );
  
};

export default PhotoCollection;

