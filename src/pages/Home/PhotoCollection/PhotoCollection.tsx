import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { FreeMode } from "swiper";

import "./PhotoCollection.scss"
import PhotoIcon from './PhotoIcon';

const PhotoCollection = () => {

  return (
    <div className="home-photo-collection">
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper photos"
      >
        <SwiperSlide><PhotoIcon /></SwiperSlide>
        <SwiperSlide><PhotoIcon /></SwiperSlide>
        <SwiperSlide><PhotoIcon /></SwiperSlide>
        <SwiperSlide><PhotoIcon /></SwiperSlide>
        <SwiperSlide><PhotoIcon /></SwiperSlide>
        <SwiperSlide><PhotoIcon /></SwiperSlide>
        <SwiperSlide><PhotoIcon /></SwiperSlide>
      </Swiper>
    </div>
  );
  
};

export default PhotoCollection;

