import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { FreeMode } from "swiper";

import "./PhotoCollection.scss"
import PhotoCard from './PhotoCard';

const PhotoCollection = () => {

  return (
    <div className="photo-collection">
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper photos"
      >
        <SwiperSlide><PhotoCard /></SwiperSlide>
        <SwiperSlide><PhotoCard /></SwiperSlide>
        <SwiperSlide><PhotoCard /></SwiperSlide>
        <SwiperSlide><PhotoCard /></SwiperSlide>
        <SwiperSlide><PhotoCard /></SwiperSlide>
        <SwiperSlide><PhotoCard /></SwiperSlide>
        <SwiperSlide><PhotoCard /></SwiperSlide>
      </Swiper>
    </div>
  );
  
};

export default PhotoCollection;

