import React, { useState, useRef, useEffect } from "react";
//import { Link } from "react-router-dom";
import {Link, useForm, usePage} from "@inertiajs/inertia-react";
import "./Shared.css";
import { HiChevronDown } from "react-icons/hi";
import { ImLocation2 } from "react-icons/im";
import { RiCalendar2Fill } from "react-icons/ri";
import {
    MdAirlineSeatReclineNormal,
    MdLocalGasStation,
    MdLuggage,
    MdFileUpload,
} from "react-icons/md";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { GiCarDoor, GiGearStickPattern } from "react-icons/gi";
import { BsSnow2 } from "react-icons/bs";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const Hashtag = ({ text }) => {
    const [active, setActive] = useState();

    return (
        <button
            onClick={() => setActive(!active)}
            className={`hashtag ${active && "active"}`}
        >
            {text}
        </button>
    );
};

export const Hashtag2 = ({ text, onClick, active }) => {
    //const [active, setActive] = useState();

    return (
        <button onClick={onClick} className={`hashtag ${active && "active"}`}>
            {text}
        </button>
    );
};

export const DestinationBox = (props) => {
    const {localizations} = usePage().props;
    return (
        <div className="destinationBox">
            <Link href={props.link} className="img">
                <img src={props.img} alt="" />
                <div className="overlay flex center">
                    <button>{__('client.learn_more',localizations)}</button>
                </div>
            </Link>
            <div>{props.title}</div>
            <p>{props.para}</p>
        </div>
    );
};

export const PickupLocation = ({
    diffLoc,
    dropOff,
    onChange,
    onChangeDrop
}) => {

    const [drop1, setDrop1] = useState(false);
    const [drop2, setDrop2] = useState(false);
    const [result, setResult] = useState([]);
    const [pickup, setPickup] = useState("Select pick-up location");
    const [dropoff, setDropoff] = useState("Select dropoff-off location");
    const wrapperRef = useRef(null);



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
            } else {
                axios
                    .post(route("search.address"), { term: '' })
                    .then(function (response) {
                        console.log(response);
                        setResult(response.data);
                    });
            }
        }, 300);
    }

    /*let appliedFilters = [];
    let urlParams = new URLSearchParams(window.location.search);

    urlParams.forEach((value, index) => {
        appliedFilters[index] = value.split(",");
    });*/

    useEffect(()=>{

        axios
            .post(route("search.address"), { term: '' })
            .then(function (response) {
                console.log(response);
                setResult(response.data);
            });

        if (appliedFilters.hasOwnProperty("pickup")) {

            if (appliedFilters["pickup"]){
                axios
                    .post(route("get.address"), { id: appliedFilters["pickup"] })
                    .then(function (response) {
                        console.log(response);
                        setPickup(response.data.text);
                    });
            } else setPickup('select pickup loc');


        } else setPickup('select pickup loc');

        if (appliedFilters.hasOwnProperty("dropoff")) {

            if(appliedFilters["dropoff"]){
                axios
                    .post(route("get.address"), { id: appliedFilters["dropoff"] })
                    .then(function (response) {
                        console.log(response);
                        setDropoff(response.data.text);
                    });
            } else setDropoff('select dsropoff loc');


        } else setDropoff('select dsropoff loc');

    },[])

    return (
        <div
            ref={wrapperRef}
            className={`selectBox pickupLocation ${
                diffLoc == true && "diffLoc"
            }`}
        >
            <div className="box flex" style={{ marginBottom: "0" }}>
                <div
                    onClick={() => {
                        setDrop1(!drop1);
                    }}
                    className={`inner_box ${dropOff === true && "inner_box2"}`}
                >
                    <ImLocation2 className="icon" />
                    {pickup}{" "}
                    <HiChevronDown className={`chevron ${drop1 && "rotate"}`} />
                </div>
                <div
                    onClick={() => {
                        setDrop2(!drop2);
                    }}
                    className={`inner_box ${dropOff === false && "inner_box2"}`}
                >
                    <ImLocation2 className="icon" />
                    {dropoff}
                    <HiChevronDown className={`chevron ${drop2 && "rotate"}`} />
                </div>
            </div>

            <div className={`dropdown ${drop1 && "show"}`}>
                <div className="flex" style={{ flexDirection: "row" }}>
                    <input
                        onKeyUp={handleSearch}
                        type="text"
                        placeholder="Enter address"
                    />
                    {/*<div>
            <button className="main-btn"> Ok</button>
          </div>*/}
                </div>

                {result.map((item, index) => {
                    return (
                        <button
                            onClick={(event) => {
                                setPickup(item.text);
                                onChange(item.id, event, item.text);
                            }}
                        >
                            {" "}
                            <ImLocation2 className="icon" /> {item.text}
                        </button>
                    );
                })}
                {/*<button>
          {" "}
          <ImLocation2 className="icon" /> 522 Junkins Avenue. Tbilisi, Georgia
        </button>
        <button>
          {" "}
          <ImLocation2 className="icon" /> 2407 Woodstock Drive. Tbilisi,
          Georgia
        </button>
        <button>
          {" "}
          <ImLocation2 className="icon" /> 4550 Red Bud Lane. Telavei, Georgia.
        </button>*/}
            </div>
            <div className={`dropdown ${drop2 && "show"}`}>
                <div className="flex" style={{ flexDirection: "row" }}>
                    <input
                        type="text"
                        placeholder="Enter address"
                        onKeyUp={handleSearch}
                    />

                    {/*<div>
                        <button className="main-btn"> Ok</button>
                    </div>*/}
                </div>
                {result.map((item, index) => {
                    return (
                        <button
                            onClick={(event) => {
                                setDropoff(item.text);

                                onChangeDrop(item.id, event, item.text);
                            }}
                        >
                            {" "}
                            <ImLocation2 className="icon" /> {item.text}
                        </button>
                    );
                })}
                {/*<button>
                    {" "}
                    <ImLocation2 className="icon" /> 4550 Red Bud Lane. Telavei,
                    Georgia.
                </button>*/}
            </div>
        </div>
    );
};

export const PickupDate = ({ onChange, value }) => {
    const [drop, setDrop] = useState(false);
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setDrop(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <div ref={wrapperRef} className="selectBox ">
            <div onClick={() => setDrop(!drop)} className="box date">
                <RiCalendar2Fill className="icon" />
                {value}
                <HiChevronDown className={`chevron ${drop && "rotate"}`} />
            </div>
            <div className={`dropdown calendar_drop ${drop && "show"}`}>
                <Calendar
                    onChange={(value) => {
                        onChange(value);
                    }}
                />
            </div>
        </div>
    );
};

export const DropoffDate = ({ onChange, value }) => {
    const [drop, setDrop] = useState(false);
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setDrop(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <div ref={wrapperRef} className="selectBox ">
            <div onClick={() => setDrop(!drop)} className="box date">
                <RiCalendar2Fill className="icon" />
                {value}
                <HiChevronDown className={`chevron ${drop && "rotate"}`} />
            </div>
            <div className={`dropdown calendar_drop ${drop && "show"}`}>
                <Calendar
                    onChange={(value) => {
                        onChange(value);
                    }}
                />
            </div>
        </div>
    );
};

export const TimeSelect = ({ onChange }) => {
    const [drop, setDrop] = useState(false);
    const wrapperRef = useRef(null);

    const [dropv, setDropv] = useState("select time");

    useOutsideAlerter(wrapperRef);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setDrop(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    function returnTimesInBetween(start, end) {
        var timesInBetween = [];

        var startH = parseInt(start.split(":")[0]);
        var startM = parseInt(start.split(":")[1]);
        var endH = parseInt(end.split(":")[0]);
        var endM = parseInt(end.split(":")[1]);

        if (startM == 30) startH++;

        for (var i = startH; i < endH; i++) {
            timesInBetween.push(i < 10 ? "0" + i + ":00" : i + ":00");
            timesInBetween.push(i < 10 ? "0" + i + ":30" : i + ":30");
        }

        timesInBetween.push(endH + ":00");
        if (endM == 30) timesInBetween.push(endH + ":30");

        return timesInBetween;
    }

    let t = returnTimesInBetween("00:00:00", "23:30:00");

    return (
        <div ref={wrapperRef} className="selectBox ">
            <div onClick={() => setDrop(!drop)} className="box">
                {dropv}
                <HiChevronDown className={`chevron ${drop && "rotate"}`} />
            </div>
            <div className={`dropdown time ${drop && "show"}`}>
                {t.map((item, index) => {
                    return (
                        <button
                            onClick={(event) => {
                                onChange(event.target.innerText);
                                setDropv(event.target.innerText);
                                setDrop(false);
                            }}
                        >
                            {item}
                        </button>
                    );
                })}

                {/*<button>12:00</button>
        <button>15:30</button>
        <button>18:45</button>*/}
            </div>
        </div>
    );
};

export const NumberOfSeats = () => {
    const [drop, setDrop] = useState(false);
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setDrop(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <div ref={wrapperRef} className="selectBox ">
            <div onClick={() => setDrop(!drop)} className="box">
                <MdAirlineSeatReclineNormal className="icon" />
                Number of seats
                <HiChevronDown className={`chevron ${drop && "rotate"}`} />
            </div>
            <div className={`dropdown time ${drop && "show"}`}>
                <button>1</button>
                <button>2</button>
                <button>4</button>
                <button>6</button>
            </div>
        </div>
    );
};

export const CarBox = (props) => {
    const { localizations } = usePage().props;
    const carFeatures = [
        {
            icon: <MdAirlineSeatReclineNormal />,
            text: `${props.car.seat} Seats`,
        },
        {
            icon: <GiCarDoor />,
            text: `${props.car.door} doors`,
        },
        {
            icon: <MdLocalGasStation />,
            text: props.car.fuel ? props.car.fuel.title : "unknown",
        },
        {
            icon: <MdLuggage />,
            text: props.car.bag ? props.car.bag.title : "unknown",
        },
        {
            icon: <GiGearStickPattern />,
            text: props.car.transmission
                ? props.car.transmission.title
                : "unknown",
        },
        {
            icon: <BsSnow2 />,
            text: props.car.air_conditioning ? "Air conditioning" : "none",
        },
    ];
    return (
        <div className="carBox">
            <h5>{props.model}</h5>
            <div className="flex">
                <div className="img">
                    <img src={props.img} alt="" />
                </div>
                <div className="grid">
                    {carFeatures.map((item, index) => {
                        return (
                            <div key={index}>
                                <span>{item.icon}</span>
                                {item.text}
                            </div>
                        );
                    })}
                </div>
                <div style={{ textAlign: "center" }}>
                    {props.special_price ? (
                        <>
                            <h4 style={{ textDecoration: "line-through" }}>
                                {props.price}GEL
                            </h4>
                            <h3 className="orange">
                                {props.special_price}GEL day
                            </h3>{" "}
                        </>
                    ) : (
                        <h4>{props.price}GEL</h4>
                    )}

                    <Link
                        href={route("client.car.show", props.slug)}
                        className="main-btn-sml"
                    >
                        {__("client.book_now", localizations)}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export const Pagination = () => {
    return (
        <div className="pagination flex center">
            <button>
                <CgChevronLeft />
            </button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>
                <CgChevronRight />
            </button>
        </div>
    );
};

export const UploadImg = ({ objectID, value, type }) => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (selectedImg) {
            setImageUrl(URL.createObjectURL(selectedImg));
            handleSubmit()
        }
    }, [selectedImg]);

    const { data, setData, post, progress } = useForm({
        [type]: null,
    });

    function handleSubmit(e) {
        //e.preventDefault();
        post(route("client.upload_img"));
    }

    return (
        <>
            <input
                onChange={(e) => {
                    setSelectedImg(e.target.files[0]);
                    setData(type, e.target.files[0]);

                }}
                type="file"
                name=""
                id={objectID}
            />
            <label className="icon flex center" htmlFor={objectID}>
                {imageUrl||value ? <img src={imageUrl||value} alt="" /> : <MdFileUpload />}
            </label>
        </>
    );
};
