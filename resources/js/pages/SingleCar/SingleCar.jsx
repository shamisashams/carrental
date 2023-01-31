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
    PickupLocation, TimeSelect,
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
//import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
import moment from "moment";

const SingleCar = ({seo}) => {

    const {car, cars, features, extra_options, localizations} = usePage().props;

    const [price, setPrice] = useState(car.price);
    const [period, setPeriod] = useState(1);

    const [value, onChange] = useState(new Date());

    const [value2, onChange2] = useState(new Date());

    const [pickupd, setPickupd] = useState('pickup date');
    const [dropoffd, setDropoffd] = useState('dropoff date');


    //console.log(car)

    const [values, setValues] = useState({
        options: [],
        car_id: car.id,
        pickup_id: "",
        dropoff_id: "",
        pickup_date: "",
        dropoff_date: "",
        pickup_time: '',
        dropoff_time: ''
    });

    useEffect(() => {
        if(values.pickup_date && values.dropoff_date){
            let carPrice = parseFloat(car.price);
            var date1 = new Date(values.pickup_date);
            var date2 = new Date(values.dropoff_date);

            // To calculate the time difference of two dates
            var Difference_In_Time = date2.getTime() - date1.getTime();

            // To calculate the no. of days between two dates
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

            //To display the final no. of days (result)
            console.log("Total number of days between dates  <br>"
                + date1 + "<br> and <br>"
                + date2 + " is: <br> "
                + Difference_In_Days);

            if (Difference_In_Days === 0)Difference_In_Days = 1;

            let checked = document.querySelectorAll('input[name="extra"]:checked');

            let c_price = 0;

            checked.forEach((item, index) => {
                c_price += parseInt(item.dataset.per_day) === 1?(parseFloat(item.value)*Difference_In_Days):parseFloat(item.value);
            });

            setPeriod(Difference_In_Days);

            setPrice((carPrice * Difference_In_Days)+c_price);
        }
    })

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
            c_price += parseInt(item.dataset.per_day) === 1?(parseFloat(item.value)*period):parseFloat(item.value);
            _options.push(item.dataset.id);
        });
        setPrice((carPrice * period) + c_price);
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
                          <PickupLocation dropOff={false} onChange={(value)=>{
                              setValues((values) => ({
                                  ...values,
                                  pickup_id: value,
                              }));
                          }} />

                          <PickupLocation dropOff={true} onChange={(value)=>{
                              setValues((values) => ({
                                  ...values,
                                  dropoff_id: value,
                              }));
                          }} />
                          <PickupDate onChange={(value)=>{
                              setPickupd(moment(value).format('YYYY-MM-DD'));
                              setValues((values) => ({
                                  ...values,
                                  pickup_date: moment(value).format('YYYY-MM-DD'),
                              }));
                          }} value={pickupd} />

                          {/*<Calendar onChange={(value)=>{
                              onChange(value);
                              setValues((values) => ({
                                  ...values,
                                  pickup_date: moment(value).format('YYYY-MM-DD'),
                              }));
                          }} value={value} />*/}
                          <TimeSelect onChange={(value) => {
                              setValues((values) => ({
                                  ...values,
                                  pickup_time: value,
                              }));
                          }} />

                          <DropoffDate onChange={(value)=>{
                              setDropoffd(moment(value).format('YYYY-MM-DD'));
                              setValues((values) => ({
                                  ...values,
                                  dropoff_date: moment(value).format('YYYY-MM-DD'),
                              }));
                          }} value={dropoffd} />

                          {/*<Calendar onChange={(value)=>{
                              onChange2(value);
                              setValues((values) => ({
                                  ...values,
                                  dropoff_date: moment(value).format('YYYY-MM-DD'),
                              }));
                          }} value={value2} />*/}

                          <TimeSelect onChange={(value) => {
                              setValues((values) => ({
                                  ...values,
                                  dropoff_time: value,
                              }));
                          }} />

                      </div>
                      <strong>{__('client.car_extra_options',localizations)}</strong>
                      {extra_options.map((item, index) => {
                          return (
                              <div className="flex check">
                                  <input onClick={(event)=>{
                                      finalPrice(event)
                                  }} type="checkbox" name="extra" data-per_day={item.price_per_day} data-id={item.id} id={`option_${index}`} value={item.price} />
                                  <label htmlFor={`option_${index}`}>
                                      <div></div>
                                  </label>
                                  <div>{item.text} - Price {parseInt(item.price_per_day) === 1?` per ${period} days`:''}: {parseInt(item.price_per_day) === 1?item.price*period:item.price}GEL</div>
                              </div>
                          );
                      })}
                      <div>
                          <h2>{price}GEL {period}day</h2>
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
