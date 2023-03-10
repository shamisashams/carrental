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
    Failure,
    PersonalInfo,
    SuccessPopup,
} from "./CabPopups";
import { usePage } from "@inertiajs/inertia-react";
import moment from "moment";

const Cabinet = ({ seo }) => {
    const { user, localizations, current_booking, bookings } = usePage().props;
    const [editOrder, setEditOrder] = useState(false);
    const [cancelOrder, setCancelOrder] = useState(false);
    const [personalInfo, setPersonalInfo] = useState(false);
    const [changeSettings, setChangeSettings] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);

    const [cancelBooking, setCancelBooking] = useState(null);

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

    //console.log(user);

    return (
        <Layout seo={seo}>
            <div className="cabinetPage wrapper ">
                <h2>{__('client.cabinet',localizations)}</h2>
                <div className="flex cabinet">
                    <div className="gray_box large">
                        {/* if there's no current order make no {{ display: flex }} ???? */}
                        {!current_booking.length ? (
                            <div
                                className="no_order flex center"
                                style={{ display: "flex" }}
                            >
                                <img
                                    src="/client/assets/images/other/filesearch.png"
                                    alt=""
                                />
                                <h5>{__('client.nothing_show',localizations)}</h5>
                            </div>
                        ) : null}

                        {current_booking.length ?
                            current_booking.map((item,index)=>{
                                return (
                                    <div>

                                        <div className="flex head">
                                            <h5
                                                style={{
                                                    position: "relative",
                                                    zIndex: "300",
                                                }}
                                            >
                                                {__('client.current_booking',localizations)}
                                            </h5>
                                            <h5>
                                                {__('client.grand_total',localizations)}:{" "}
                                                <h2
                                                    style={{
                                                        display: "inline",
                                                        color: "#ff715a",
                                                        verticalAlign: "middle",
                                                        paddingLeft: "11px",
                                                    }}
                                                >
                                                    {item.grand_total}GEL
                                                </h2>
                                            </h5>
                                        </div>


                                        <div
                                            className="flex main"
                                            style={{ alignItems: "flex-start" }}
                                        >
                                            <div>
                                                {" "}
                                                <h6>{item.car}</h6>
                                                <img
                                                    src={item.car_image}
                                                    alt=""
                                                />
                                                <div className="grid list">

                                                        <div >
                                                            <span><MdAirlineSeatReclineNormal/></span>
                                                            {item.options.car_info.seat} {__('client.seats',localizations)}
                                                        </div>

                                                    <div >
                                                        <span><GiCarDoor/></span>
                                                        {item.options.car_info.door} {__('client.doors',localizations)}
                                                    </div>

                                                    <div >
                                                        <span><MdLocalGasStation/></span>
                                                        {item.options.car_info.fuel}
                                                    </div>

                                                    <div >
                                                        <span><MdLuggage/></span>
                                                        {item.options.car_info.bag}
                                                    </div>
                                                    <div >
                                                        <span><GiGearStickPattern/></span>
                                                        {item.options.car_info.transmission}
                                                    </div>
                                                    <div >
                                                        <span><BsSnow2/></span>
                                                        {item.options.car_info.air_conditioning?__('client.air_conditioning',localizations):__('client.none',localizations)}
                                                    </div>

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
                                                        <h6>{__('client.pickup_loc',localizations)}</h6>
                                                        <div>
                                                            {item.pickup_loc}
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <h6>{__('client.pickup_date',localizations)}</h6>
                                                        <div>
                                                            {moment(
                                                                item.pickup_date
                                                            ).format("MMMM DD, YYYY")}
                                                        </div>
                                                    </div>

                                                    <div className="">
                                                        <h6>{__('client.pickup_time',localizations)}</h6>
                                                        <div>
                                                            {moment(
                                                                item.pickup_date
                                                            ).format("LT")}
                                                        </div>
                                                    </div>

                                                    <div className="">
                                                        <h6>{__('client.drop_off_loc',localizations)}</h6>
                                                        <div>
                                                            {item.dropoff_loc}
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <h6>{__('client.drop_off_date',localizations)}</h6>
                                                        <div>
                                                            {moment(
                                                                item.dropoff_date
                                                            ).format("MMMM DD, YYYY")}
                                                        </div>
                                                    </div>

                                                    <div className="">
                                                        <h6>{__('client.drop_off_time',localizations)}</h6>
                                                        <div>
                                                            {moment(
                                                                item.dropoff_date
                                                            ).format("LT")}
                                                        </div>
                                                    </div>
                                                </div>
                                                <h6>{__('client.extra_options',localizations)}</h6>
                                                <div className="prices">
                                                    {item.options.options.map(
                                                        (item, index) => {
                                                            return (
                                                                <div>
                                                                    {item.title} - Price per
                                                                    day: {item.price} GEL
                                                                </div>
                                                            );
                                                        }
                                                    )}
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
                                            {/* <button
                                onClick={() => setEditOrder(true)}
                                className="main-btn"
                            >
                                Edit order
                            </button> */}
                                            <button
                                                onClick={() => {
                                                    setCancelOrder(true);
                                                    setCancelBooking(item);
                                                }}
                                                className="delete flex center icon"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>

                                    </div>
                                )
                            })
                            :null}
                    </div>
                    <div className="smalls">
                        <div className="gray_box">
                            <div className="head flex">
                                <h5>{__('client.personal_info',localizations)}</h5>
                                <button onClick={() => setPersonalInfo(true)}>
                                    <FiEdit />
                                </button>
                            </div>
                            <div className="flex line">
                                <div>{__('client.form_name',localizations)} {__('client.form_surname',localizations)} </div>
                                <div>
                                    {user.name} {user.surname}{" "}
                                </div>
                            </div>
                            <div className="flex line">
                                <div>{__('client.form_email',localizations)}</div>
                                <div>{user.email}</div>
                            </div>
                            <div className="flex line">
                                <div>{__('client.form_phone',localizations)}</div>
                                <div>{user.phone}</div>
                            </div>
                            <div className="flex line">
                                <div>{__('client.form_password',localizations)}</div>
                                <div>*************</div>
                            </div>
                        </div>
                        <div className="gray_box">
                            <div className="head flex">
                                <h5>{__('client.documents',localizations)}</h5>
                            </div>
                            <div className="flex line">
                                <div>{__('client.personal_id',localizations)}</div>
                                <div
                                    className="flex"
                                    style={{ position: "relative" }}
                                >
                                    <div className="title front">{__('client.front',localizations)}</div>
                                    <div className="title back">{__('client.back',localizations)}</div>
                                    <UploadImg objectID="imgUpload1" value={user.personal_files.id1} type={'id_1'} />
                                    <UploadImg objectID="imgUpload2" value={user.personal_files.id2} type={'id_2'} />
                                </div>
                            </div>
                            <div className="flex line">
                                <div>{__('client.driving_license',localizations)}</div>
                                <div className="flex">
                                    <UploadImg objectID="imgUpload3" value={user.personal_files.drl1} type={'drl_1'} />
                                    <UploadImg objectID="imgUpload4" value={user.personal_files.drl2} type={'drl_2'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h5>{__('client.book_history',localizations)}</h5>
                <div className="flex history">
                    {bookings.length !== 0 ? (
                        // if there is history this shows
                        bookings.map((item, index) => {
                            return (
                                <div
                                    onClick={() => {
                                        setEditOrder(true);
                                        setCancelBooking(item);
                                    }}
                                    key={index}
                                    className="box flex"
                                >
                                    <div>
                                        <h6>{item.car}</h6>
                                        <img src={item.car_image} alt="" />
                                    </div>
                                    <div className="right">
                                        <div>{item.status}</div>
                                        <div className="date">
                                            <div>
                                                From -{" "}
                                                {moment(
                                                    item.pickup_date
                                                ).format("DD/MM/YYYY")}
                                            </div>
                                            <div>
                                                to -{" "}
                                                {moment(
                                                    item.dropoff_date
                                                ).format("DD/MM/YYYY")}
                                            </div>
                                        </div>
                                        <h6>{__('client.grand_total',localizations)}: {item.grand_total}</h6>
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
                            <h5>{__('client.nothing_show',localizations)}</h5>
                        </div>
                    )}
                </div>
                <EditOrder show={editOrder} hide={() => setEditOrder(false)} booking={cancelBooking} />
                <CancelOrder
                    show={cancelOrder}
                    hide={() => setCancelOrder(false)}
                    current_booking={cancelBooking}
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
                <SuccessPopup show={success} hide={() => setSuccess(false)} />
                <Failure show={failure} hide={() => setFailure(false)} />
            </div>
        </Layout>
    );
};

export default Cabinet;
