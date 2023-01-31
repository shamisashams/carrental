import React, { useState } from "react";
import "./Cabinet.css";
import Layout from "@/Layouts/Layout";
import {
    MdAirlineSeatReclineNormal,
    MdLocalGasStation,
    MdLuggage,
} from "react-icons/md";
import { GiCarDoor, GiGearStickPattern } from "react-icons/gi";
import { BsSnow2 } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { UploadImg } from "../../components/Shared/Shared";
import {
    CancelOrder,
    ChangeSettings,
    EditOrder,
    PersonalInfo,
} from "./CabPopups";
import {usePage} from "@inertiajs/inertia-react";
import moment from "moment";

const Cabinet = ({ seo }) => {
    const { user, localizations, current_booking } = usePage().props;
    const [editOrder, setEditOrder] = useState(false);
    const [cancelOrder, setCancelOrder] = useState(false);
    const [personalInfo, setPersonalInfo] = useState(false);
    const [changeSettings, setChangeSettings] = useState(false);

    const history = [
        {
            status: "Finished",
            name: "Volkswagen Golf 2019",
            img: "/client/assets/images/cars/1.png",
            from: "12/12/2022",
            to: "18/12/2022",
            total: "847$",
        },
        {
            status: "Finished",
            name: "Volkswagen Golf 2019",
            img: "/client/assets/images/cars/2.png",
            from: "12/12/2022",
            to: "18/12/2022",
            total: "847$",
        },
        {
            status: "Finished",
            name: "Volkswagen Golf 2019",
            img: "/client/assets/images/cars/3.png",
            from: "12/12/2022",
            to: "18/12/2022",
            total: "847$",
        },
    ];
    const carFeatures = [
        {
            icon: <MdAirlineSeatReclineNormal />,
            text: `4 Seats`,
        },
        {
            icon: <GiCarDoor />,
            text: `4 doors`,
        },
        {
            icon: <MdLocalGasStation />,
            text: "Petrol",
        },
        {
            icon: <MdLuggage />,
            text: "5 small bags",
        },
        {
            icon: <GiGearStickPattern />,
            text: "Automatic",
        },
        {
            icon: <BsSnow2 />,
            text: "Air conditioning",
        },
    ];
    const info = [
        {
            title: "pick-up location",
            value: "3019 Walnut Avenue, PORTLAND",
        },
        {
            title: "pick-up Date",
            value: "December 12, 2022",
        },
        {
            title: "pick-up Time",
            value: "23:45",
        },
        {
            title: "Drop-off location",
            value: "3019 Walnut Avenue, PORTLAND",
        },
        {
            title: "Drop-off Date",
            value: "December 15, 2022",
        },
        {
            title: "Drop-off Time",
            value: "23:45",
        },
    ];

    //console.log(current_booking);

    return (
        <Layout seo={seo}>
            <div className="cabinetPage wrapper ">
                <h2>My Cabinet</h2>
                <div className="flex cabinet">
                    <div className="gray_box large">
                        {/* if there's no current order make no {{ display: flex }} 👇 */}
                        <div
                            className="no_order flex center"
                            style={{ display: "none" }}
                        >
                            <img
                                src="/client/assets/images/other/filesearch.png"
                                alt=""
                            />
                            <h5>Nothing to show</h5>
                        </div>
                        <div className="flex head">
                            <h5 style={{ position: "relative", zIndex: "300" }}>
                                Current order
                            </h5>
                            <h5>
                                Total:{" "}
                                <h2
                                    style={{
                                        display: "inline",
                                        color: "#ff715a",
                                        verticalAlign: "middle",
                                        paddingLeft: "11px",
                                    }}
                                >
                                    {current_booking.grand_total}GEL
                                </h2>
                            </h5>
                        </div>
                        <div
                            className="flex main"
                            style={{ alignItems: "flex-start" }}
                        >
                            <div>
                                {" "}
                                <h6>{current_booking.car}</h6>
                                <img
                                    src="/client/assets/images/cars/5.png"
                                    alt=""
                                />
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
                            <div className="right">
                                <div className="grid">
                                    {/*{info.map((item, index) => {
                                        return (
                                            <div key={index} className="">
                                                <h6>{item.title}</h6>
                                                <div>{item.value}</div>
                                            </div>
                                        );
                                    })}*/}
                                    <div className="">
                                        <h6>pickup-loc</h6>
                                        <div>{current_booking.pickup_loc}</div>
                                    </div>
                                    <div className="">
                                        <h6>pickup-date</h6>
                                        <div>{moment(current_booking.pickup_date).format('MMMM DD, YYYY')}</div>
                                    </div>

                                    <div className="">
                                        <h6>pickup-time</h6>
                                        <div>{moment(current_booking.pickup_date).format('LT')}</div>
                                    </div>

                                    <div className="">
                                        <h6>drop-off-loc</h6>
                                        <div>{current_booking.dropoff_loc}</div>
                                    </div>
                                    <div className="">
                                        <h6>pickup-date</h6>
                                        <div>{moment(current_booking.dropoff_date).format('MMMM DD, YYYY')}</div>
                                    </div>

                                    <div className="">
                                        <h6>pickup-time</h6>
                                        <div>{moment(current_booking.dropoff_date).format('LT')}</div>
                                    </div>
                                </div>
                                <h6>Aditional options</h6>
                                <div className="prices">
                                    {current_booking.options.options.map((item,index) => {
                                       return (
                                           <div>
                                               {item.title} - Price per day: {item.price} GEL
                                           </div>
                                       )
                                    })}
                                    {/*<div>
                                        Super cover - Price per day: 53 GEL
                                    </div>
                                    <div>
                                        MP3 USB transmitter - Price per day: 0
                                        Gel
                                    </div>
                                    <div>
                                        Additional driver - Price per day: 31
                                        GEL
                                    </div>*/}
                                </div>
                            </div>
                        </div>
                        <div className="bottom flex">
                            <button
                                onClick={() => setEditOrder(true)}
                                className="main-btn"
                            >
                                Edit order
                            </button>
                            <button
                                onClick={() => setCancelOrder(true)}
                                className="delete flex center icon"
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div>
                    <div className="smalls">
                        <div className="gray_box">
                            <div className="head flex">
                                <h5>Personal information</h5>
                                <button onClick={() => setPersonalInfo(true)}>
                                    <FiEdit />
                                </button>
                            </div>
                            <div className="flex line">
                                <div>Name Surname </div>
                                <div>{user.name} {user.surname} </div>
                            </div>
                            <div className="flex line">
                                <div>Email</div>
                                <div>{user.email}</div>
                            </div>
                            <div className="flex line">
                                <div>Phone</div>
                                <div>{user.phone}</div>
                            </div>
                            <div className="flex line">
                                <div>Password</div>
                                <div>*************</div>
                            </div>
                        </div>
                        <div className="gray_box">
                            <div className="head flex">
                                <h5>Documents</h5>
                            </div>
                            <div className="flex line">
                                <div>Personal ID</div>
                                <div
                                    className="flex"
                                    style={{ position: "relative" }}
                                >
                                    <div className="title front">front</div>
                                    <div className="title back">back</div>
                                    <UploadImg objectID="imgUpload1" />
                                    <UploadImg objectID="imgUpload2" />
                                </div>
                            </div>
                            <div className="flex line">
                                <div>Driving license</div>
                                <div className="flex">
                                    <UploadImg objectID="imgUpload3" />
                                    <UploadImg objectID="imgUpload4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h5>Order history</h5>
                <div className="flex history">
                    {history.length !== 0 ? (
                        // if there is history this shows
                        history.map((item, index) => {
                            return (
                                <div key={index} className="box flex">
                                    <div>
                                        <h6>{item.name}</h6>
                                        <img src={item.img} alt="" />
                                    </div>
                                    <div className="right">
                                        <div>{item.status}</div>
                                        <div className="date">
                                            <div>From - {item.from}</div>
                                            <div>to - {item.to}</div>
                                        </div>
                                        <h6>Total: {item.total}</h6>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        // if there's no history this shows:
                        <div className="box flex center empty">
                            <img
                                src="/client/assets/images/other/filesearch.png"
                                alt=""
                            />
                            <h5>Nothing to show</h5>
                        </div>
                    )}
                </div>
                <EditOrder show={editOrder} hide={() => setEditOrder(false)} />
                <CancelOrder
                    show={cancelOrder}
                    hide={() => setCancelOrder(false)}
                />
                <PersonalInfo
                    show={personalInfo}
                    hide={() => setPersonalInfo(false)}
                    changeSettings={() => setChangeSettings(true)}
                />
                <ChangeSettings
                    show={changeSettings}
                    hide={() => setChangeSettings(false)}
                />
            </div>
        </Layout>
    );
};

export default Cabinet;
