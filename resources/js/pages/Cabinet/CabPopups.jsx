import React, { useRef, useEffect } from "react";
import {
    DropoffDate,
    PickupDate,
    PickupLocation,
} from "../../components/Shared/Shared";
import { MdOutlineClose } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import "./Cabinet.css";
import { Link } from "@inertiajs/inertia-react";

export const EditOrder = ({ show, hide }) => {
    const options = [
        "Super cover - Price per day: 53 GEL",
        "Additional driver -  Price per day: 31 GEL",
        "MP3 USB transmitter - Price per day: 0 Gel",
        "GPS Navigator - Price per day: 31 GEL",
        "Baby car seat - Price per day: 25 GEL",
        "Roof basket 1254 - Price per day: 47 GEL",
    ];

    return (
        <>
            <div className={`cabBackground ${show && "show"}`}>
                <div onClick={hide} className="underlay"></div>
                <div className="cabPopup editOrder">
                    <button onClick={hide} className="close">
                        <MdOutlineClose />
                    </button>
                    <div className="container">
                        <h3>Edit order</h3>
                        <h6>Volkswagen Golf 2019</h6>
                        <img src="/client/assets/images/cars/5.png" alt="" />
                        <h6>Locations</h6>
                        <PickupLocation dropOff={false} />
                        <PickupLocation dropOff={true} />
                        <h6>Date</h6>
                        <PickupDate />
                        <DropoffDate />
                        <h6>Aditional options</h6>
                        {options.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex check"
                                    style={{ justifyContent: "flex-start" }}
                                >
                                    <input
                                        type="checkbox"
                                        name=""
                                        id={`option_${index}`}
                                    />
                                    <label htmlFor={`option_${index}`}>
                                        <div></div>
                                    </label>
                                    <label htmlFor={`option_${index}`}>
                                        {item}
                                    </label>
                                </div>
                            );
                        })}
                        <button className="main-btn submit">Save change</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export const CancelOrder = ({ show, hide }) => {
    return (
        <>
            <div className={`cabBackground ${show && "show"}`}>
                <div onClick={hide} className="underlay"></div>
                <div className="cabPopup editOrder">
                    <button onClick={hide} className="close">
                        <MdOutlineClose />
                    </button>
                    <div className="container">
                        <h3>Cancel order?</h3>
                        <div>
                            To cancel order please enter password and accept
                            terms of use
                        </div>
                        <div style={{ marginTop: "30px" }}>
                            <div className="input">
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    name=""
                                    id=""
                                />
                                <button className="eye">
                                    <FaEye />
                                </button>
                            </div>
                        </div>
                        <div
                            className="flex check"
                            style={{ justifyContent: "center" }}
                        >
                            <input type="checkbox" name="" id="terms_use" />
                            <label htmlFor="terms_use">
                                <div></div>
                            </label>
                            <label htmlFor="terms_use">
                                I agree with{" "}
                                <Link
                                    href="/"
                                    style={{ textDecoration: "underline" }}
                                >
                                    {" "}
                                    Terms of Use
                                </Link>
                            </label>
                        </div>

                        <button disabled className="main-btn submit">
                            Cancel order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export const PersonalInfo = ({ show, hide, changeSettings }) => {
    return (
        <>
            <div className={`cabBackground ${show && "show"}`}>
                <div onClick={hide} className="underlay"></div>
                <div className="cabPopup editOrder">
                    <button onClick={hide} className="close">
                        <MdOutlineClose />
                    </button>
                    <div className="container">
                        <h3>personal information</h3>
                        <div className="label">Personal information</div>
                        <input type="text" placeholder="Name" name="" id="" />
                        <input
                            type="text"
                            placeholder="Surname"
                            name=""
                            id=""
                        />
                        <div className="label">Contact information</div>
                        <input type="text" placeholder="E-mail" name="" id="" />
                        <input
                            type="text"
                            placeholder="Phone number"
                            name=""
                            id=""
                        />
                        <div className="label">Change password</div>
                        <div className="input">
                            <input
                                type="password"
                                placeholder="Enter old password"
                                name=""
                                id=""
                            />
                            <button className="eye">
                                <FaEye />
                            </button>
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                placeholder="Enter new password"
                                name=""
                                id=""
                            />
                            <button className="eye">
                                <FaEye />
                            </button>
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                placeholder="Repeat new password"
                                name=""
                                id=""
                            />
                            <button className="eye">
                                <FaEye />
                            </button>
                        </div>
                        <div
                            className="flex check"
                            style={{ justifyContent: "center" }}
                        >
                            <input type="checkbox" name="" id="terms_use2" />
                            <label htmlFor="terms_use2">
                                <div></div>
                            </label>
                            <label htmlFor="terms_use2">
                                I agree with{" "}
                                <Link
                                    href="/"
                                    style={{ textDecoration: "underline" }}
                                >
                                    {" "}
                                    Terms of Use
                                </Link>
                            </label>
                        </div>

                        <button
                            // this opens the component ChangeSettings
                            onClick={changeSettings}
                            disabled
                            className="main-btn submit"
                        >
                            Cancel order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export const ChangeSettings = ({ show, hide }) => {
    return (
        <>
            <div className={`cabBackground ${show && "show"}`}>
                <div onClick={hide} className="underlay"></div>
                <div className="cabPopup editOrder">
                    <button onClick={hide} className="close">
                        <MdOutlineClose />
                    </button>
                    <div className="container">
                        <h3>Change settings?</h3>
                        <div>
                            To change personal information please enter password
                            and accept terms of use
                        </div>
                        <div style={{ marginTop: "30px" }}>
                            <div className="input">
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    name=""
                                    id=""
                                />
                                <button className="eye">
                                    <FaEye />
                                </button>
                            </div>
                        </div>
                        <div
                            className="flex check"
                            style={{ justifyContent: "center" }}
                        >
                            <input type="checkbox" name="" id="terms_use3" />
                            <label htmlFor="terms_use3">
                                <div></div>
                            </label>
                            <label htmlFor="terms_use3">
                                I agree with{" "}
                                <Link
                                    href="/"
                                    style={{ textDecoration: "underline" }}
                                >
                                    {" "}
                                    Terms of Use
                                </Link>
                            </label>
                        </div>

                        <button disabled className="main-btn submit">
                            Apply changes
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
