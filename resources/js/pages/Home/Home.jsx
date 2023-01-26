import React, { useEffect, useRef, useState } from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
//import MainBg from "../../assets/images/bg/1.png";
//import AnimatedCar from "../../assets/images/other/1.png";
//import AnimatedCar1 from "../../assets/images/other/2.png";
import CarSlider from "../../components/CarSlider/CarSlider";
import { destinations, easyFastSafe, tags } from "../../components/Data";
import "./Home.css";
import { MdRemoveRedEye } from "react-icons/md";
import {
  DestinationBox,
  DropoffDate,
  Hashtag2,
  PickupDate,
  PickupLocation,
  TimeSelect,
} from "../../components/Shared/Shared";

import Layout from "@/Layouts/Layout";
import {Inertia} from "@inertiajs/inertia";

const Home = ({seo}) => {

    const { localizations, destinations, categories, cars } = usePage().props;

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
        delete appliedFilters['page'];
        console.log(event);
        if (event === false) {
            if (appliedFilters.hasOwnProperty(code)) {
                appliedFilters[code].push(value);
            } else appliedFilters[code] = [value];
        } else {
            if (appliedFilters[code].length > 1)
                removeA(appliedFilters[code], value.toString());
            else delete appliedFilters[code];
        }

        let params = [];

        for (let key in appliedFilters) {
            params.push(key + "=" + appliedFilters[key].join(","));
        }

        Inertia.visit("?" + params.join("&"));
    };

  const [diffLoc, setDiffLoc] = useState(false);
  const dropLocationCheck = useRef();
  useEffect(() => {
    console.log(dropLocationCheck.current.checked);
    console.log(diffLoc);

    if (dropLocationCheck.current.checked) {
      setDiffLoc(true);
    }
  }, [dropLocationCheck, diffLoc]);



  return (
      <Layout seo={seo}>
          <>
              <section
                  className="heroSection"
                  style={{ backgroundImage: `url('/client/assets/images/bg/1.png')` }}
              >
                  <div className="wrapper main-bg">
                      <h1>Special Deal!</h1>
                      <p>
                          Satisfied conveying an dependent contented he gentleman agreeable do
                          be. Warrant private blushes removed an in equally totally if.
                          Delivered dejection necessary objection do
                      </p>
                  </div>
              </section>
              <section className="wrapper homeFilter flex">
                  <div className="left">
                      <div className="flex">
                          <PickupLocation diffLoc={diffLoc} dropOff={false} />
                          <div className="flex check">
                              <input
                                  ref={dropLocationCheck}
                                  type="checkbox"
                                  name=""
                                  id="dropLocationCheck"
                                  checked={diffLoc}
                              />
                              <label
                                  onClick={() => setDiffLoc(!diffLoc)}
                                  htmlFor="dropLocationCheck"
                              >
                                  <div></div>
                              </label>
                              <label
                                  onClick={() => setDiffLoc(!diffLoc)}
                                  htmlFor="dropLocationCheck"
                              >
                                  Drop on different location
                              </label>
                          </div>
                      </div>
                      <div className="flex">
                          <PickupDate />
                          <TimeSelect />
                          <div className="gap"></div>
                          <DropoffDate />
                          <TimeSelect />
                      </div>
                  </div>
                  <div className="right">
                      <button className="main-btn">Search</button>
                  </div>
                  <img className="animated" src="/client/assets/images/other/2.png" alt="" />
              </section>
              <section className="wrapper carSlider_section">
                  <div className="flex">
                      <h3>Best deals</h3>
                      <Link href={route('client.car.special')}>
                          <h5>See all</h5>
                      </Link>
                  </div>
                  <CarSlider cars={cars} />
              </section>
              <section className="easyFastSafe wrapper">
                  <h1>easy, fast & safe</h1>
                  <div className="steps flex center">
                      {easyFastSafe.map((item, index) => {
                          return (
                              <div className="each_step" key={index}>
                                  <div className="icon flex center">{item.icon}</div>
                                  <div className="text">
                                      <div>{item.title}</div>
                                      <p>{item.para}</p>
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              </section>
              <section className="wrapper flex locationSection">
                  <div className="left">
                      <h4>
                          <h3>Explore</h3> the <br /> best{" "}
                          <h3 className="orange">destinations</h3>
                      </h4>
                      <p>
                          Satisfied conveying and ependent contented he gentleman agreeable do
                          be. Warrant private blushes removed an in equally totally if.
                          Delivered dejection necessary objection do mr prevailed. feeling do
                          chiefly cordial in do.{" "}
                      </p>
                      <Link href={route('client.destination.index')}>
                          <MdRemoveRedEye
                              style={{
                                  fontSize: "18px",
                                  verticalAlign: "middle",
                                  marginRight: "5px",
                              }}
                          />
                          See all blogs
                      </Link>
                      <img className="animated" src="/client/assets/images/other/1.png" alt="" />
                  </div>
                  <div className="right">
                      <div className="tags">
                          {categories.map((tag, index) => {
                              let checked;

                              if (appliedFilters.hasOwnProperty('tag')) {
                                  if (
                                      appliedFilters['tag'].includes(
                                          tag.id.toString()
                                      )
                                  ) {
                                      checked = true;
                                  } else checked = false;
                              } else checked = false;
                              return <Hashtag2 key={index} text={tag.title} onClick={(e)=>{
                                  handleFilterClick(checked,'tag',tag.id);
                              }} active={checked} />;
                          })}
                      </div>
                      <div className="destinationGrid">
                          {destinations.map((item, index) => {
                              return (
                                  <DestinationBox
                                      key={index}
                                      link={route('client.destination.show',item.slug)}
                                      img={item.latest_image?item.latest_image.file_full_url:null}
                                      title={item.title}
                                      para={item.short_description}
                                  />
                              );
                          })}
                      </div>
                  </div>
              </section>
          </>
      </Layout>

  );
};

export default Home;
