import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { carSlideData } from "../Data";
import { FaCar } from "react-icons/fa";
import { MdLocalGasStation, MdAirlineSeatReclineNormal } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import "./CarSlider.css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import React, { useRef } from "react";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

export default () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Swiper
      loop
      className="carSlider"
      spaceBetween={20}
      slidesPerView={3}
      slidesPerGroup={3}
      pagination={{
        clickable: true,
      }}
      navigation
      modules={[Pagination, Navigation]}
      onInit={(swiper) => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }}
      breakpoints={{
        1000: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        600: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        0: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
      }}
    >
      {carSlideData.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="carSlider_item">
              <h5>{item.model}</h5>
              <div className="block">
                <p>
                  <FaCar /> {item.type}
                </p>
                <p>
                  <MdLocalGasStation /> {item.fuel}
                </p>
                <p>
                  <MdAirlineSeatReclineNormal /> {item.seats}
                </p>
                <p>
                  <GiGearStickPattern /> {item.transmission}
                </p>
              </div>
              <h4>{item.price}</h4>
              <h3 className="orange">{item.newPrice}</h3>
              <div className="img">
                <img src={item.img} alt="" />
              </div>
              <button className="main-btn">Book now</button>
            </div>
          </SwiperSlide>
        );
      })}
      <div className="flex arrows">
        <button ref={prevRef}>
          <CgChevronLeft />
        </button>
        <button ref={nextRef} className="ml-2">
          <CgChevronRight />
        </button>
      </div>
    </Swiper>
  );
};
