import React, { useEffect, useRef, useState } from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
//import MainBg from "../../assets/images/bg/1.png";
//import AnimatedCar from "../../assets/images/other/1.png";
//import AnimatedCar1 from "../../assets/images/other/2.png";
import CarSlider from "../../components/CarSlider/CarSlider";
//import { destinations, easyFastSafe, tags } from "../../components/Data";
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
import { Inertia } from "@inertiajs/inertia";
import { ImLocation2 } from "react-icons/im";
import { RiCalendar2Fill } from "react-icons/ri";
import { FaKey } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import axios from "axios";
import moment from "moment";

const Home = ({ seo }) => {
    const { localizations, destinations, categories, cars } = usePage().props;

    /*--------------------------------*/

    let appliedFilters2 = {};
    let urlParams = new URLSearchParams(window.location.search);

    urlParams.forEach((value, index) => {
        appliedFilters2[index] = value.split(",");
    });

    const handleFilterClick = function (event, code, value) {
        //Inertia.visit('?brand=12');


        if (event === false) {
            if (appliedFilters2.hasOwnProperty(code)) {
                appliedFilters2[code].push(value.toString());
            } else appliedFilters2[code] = [value.toString()];
        } else {
            if (appliedFilters2[code].length > 1)
                removeA(appliedFilters2[code], value.toString());
            else delete appliedFilters2[code];
        }

        let params = [];

        for (let key in appliedFilters2) {
            params.push(key + "=" + appliedFilters2[key].join(","));
        }

        Inertia.visit("?" + params.join("&"));
    };


    /* -----------------------------------*/

    const easyFastSafe = [
        {
            icon: <ImLocation2 />,
            title: __("client.efs_choose_loc", localizations),
            para: __("client.efs_choose_loc_t", localizations),
        },
        {
            icon: <RiCalendar2Fill />,
            title: __("client.efs_pickup_date", localizations),
            para: __("client.efs_pickup_date_t", localizations),
        },
        {
            icon: <FaKey />,
            title: __("client.efs_take_car", localizations),
            para: __("client.efs_take_car_t", localizations),
        },
    ];



    const handleFilterClickBoolean2 = function (event, code, value) {
        //Inertia.visit('?brand=12');


        if (event.target.checked === false) {
            appliedFilters[code] = [value.toString()];
        } else {
            delete appliedFilters[code];
        }

        console.log(appliedFilters);
    };

    const handleFilterClickAddress = function (event, code, value) {
        //Inertia.visit('?brand=12');

        if (value) {
            appliedFilters[code] = [value];
        } else {
            delete appliedFilters[code];
        }

        console.log(appliedFilters);
    };

    function search() {
        let params = [];

        for (let key in appliedFilters) {
            params.push(key + "=" + appliedFilters[key].join(","));
        }

        Inertia.visit(route('client.car.index') + "?" + params.join("&"));
    }

    const [diffLoc, setDiffLoc] = useState(false);
    const dropLocationCheck = useRef();

    const [pickupd, setPickupd] = useState(__('client.select_pickup_date',localizations));
    const [dropoffd, setDropoffd] = useState(__('client.select_drop_date',localizations));

    const [pickupdo, setPickupdo] = useState(null);
    const [dropoffdo, setDroroffdo] = useState(null);

    const [pickup_time, setPickup_time] = useState(null);



    useEffect(()=>{
        if (appliedFilters.hasOwnProperty("same")) {
            if (appliedFilters["same"].includes((1).toString())) {
                setDiffLoc(true)
            } else setDiffLoc(false)
        } else setDiffLoc(false)
        if (appliedFilters.hasOwnProperty("pickup_date")) {

            setPickupdo(new Date(appliedFilters['pickup_date']));
            setPickupd(appliedFilters['pickup_date']);
        }
        if (appliedFilters.hasOwnProperty("dropoff_date")) {

            setDroroffdo(new Date(appliedFilters['dropoff_date']));
            setDropoffd(appliedFilters['dropoff_date']);
        }

    },[])

    return (
        <Layout seo={seo}>
            <>
                <section
                    className="heroSection"
                    style={{
                        backgroundImage: `url('/client/assets/images/bg/1.png')`,
                    }}
                >
                    <div className="wrapper main-bg">
                        <h1>{__("client.home_sec1_h", localizations)}</h1>
                        <p>S{__("client.home_sec1_t", localizations)}</p>
                    </div>
                </section>
                <section className="wrapper homeFilter flex">
                    <div className="left">
                        <div className="flex">
                            <PickupLocation
                                diffLoc={diffLoc}
                                dropOff={false}
                                onChange={(value, event) => {
                                    handleFilterClickAddress(event,'pickup',value)
                                }}
                                onChangeDrop={(value, event) => {
                                    handleFilterClickAddress(event,'dropoff',value)
                                }}
                            />

                            <div className="flex check">
                                <input
                                    ref={dropLocationCheck}
                                    type="checkbox"
                                    name=""
                                    id="dropLocationCheck"
                                    checked={diffLoc}
                                    onChange={(event)=>{
                                        handleFilterClickBoolean2(event,'same',1)
                                    }}
                                />
                                <label
                                    onClick={() => {
                                        setDiffLoc(!diffLoc)
                                    }}
                                    htmlFor="dropLocationCheck"
                                >
                                    <div></div>
                                </label>
                                <label
                                    onClick={() => setDiffLoc(!diffLoc)}
                                    htmlFor="dropLocationCheck"
                                >
                                    {__('client.drop_diff_location',localizations)}
                                </label>
                            </div>
                        </div>
                        <div className="flex">
                            <PickupDate onChange={(value,event) => {
                                setPickupd(
                                    moment(value).format("YYYY-MM-DD")
                                );
                                setPickupdo(new Date(value));

                                handleFilterClickAddress(event,'pickup_date',moment(value).format("YYYY-MM-DD"))
                            }} value={pickupd} cvalue={pickupdo} />
                            <TimeSelect
                                onChange={(value,event) => {
                                    //alert(value)
                                    handleFilterClickAddress(event,'pickup_time',value)
                                }}
                            />
                            <div className="gap"></div>
                            <DropoffDate onChange={(value,event) => {
                                setDropoffd(moment(value).format("YYYY-MM-DD"))
                                setDroroffdo(new Date(value));
                                handleFilterClickAddress(event,'dropoff_date',moment(value).format("YYYY-MM-DD"))
                            }} value={dropoffd} cvalue={dropoffdo} />
                            <TimeSelect onChange={(value,event) => {
                                handleFilterClickAddress(event,'dropoff_time',value)
                            }} drops={true} />
                        </div>
                    </div>
                    <div className="right">
                        <button onClick={search} className="main-btn">
                            {__("client.search", localizations)}
                        </button>
                    </div>
                    <img
                        className="animated"
                        src="/client/assets/images/other/2.png"
                        alt=""
                    />
                </section>
                <section className="wrapper carSlider_section">
                    <div className="flex">
                        <h3>{__("client.best_deals", localizations)}</h3>
                        <Link href={route("client.car.special")}>
                            <h5>{__("client.see_all", localizations)}</h5>
                        </Link>
                    </div>
                    <CarSlider cars={cars} />
                </section>
                <section className="easyFastSafe wrapper">
                    <h1>{__("client.home_sec2_t", localizations)}</h1>
                    <div className="steps flex center">
                        {easyFastSafe.map((item, index) => {
                            return (
                                <div className="each_step" key={index}>
                                    <div className="icon flex center">
                                        {item.icon}
                                    </div>
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
                            <h3>{__("client.loc_explore", localizations)}</h3>{" "}
                            {__("client.loc_the", localizations)} <br />{" "}
                            {__("client.loc_best", localizations)}{" "}
                            <h3 className="orange">
                                {__("client.loc_destinations", localizations)}
                            </h3>
                        </h4>
                        <p>{__("client.loc_text", localizations)} </p>
                        <Link href={route("client.destination.index")}>
                            <MdRemoveRedEye
                                style={{
                                    fontSize: "18px",
                                    verticalAlign: "middle",
                                    marginRight: "5px",
                                }}
                            />
                            {__("client.all_blogs", localizations)}
                        </Link>
                        <img
                            className="animated"
                            src="/client/assets/images/other/1.png"
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <div className="tags">
                            {categories.map((tag, index) => {
                                let checked;

                                if (appliedFilters2.hasOwnProperty("tag")) {
                                    if (
                                        appliedFilters2["tag"].includes(
                                            tag.id.toString()
                                        )
                                    ) {
                                        checked = true;
                                    } else checked = false;
                                } else checked = false;
                                return (
                                    <Hashtag2
                                        key={index}
                                        text={tag.title}
                                        onClick={(e) => {
                                            handleFilterClick(
                                                checked,
                                                "tag",
                                                tag.id
                                            );
                                        }}
                                        active={checked}
                                    />
                                );
                            })}
                        </div>
                        <div className="destinationGrid">
                            {destinations.map((item, index) => {
                                return (
                                    <DestinationBox
                                        key={index}
                                        link={route(
                                            "client.destination.show",
                                            item.slug
                                        )}
                                        img={
                                            item.latest_image
                                                ? item.latest_image
                                                      .file_full_url
                                                : null
                                        }
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
