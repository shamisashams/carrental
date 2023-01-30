import "./Payment.css";
//import Tbc from "../../assets/images/banks/1.png";
//import Bog from "../../assets/images/banks/2.png";
//import Paypal from "../../assets/images/banks/3.png";
import { MdDownload } from "react-icons/md";
//import Car5 from "../../assets/images/cars/5.png";
import { ImLocation2, ImLocation } from "react-icons/im";
import React, {useState} from "react";
import Layout from "@/Layouts/Layout";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const Payment = ({seo}) => {

    const {booking, localizations} = usePage().props;

    console.log(booking);

    function makeBook(bank) {


        Inertia.post(route("client.checkout.order"), { payment_type: bank });
    }


    return (
      <Layout seo={seo}>
          <div className="paymentPage wrapper flex">
              <div className="gray_box large">
                  <h3>Choose a payment method</h3>
                  <button onClick={() => {
                      makeBook('tbc')
                  }}>
                      <img src="/client/assets/images/banks/1.png" alt="" />
                  </button>
                  <button onClick={() => {
                      makeBook('bog')
                  }}>
                      <img src="/client/assets/images/banks/2.png" alt="" />
                  </button>
                  <button onClick={() => {
                      makeBook('paypal')
                  }}>
                      <img src="/client/assets/images/banks/3.png" alt="" />
                  </button>
                  {/*<button>
                      <h5>Download pdf</h5> <MdDownload />
                  </button>*/}
              </div>
              <div className="smalls">
                  <div className="gray_box">
                      <h5>{booking.car.brand?booking.car.brand.title:''} {booking.car.model} {/*2019*/}</h5>
                      <img src={booking.car.latest_image?booking.car.latest_image.file_full_url:''} alt="" />
                  </div>
                  <div className="gray_box">
                      <h5>Booking information</h5>
                      <div className="flex">
                          <div>Pick up</div>
                          <div>{booking.pickup_date}</div>
                          <div>{booking.pickup_time}</div>
                      </div>
                      <p>
                          {" "}
                          <ImLocation2 /> {booking.pickup_address.text}{" "}
                      </p>
                      <div className="flex">
                          <div>Drop off</div>
                          <div>{booking.dropoff_date}</div>
                          <div>{booking.dropoff_time}</div>
                      </div>
                      <p>
                          {" "}
                          <ImLocation2 /> {booking.dropoff_address.text}{" "}
                      </p>
                  </div>
                  <div className="gray_box">
                      <h5>Pay now</h5>
                      <div className="flex">
                          <div>Prepayment x {booking.period} days</div>
                          <div>{booking.car_price_total}GEL</div>
                      </div>

                      {/*<div className="flex">
                          <div>Pay at the counter</div>
                          <div>25$</div>
                      </div>*/}
                      {booking.options.map((item, index) => {
                          return (
                              <div className="flex">
                                  <div>{item.title} {item.per_day?` x ${booking.period} days`:''}</div>
                                  <div>{item.price}GEL</div>
                              </div>
                          )
                      })}

                      {booking.drop_pay?<div className="flex">
                          <div>{booking.drop_pay.text} - drop pay</div>
                          <div>{booking.drop_pay.price}</div>
                      </div>:null}

                      <div className="flex">
                          <div>Insurance</div>
                          <div>12$</div>
                      </div>
                      <div className="flex last">
                          <h5>Total:</h5>
                          <h5 style={{ color: "#FF715A" }}>{booking.grand_total}GEL</h5>
                      </div>
                  </div>
              </div>
          </div>
      </Layout>

  );
};

export default Payment;
