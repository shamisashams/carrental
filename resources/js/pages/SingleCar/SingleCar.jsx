import React, {useEffect, useRef, useState} from "react";
import "./SingleCar.css";
import CarSlider from "../../components/CarSlider/CarSlider";
//import Car5 from "../../assets/images/cars/5.png";
//import { carFeatures } from "../../components/Data";
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
import {MdAirlineSeatReclineNormal, MdLocalGasStation, MdLuggage} from "react-icons/md";
import {GiCarDoor, GiGearStickPattern} from "react-icons/gi";
import {BsSnow2} from "react-icons/bs";
import {Inertia} from "@inertiajs/inertia";
import {ImLocation2} from "react-icons/im";
import {HiChevronDown} from "react-icons/hi";
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";

const SingleCar = ({seo}) => {

    const {car, cars, features, extra_options, localizations} = usePage().props;

    const [price, setPrice] = useState(car.price);

    const [value, onChange] = useState(new Date());

    const [value2, onChange2] = useState(new Date());


    //console.log(car)

    const [values, setValues] = useState({
        options: [],
        car_id: car.id,
        pickup_id: "",
        dropoff_id: "",
        pickup_date: "",
        dropoff_date: "",
    });

    function finalPrice(e){
        let carPrice = parseFloat(car.price);
        if (e.target.checked){
            //alert('checked');
        } else {
            //alert('not checked');
        }
        let checked = document.querySelectorAll('input[name="extra"]:checked');

        let c_price = 0;
        let _options = [];
        checked.forEach((item, index) => {
            c_price += parseFloat(item.value);
            _options.push(item.dataset.id);
        });
        setPrice(carPrice + c_price);
        setValues((values) => ({
            ...values,
            options: _options,
        }));
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

    const carFeatures = [
        {
            icon: <MdAirlineSeatReclineNormal />,
            text: `${car.seat} Seats`,
        },
        {
            icon: <GiCarDoor />,
            text: `${car.door} doors`,
        },
        {
            icon: <MdLocalGasStation />,
            text: car.fuel?car.fuel.title:'unknown',
        },
        {
            icon: <MdLuggage />,
            text: car.bag?car.bag.title:'unknown',
        },
        {
            icon: <GiGearStickPattern />,
            text: car.transmission?car.transmission.title:'unknown',
        },
        {
            icon: <BsSnow2 />,
            text: car.air_conditioning?'Air conditioning':'none',
        },
    ];




    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function book(e) {
        e.preventDefault();
        Inertia.post(route("client.book"), values);
    }

   // ----------------------------------------------

    const [drop1, setDrop1] = useState(false);
    const [drop2, setDrop2] = useState(false);

    const [ddrop1, setdDrop1] = useState(false);
    const [ddrop2, setdDrop2] = useState(false);

    const [result, setResult] = useState([]);
    const [pickup, setPickup] = useState('Select pick-up location');
    const [dropoff, setDropoff] = useState('Select dropoff location');
    const wrapperRef = useRef(null);
    const wrapperRef2 = useRef(null);

    useOutsideAlerter(wrapperRef);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setDrop1(false);
                    setDrop2(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    useOutsideAlerter2(wrapperRef2);
    function useOutsideAlerter2(ref) {
        useEffect(() => {
            function handleClickOutside2(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setdDrop1(false);
                    setdDrop2(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside2);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside2);
            };
        }, [ref]);
    }

    let interval;
    function handleSearch(e) {
        clearInterval(interval);
        interval = setTimeout(function () {
            if (e.target.value.length > 0) {
                axios
                    .post(route("search.address"), { term: e.target.value })
                    .then(function (response) {
                        console.log(response);
                        setResult(response.data);
                    });
            } else setResult([]);
        }, 300);
    }

    //-------------------------------------------------

    let dropOff =  false;
    let diffLoc = false;

  return (
      <Layout seo={seo}>
          <div className="wrapper singleCar">
              <div className="flex car_info">
                  <div className="gray_box">
                      <h3>{car.brand?car.brand.title:''} {car.model} {/*2019*/}</h3>
                      <div className="flex">
                          <div className="img">
                              <img src={car.latest_image?car.latest_image.file_full_url:null} alt="" />
                          </div>
                          <div>
                              <strong>
                                  <BiDetail />
                                  {__('client.car_specifications',localizations)}
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
                              <strong>{__('client.car_price_includes',localizations)}</strong>
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
                              <strong>{__('client.car_age_restrictions',localizations)}</strong>
                              <div className="list age">
                                  <div>
                                      <RiErrorWarningFill />
                                      {__('client.car_age_restriction1',localizations)}
                                  </div>
                                  <div>
                                      <RiErrorWarningFill />
                                      {__('client.car_age_restriction2',localizations)}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="right">
                      <div className="selects">
                          {/*<PickupLocation dropOff={false} />*/}
                          {/*---------------------------------------*/}

                          <div
                              ref={wrapperRef}
                              className={`selectBox pickupLocation ${diffLoc && "diffLoc"}`}
                          >
                              <div className="box flex" style={{ marginBottom: "0" }}>
                                  <div
                                      onClick={() => setDrop1(!drop1)}
                                      className={`inner_box ${dropOff === true && "inner_box2"}`}
                                  >
                                      <ImLocation2 className="icon" />
                                      {pickup}{" "}
                                      <HiChevronDown className={`chevron ${drop1 && "rotate"}`} />
                                  </div>
                                  <div
                                      onClick={() => setDrop2(!drop2)}
                                      className={`inner_box ${dropOff === false && "inner_box2"}`}
                                  >
                                      <ImLocation2 className="icon" />
                                      Select drop-off location{" "}
                                      <HiChevronDown className={`chevron ${drop2 && "rotate"}`} />
                                  </div>
                              </div>

                              <div className={`dropdown ${drop1 && "show"}`}>
                                  <div className="flex" style={{ flexDirection: "row" }}>
                                      <input onKeyUp={handleSearch} type="text" placeholder="Enter address" />

                                  </div>

                                  {result.map((item, index) => {
                                      return (
                                          <button onClick={() => {
                                              setPickup(item.text);
                                              setValues((values) => ({
                                                  ...values,
                                                  pickup_id: item.id,
                                              }));
                                          }}>
                                              {" "}
                                              <ImLocation2 className="icon" /> {item.text}
                                          </button>
                                      );
                                  })}

                              </div>
                          </div>


                          <div
                              ref={wrapperRef2}
                              className={`selectBox pickupLocation ${diffLoc && "diffLoc"}`}
                          >
                              <div className="box flex" style={{ marginBottom: "0" }}>
                                  <div
                                      onClick={() => setdDrop1(!ddrop1)}
                                      className={`inner_box ${dropOff === true && "inner_box2"}`}
                                  >
                                      <ImLocation2 className="icon" />
                                      {dropoff}{" "}
                                      <HiChevronDown className={`chevron ${ddrop1 && "rotate"}`} />
                                  </div>
                                  <div
                                      onClick={() => setdDrop2(!ddrop2)}
                                      className={`inner_box ${dropOff === false && "inner_box2"}`}
                                  >
                                      <ImLocation2 className="icon" />
                                      Select drop-off location{" "}
                                      <HiChevronDown className={`chevron ${ddrop2 && "rotate"}`} />
                                  </div>
                              </div>

                              <div className={`dropdown ${ddrop1 && "show"}`}>
                                  <div className="flex" style={{ flexDirection: "row" }}>
                                      <input onKeyUp={handleSearch} type="text" placeholder="Enter address" />

                                  </div>

                                  {result.map((item, index) => {
                                      return (
                                          <button onClick={() => {
                                              setDropoff(item.text);
                                              setValues((values) => ({
                                                  ...values,
                                                  dropoff_id: item.id,
                                              }));
                                          }}>
                                              {" "}
                                              <ImLocation2 className="icon" /> {item.text}
                                          </button>
                                      );
                                  })}

                              </div>
                          </div>

                          {/*------------------------------------------------*/}
                          {/*<PickupLocation dropOff={true} />*/}
                          <PickupDate />

                          <Calendar onChange={(value)=>{
                              onChange(value);
                              setValues((values) => ({
                                  ...values,
                                  pickup_date: moment(value).format('YYYY-MM-DD'),
                              }));
                          }} value={value} />

                          <DropoffDate />

                          <Calendar onChange={(value)=>{
                              onChange2(value);
                              setValues((values) => ({
                                  ...values,
                                  dropoff_date: moment(value).format('YYYY-MM-DD'),
                              }));
                          }} value={value2} />

                      </div>
                      <strong>{__('client.car_extra_options',localizations)}</strong>
                      {extra_options.map((item, index) => {
                          return (
                              <div className="flex check">
                                  <input onClick={(event)=>{
                                      finalPrice(event)
                                  }} type="checkbox" name="extra" data-id={item.id} id={`option_${index}`} value={item.price} />
                                  <label htmlFor={`option_${index}`}>
                                      <div></div>
                                  </label>
                                  <div>{item.text} - Price per day: {item.price}GEL</div>
                              </div>
                          );
                      })}
                      <div>
                          <h2>{price}GEL day</h2>
                          <button onClick={book} className="main-btn">
                              {__('client.book_now',localizations)}
                          </button>
                      </div>
                  </div>
              </div>
              <h6 style={{ fontSize: "16px" }}>{__('client.car_u_may_like',localizations)}</h6>
              <CarSlider cars={cars} />
          </div>
      </Layout>

  );
};

export default SingleCar;
