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
  Hashtag,
  PickupDate,
  PickupLocation,
  TimeSelect,
} from "../../components/Shared/Shared";

import Layout from "@/Layouts/Layout";

const Home = ({seo}) => {
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
                      <Link href="/cars">
                          <h5>See all</h5>
                      </Link>
                  </div>
                  <CarSlider />
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
                      <Link href="/">
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
                          {tags.map((tag, index) => {
                              return <Hashtag key={index} text={tag} />;
                          })}
                      </div>
                      <div className="destinationGrid">
                          {destinations.slice(0, 3).map((item, index) => {
                              return (
                                  <DestinationBox
                                      key={index}
                                      link={item.link}
                                      img={item.img}
                                      title={item.title}
                                      para={item.para}
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
