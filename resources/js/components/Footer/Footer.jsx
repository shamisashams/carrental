import React from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
//import { contactInfo, socialMedia } from "../Data";
import "./Footer.css";
import {FaEnvelope, FaFacebookF, FaInstagram, FaPhone, FaTwitter} from "react-icons/fa";
import {ImLocation} from "react-icons/im";

const Footer = () => {

    const { info, localizations, carTypes } = usePage().props;

    const contactInfo = [
        {
            icon: <FaPhone />,
            text: info.phone,
            link: "/",
        },
        {
            icon: <FaEnvelope />,
            text: info.email,
            link: "/",
        },
        {
            icon: <ImLocation />,
            text: info.address,
            link: "/",
        },
    ];


    const socialMedia = [
        {
            icon: <FaFacebookF />,
            link: info.facebook,
        },
        {
            icon: <FaTwitter />,
            link: info.twitter,
        },
        {
            icon: <FaInstagram />,
            link: info.instagram,
        },
    ];

  const garage = [
    {
      text: "All",
      link: "/",
    },
    {
      text: "Sedan",
      link: "/",
    },
    {
      text: "Hatchback",
      link: "/",
    },
    {
      text: "SUV",
      link: "/",
    },
    {
      text: "Carrier",
      link: "/",
    },
  ];
  return (
    <footer>
      <div className="wrapper flex">
        <div className="col">
          <h3 className="op50">{__('client.footer_garage',localizations)}</h3>
          {carTypes.map((item, index) => {
            return (
              <Link key={index} href={`${route('client.car.index')}?type=${item.id}`}>
                <h5>{item.title}</h5>
              </Link>
            );
          })}
        </div>
        <div className="col">
          <h3 className="op50">{__('client.footer_contact',localizations)}</h3>
          {contactInfo.map((item, index) => {
            return (
              <Link className="contact" key={index} href={item.link}>
                <div className="flex center icon">{item.icon}</div>
                <h5>{item.text}</h5>
              </Link>
            );
          })}
          <div
            className="flex"
            style={{ justifyContent: "flex-start", marginTop: "35px" }}
          >
            <h3 className="op50" style={{ marginRight: "20px" }}>
                {__('client.footer_social',localizations)}
            </h3>
            {socialMedia.map((item, index) => {
              return (
                <a className="icon flex center" href={item.link} key={index}>
                  {item.icon}
                </a>
              );
            })}
          </div>
        </div>
        <div className="col">
          <div className="map">
            <iframe
              title="map_location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d56677.00529544399!2d44.797358915912675!3d41.70501959092637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sge!4v1673510079418!5m2!1sen!2sge"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <h5>Designed by Insite international</h5>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
