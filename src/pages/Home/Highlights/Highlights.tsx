import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Highlights.scss"
import HikeCount from './HighlightCard/HikeCount';
import PopularHike from './HighlightCard/PopularHike'
import AverageDistance from './HighlightCard/AverageDistance';
import TotalDistance from './HighlightCard/TotalDistance';

interface HighlightsProps {
  hikes?: HikeData[]
}

const Highlights = ({ hikes }: HighlightsProps) => {

  return (
    <div className="highlights">
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><HikeCount hikes={hikes}/></SwiperSlide>
        <SwiperSlide><PopularHike hikes={hikes}/></SwiperSlide>
        <SwiperSlide><AverageDistance hikes={hikes}/></SwiperSlide>
        <SwiperSlide><TotalDistance hikes={hikes}/></SwiperSlide>
      </Swiper>
    </div>
  );
  
};

export default Highlights;

