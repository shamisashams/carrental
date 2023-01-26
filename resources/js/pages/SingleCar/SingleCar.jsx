import React, {useState} from "react";
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

    const {car, features, extra_options, localizations} = usePage().props;

    const [price, setPrice] = useState(car.price);

    //console.log(car)

    function finalPrice(e){
        let carPrice = parseFloat(car.price);
        if (e.target.checked){
            //alert('checked');
        } else {
            //alert('not checked');
        }
        let checked = document.querySelectorAll('input[name="extra"]:checked');

        let c_price = 0;
        checked.forEach((item, index) => {
            c_price += parseFloat(item.value);
        });
        setPrice(carPrice + c_price);
    }

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
                      <h3>{car.brand.title} {car.model} {/*2019*/}</h3>
                      <div className="flex">
                          <div className="img">
                              <img src={car.latest_image?car.latest_image.file_full_url:null} alt="" />
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
                                  {features.map((item, index) => {
                                      return (
                                          <div key={index}>
                                              <FaCheckCircle />
                                              {item.text}
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
                      {extra_options.map((item, index) => {
                          return (
                              <div className="flex check">
                                  <input onClick={(event)=>{
                                      finalPrice(event)
                                  }} type="checkbox" name="extra" id={`option_${index}`} value={item.price} />
                                  <label htmlFor={`option_${index}`}>
                                      <div></div>
                                  </label>
                                  <div>{item.text} - Price per day: {item.price}GEL</div>
                              </div>
                          );
                      })}
                      <div>
                          <h2>{price}GEL day</h2>
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
