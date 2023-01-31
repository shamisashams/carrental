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
import {Link, usePage} from "@inertiajs/inertia-react";
import {CgChevronLeft, CgChevronRight} from "react-icons/cg";
import { Inertia } from "@inertiajs/inertia";

const Cars = ({seo}) => {

    const {cars, carTypes, transmissions, fuelTypes, bagTypes, seats, doors, localizations} = usePage().props;

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

    let links = function (links) {
        let rows = [];
        //links.shift();
        //links.splice(-1);
        {
            links.map(function (item, index) {
                if (index > 0 && index < links.length - 1) {
                    rows.push(
                        <Link
                            href={item.url}
                            className={
                                item.active
                                    ? "active"
                                    : ""
                            }
                        >
                            {item.label}
                        </Link>
                    );
                }
            });
        }
        return rows.length > 1 ? rows : null
    };

    let linksPrev = function (links) {
        let rowCount = 0;
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rowCount++;
            }
        });
        return rowCount > 1 ? (
            <Link href={links[0].url}>

                <CgChevronLeft />

            </Link>
        ) : null;
    };
    let linksNext = function (links) {
        let rowCount = 0;
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rowCount++;
            }
        });
        return rowCount > 1 ? (
            <Link href={links[links.length - 1].url}>
                <CgChevronRight />
            </Link>
        ) : null;
    };



    let appliedFilters = [];
    let urlParams = new URLSearchParams(window.location.search);

    urlParams.forEach((value, index) => {
        appliedFilters[index] = value.split(",");
    });

    function removeA(arr) {
        var what,
            a = arguments,
            L = a.length,
            ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }



    const handleFilterClick = function (event, code, value) {
        //Inertia.visit('?brand=12');

        if (event.target.checked === true) {
            if (appliedFilters.hasOwnProperty(code)) {
                appliedFilters[code].push(value.toString());
            } else appliedFilters[code] = [value.toString()];
        } else {
            if (appliedFilters[code].length > 1)
                removeA(appliedFilters[code], value.toString());
            else delete appliedFilters[code];
        }

        //console.log(appliedFilters);

    };

    const handleFilterClickBoolean = function (event, code, value) {
        //Inertia.visit('?brand=12');

        if (event.target.checked === true) {
            appliedFilters[code] = [value];

        } else {

            delete appliedFilters[code];
        }

        //console.log(appliedFilters);

    };

    const handleFilterClickAddress = function (event, code, value) {
        //Inertia.visit('?brand=12');

        if(value){
            appliedFilters[code] = [value];
        } else {
            delete appliedFilters[code];
        }


        //console.log(appliedFilters);

    };

    function search(){
        let params = [];

        for (let key in appliedFilters) {
            params.push(key + "=" + appliedFilters[key].join(","));
        }

        Inertia.visit("?" + params.join("&"));
    }

    let aic_checked;

    if (appliedFilters.hasOwnProperty('air_conditioning')) {
        if (
            appliedFilters['air_conditioning'].includes(
                (1).toString()
            )
        ) {
            aic_checked = true;
        } else aic_checked = false;
    } else aic_checked = false;

    //const [aicChecked, setAicChecked] = useState(aic_checked);

    //console.log(cars);




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
                      <h5>{__('client.filter',localizations)}</h5>
                      <PickupLocation dropOff={false} onChange={(value,event)=>{
                          handleFilterClickAddress(event,'pickup',value)
                      }} />
                      <PickupLocation dropOff={true} onChange={(value,event)=>{
                          handleFilterClickAddress(event,'dropoff',value)
                      }} />
                      <PickupDate onChange={(value)=>{
                          alert(value)
                      }} />
                      <DropoffDate onChange={(value)=>{
                          alert(value)
                      }} />
                      <div className="gray_box">
                          <div className="title">
                              <FaCar />
                              {__('client.filter_car_type',localizations)}
                          </div>
                          {carTypes.map((item, index) => {
                              let checked;

                              if (appliedFilters.hasOwnProperty('type')) {
                                  if (
                                      appliedFilters['type'].includes(
                                          item.id.toString()
                                      )
                                  ) {
                                      checked = true;
                                  } else checked = false;
                              } else checked = false;
                              return (
                                  <div key={index} className="flex">
                                      <label htmlFor={`carType_${index}`}>{item.title}</label>
                                      <input type="checkbox" name="" defaultChecked={checked} id={`carType_${index}`} onClick={(event) => {
                                          handleFilterClick(
                                              event,
                                              'type',
                                              item.id
                                          );
                                      }} />
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
                              {__('client.filter_car_spec',localizations)}
                          </div>
                          <div className="flex">
                              <label htmlFor="carFeature_1">Air conditioning</label>
                              <input type="checkbox" defaultChecked={aic_checked} name="" id="carFeature_1" onClick={(event) => {
                                  handleFilterClickBoolean(
                                      event,
                                      'air_conditioning',
                                      1
                                  );
                              }} />
                              <label htmlFor="carFeature_1">
                                  <div></div>
                              </label>
                          </div>
                          {transmissions.map((item,index)=>{
                              let checked;

                              if (appliedFilters.hasOwnProperty('transmission')) {
                                  if (
                                      appliedFilters['transmission'].includes(
                                          item.id.toString()
                                      )
                                  ) {
                                      checked = true;
                                  } else checked = false;
                              } else checked = false;
                              return (
                                  <div key={index} className="flex">
                                      <label htmlFor={`carFeature2_${item.id}`}>Transmission - {item.title}</label>
                                      <input defaultChecked={checked} type="checkbox" name="" id={`carFeature2_${item.id}`} onClick={(event) => {
                                          handleFilterClick(
                                              event,
                                              'transmission',
                                              item.id
                                          );
                                      }} />
                                      <label htmlFor={`carFeature2_${item.id}`}>
                                          <div></div>
                                      </label>
                                  </div>
                                  )
                          })}

                          {fuelTypes.map((item,index)=>{
                              let checked;

                              if (appliedFilters.hasOwnProperty('fuel')) {
                                  if (
                                      appliedFilters['fuel'].includes(
                                          item.id.toString()
                                      )
                                  ) {
                                      checked = true;
                                  } else checked = false;
                              } else checked = false;
                              return (
                                  <div key={index} className="flex">
                                      <label htmlFor={`carFeature3_${item.id}`}>Fuel - {item.title}</label>
                                      <input defaultChecked={checked} type="checkbox" name="" id={`carFeature3_${item.id}`} onClick={(event) => {
                                          handleFilterClick(
                                              event,
                                              'fuel',
                                              item.id
                                          );
                                      }} />
                                      <label htmlFor={`carFeature3_${item.id}`}>
                                          <div></div>
                                      </label>
                                  </div>
                              )
                          })}

                          {bagTypes.map((item,index)=>{
                              let checked;

                              if (appliedFilters.hasOwnProperty('bag')) {
                                  if (
                                      appliedFilters['bag'].includes(
                                          item.id.toString()
                                      )
                                  ) {
                                      checked = true;
                                  } else checked = false;
                              } else checked = false;
                              return (
                                  <div key={index} className="flex">
                                      <label htmlFor={`carFeature4_${item.id}`}>Bag Type - {item.title}</label>
                                      <input defaultChecked={checked} type="checkbox" name="" id={`carFeature4_${item.id}`} onClick={(event) => {
                                          handleFilterClick(
                                              event,
                                              'bag',
                                              item.id
                                          );
                                      }} />
                                      <label htmlFor={`carFeature4_${item.id}`}>
                                          <div></div>
                                      </label>
                                  </div>
                              )
                          })}

                          {seats.map((item,index)=>{
                              let checked;

                              if (appliedFilters.hasOwnProperty('seat')) {
                                  if (
                                      appliedFilters['seat'].includes(
                                          item.seat.toString()
                                      )
                                  ) {
                                      checked = true;
                                  } else checked = false;
                              } else checked = false;
                              return (
                                  <div key={index} className="flex">
                                      <label htmlFor={`carFeature5_${item.seat}`}>Seats - {item.seat}</label>
                                      <input defaultChecked={checked} type="checkbox" name="" id={`carFeature5_${item.seat}`} onClick={(event) => {
                                          handleFilterClick(
                                              event,
                                              'seat',
                                              item.seat
                                          );
                                      }} />
                                      <label htmlFor={`carFeature5_${item.seat}`}>
                                          <div></div>
                                      </label>
                                  </div>
                              )
                          })}

                          {doors.map((item,index)=>{
                              let checked;

                              if (appliedFilters.hasOwnProperty('door')) {
                                  if (
                                      appliedFilters['door'].includes(
                                          item.door.toString()
                                      )
                                  ) {
                                      checked = true;
                                  } else checked = false;
                              } else checked = false;
                              return (
                                  <div key={index} className="flex">
                                      <label htmlFor={`carFeature6_${item.door}`}>Doors - {item.door}</label>
                                      <input defaultChecked={checked} type="checkbox" name="" id={`carFeature6_${item.door}`} onClick={(event) => {
                                          handleFilterClick(
                                              event,
                                              'door',
                                              item.door
                                          );
                                      }} />
                                      <label htmlFor={`carFeature6_${item.door}`}>
                                          <div></div>
                                      </label>
                                  </div>
                              )
                          })}
                          {/*<div className="flex">
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
                          </div>*/}
                      </div>
                      {/*<NumberOfSeats />*/}
                      <button onClick={search} className="main-btn">{__('client.filter_search',localizations)}</button>
                  </section>
                  <section className="section carsTabs ">
                      <div style={{ marginBottom: "30px" }}>
                          {cars.data.map((item, index) => {
                              return (
                                  <CarBox
                                      key={index}
                                      model={`${item.brand?item.brand.title:''} ${item.model}`}
                                      img={item.latest_image?item.latest_image.file_full_url:null}
                                      price={item.price}
                                      slug={item.slug}
                                      car={item}
                                  />
                              );
                          })}
                      </div>

                      {/*<Pagination />*/}
                      <div className="pagination flex center">
                          {/*<button>
                          <CgChevronLeft />
                      </button>
                      <button className="active">1</button>
                      <button>2</button>
                      <button>3</button>
                      <button>
                          <CgChevronRight />
                      </button>*/}
                          {linksPrev(cars.links)}{links(cars.links)}{linksNext(cars.links)}
                      </div>
                  </section>
              </div>
          </div>
      </Layout>

  );
};

export default Cars;
