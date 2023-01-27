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
import { Inertia } from "@inertiajs/inertia";

export default ({cars}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  function visit(slug){
      Inertia.visit(route('client.car.show',slug));
  }

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
      {cars.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="carSlider_item">
              <h5>{item.brand?item.brand.title:''} {item.model}</h5>
              <div className="block">
                <p>
                  <FaCar /> {item.car_type?item.car_type.title:''}
                </p>
                <p>
                  <MdLocalGasStation /> {item.fuel?item.fuel.title:''}
                </p>
                <p>
                  <MdAirlineSeatReclineNormal /> {item.seat}
                </p>
                <p>
                  <GiGearStickPattern /> {item.transmission?item.transmission.title:''}
                </p>
              </div>
                {item.special_price?<h4>{item.price}GEL</h4>:null}
              <h3 className="orange">{item.real_price}GEL</h3>
              <div className="img">
                <img src={item.latest_image?item.latest_image.file_full_url:null} alt="" />
              </div>
              <button onClick={() => {
                  visit(item.slug)
              }} className="main-btn">Book now</button>
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
