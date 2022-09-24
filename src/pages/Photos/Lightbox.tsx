import React from 'react';
import "./Photos.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import GalleryImage from './GalleryImage';

interface LightBoxProps {
  removeGallery: () => void;
}

const LightBox = ({ removeGallery }: LightBoxProps) => {

  return (
    <div className="light-box">
      <div className="gallery">
        <Swiper navigation={true} modules={[Navigation]} loop={true} className="mySwiper">
          <SwiperSlide><GalleryImage /></SwiperSlide>
          <SwiperSlide><GalleryImage /></SwiperSlide>
          <SwiperSlide><GalleryImage /></SwiperSlide>
          <SwiperSlide><GalleryImage /></SwiperSlide>
          <SwiperSlide><GalleryImage /></SwiperSlide>
          <SwiperSlide><GalleryImage /></SwiperSlide>
          <SwiperSlide><GalleryImage /></SwiperSlide>
        </Swiper>
      </div>
      <div className="bot-margin" onClick={removeGallery}></div>
      <div className="top-margin" onClick={removeGallery}></div>
    </div>
  );

};

export default LightBox;

