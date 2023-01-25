import React from "react";
import "./SingleCar.css";
import CarSlider from "../../components/CarSlider/CarSlider";
//import Car5 from "../../assets/images/cars/5.png";
import { carFeatures } from "../../components/Data";
import { BiDetail } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
import {
  DropoffDate,
  PickupDate,
  PickupLocation,
} from "../../components/Shared/Shared";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";

import Layout from "@/Layouts/Layout";

const SingleCar = ({seo}) => {
  const includes = [
    "Theft protection",
    "Local fees and VAT",
    "Collision damage wiever",
    "Unlimited mileage",
    "Parking",
  ];
  const aditionOptions = [
    "Super cover - Price per day: 53 GEL",
    "Additional driver -  Price per day: 31 GEL",
    "MP3 USB transmitter - Price per day: 0 Gel",
    "GPS Navigator - Price per day: 31 GEL",
    "Baby car seat - Price per day: 25 GEL",
    "Roof basket 1254 - Price per day: 47 GEL",
  ];
  return (
      <Layout seo={seo}>
          <div className="wrapper singleCar">
              <div className="flex car_info">
                  <div className="gray_box">
                      <h3>Volkswagen Golf 2019</h3>
                      <div className="flex">
                          <div className="img">
                              <img src="/client/assets/images/cars/5.png" alt="" />
                          </div>
                          <div>
                              <strong>
                                  <BiDetail />
                                  Car specifications
                              </strong>
                              <div className="grid list">
                                  {carFeatures.map((item, index) => {
                                      return (
                                          <div key={index}>
                                              <span>{item.icon}</span>
                                              {item.text}
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                      </div>
                      <div className="flex bottom">
                          <div className="includes">
                              <strong>Price includes:</strong>
                              <div className="grid list">
                                  {includes.map((item, index) => {
                                      return (
                                          <div key={index}>
                                              <FaCheckCircle />
                                              {item}
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                          <div>
                              <strong>Age restrictions:</strong>
                              <div className="list age">
                                  <div>
                                      <RiErrorWarningFill />
                                      Minimum age of driver: 21 years
                                  </div>
                                  <div>
                                      <RiErrorWarningFill />
                                      Minimum time driving licence held: 3 years
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="right">
                      <div className="selects">
                          <PickupLocation dropOff={false} />
                          <PickupLocation dropOff={true} />
                          <PickupDate />
                          <DropoffDate />
                      </div>
                      <strong>Aditional options</strong>
                      {aditionOptions.map((item, index) => {
                          return (
                              <div className="flex check">
                                  <input type="checkbox" name="" id={`option_${index}`} />
                                  <label htmlFor={`option_${index}`}>
                                      <div></div>
                                  </label>
                                  <div>{item}</div>
                              </div>
                          );
                      })}
                      <div>
                          <h2>90$ day</h2>
                          <Link href="/payment" className="main-btn">
                              Book now
                          </Link>
                      </div>
                  </div>
              </div>
              <h6 style={{ fontSize: "16px" }}>You may like</h6>
              <CarSlider />
          </div>
      </Layout>

  );
};

export default SingleCar;
