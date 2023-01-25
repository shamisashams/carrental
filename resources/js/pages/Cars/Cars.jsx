import React, { useState, useEffect, useRef } from "react";
import {
  CarBox,
  DropoffDate,
  NumberOfSeats,
  PickupDate,
  PickupLocation,
  Pagination,
} from "../../components/Shared/Shared";
import "./Cars.css";
import { FaCar } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import { carSlideData, carTypes } from "../../components/Data";

import Layout from "@/Layouts/Layout";

const Cars = ({seo}) => {
  const [showFilter, setShowFilter] = useState(false);
  const wrapperRef = useRef();

  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowFilter(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
      <Layout seo={seo}>
          <div className="carsPage">
              <button onClick={() => setShowFilter(!showFilter)} className="FilterBtn">
                  <h5>Filter</h5>
              </button>
              <div className="wrapper flex">
                  <section
                      ref={wrapperRef}
                      className={`section carsFilter ${showFilter && "show"}`}
                  >
                      <button onClick={() => setShowFilter(false)} className="closeFilter">
                          <IoCloseOutline style={{ fontSize: "inherit" }} />
                      </button>
                      <h5>Filter</h5>
                      <PickupLocation dropOff={false} />
                      <PickupLocation dropOff={true} />
                      <PickupDate />
                      <DropoffDate />
                      <div className="gray_box">
                          <div className="title">
                              <FaCar />
                              Select the car type
                          </div>
                          {carTypes.map((item, index) => {
                              return (
                                  <div key={index} className="flex">
                                      <label htmlFor={`carType_${index}`}>{item}</label>
                                      <input type="checkbox" name="" id={`carType_${index}`} />
                                      <label htmlFor={`carType_${index}`}>
                                          <div></div>
                                      </label>
                                  </div>
                              );
                          })}
                      </div>
                      <div className="gray_box">
                          <div className="title">
                              <BiDetail />
                              Car specifications
                          </div>
                          <div className="flex">
                              <label htmlFor="carFeature_1">Air conditioning</label>
                              <input type="checkbox" name="" id="carFeature_1" />
                              <label htmlFor="carFeature_1">
                                  <div></div>
                              </label>
                          </div>
                          <div className="flex">
                              <label htmlFor="carFeature_2">Transmission - Automatic</label>
                              <input type="checkbox" name="" id="carFeature_2" />
                              <label htmlFor="carFeature_2">
                                  <div></div>
                              </label>
                          </div>
                          <div className="flex">
                              <label htmlFor="carFeature_3">Transmission - Manual</label>
                              <input type="checkbox" name="" id="carFeature_3" />
                              <label htmlFor="carFeature_3">
                                  <div></div>
                              </label>
                          </div>
                      </div>
                      <NumberOfSeats />
                      <button className="main-btn">Search</button>
                  </section>
                  <section className="section carsTabs ">
                      <div style={{ marginBottom: "30px" }}>
                          {carSlideData.map((item, index) => {
                              return (
                                  <CarBox
                                      key={index}
                                      model={item.model}
                                      img={item.img}
                                      price={item.price}
                                  />
                              );
                          })}
                      </div>

                      <Pagination />
                  </section>
              </div>
          </div>
      </Layout>

  );
};

export default Cars;
