import React from 'react';
import "./Photos.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import GalleryImage from './GalleryImage';
import { Image } from "react-grid-gallery";
import { FiX } from 'react-icons/fi';

interface LightBoxProps {
  removeGallery: () => void;
  images: Image[]
  className: string,
}

const LightBox = ({ removeGallery, images, className }: LightBoxProps) => {

    return (
    <div className={`light-box ${className}`}>
      <div className="light-box-exit">
        <FiX className="exit-icon"/>
      </div>
      <div className="gallery">
        <Swiper navigation={true} modules={[Navigation]} loop={true} className="mySwiper">
          {
            images.map((image, index) => 
            <SwiperSlide key={index}>
                <GalleryImage image={image} onClick={removeGallery}/>
                </SwiperSlide>
            )
          }
        </Swiper>
      </div>
    </div>
  );

};

export default LightBox;

