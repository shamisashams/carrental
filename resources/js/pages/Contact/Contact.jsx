import "./Contact.css";
import React, {useState} from "react";
//import Img1 from "../../assets/images/other/4.png";
//import Img2 from "../../assets/images/other/5.png";
import { contactInfo } from "../../components/Data";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import Layout from "@/Layouts/Layout";

import { Inertia } from "@inertiajs/inertia";
import {FaEnvelope, FaPhone} from "react-icons/fa";
import {ImLocation} from "react-icons/im";

const Contact = ({seo}) => {

    const { errors, info, localizations } = usePage().props;

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

    const [values, setValues] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        message: "",
    });

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("client.contact.mail"), values);
    }


    return (
      <Layout seo={seo}>
          <div className="contactPage">
              <img className="carImg" src="/client/assets/images/other/4.png" alt="" />
              <div className="wrapper">
                  <div className="container">
                      <div className="title">
                          <p>{__('client.contact_h1',localizations)}</p>
                          <h1>
                              {__('client.contact_h2',localizations)} <img src="/client/assets/images/other/5.png" alt="" />
                          </h1>
                      </div>
                      <form onSubmit={handleSubmit}>
                          <div className="grid">
                              <div>
                                  <label>{__('client.form_name_l',localizations)}</label>
                                  <input type="text" name="name" placeholder={__('client.form_name',localizations)} onChange={handleChange} />
                                  {errors.name && <div>{errors.name}</div>}
                              </div>
                              <div>
                                  <label>{__('client.form_surname_l',localizations)}</label>
                                  <input type="text" name="surname" placeholder={__('client.form_surname',localizations)} onChange={handleChange} />
                                  {errors.surname && <div>{errors.surname}</div>}
                              </div>
                              <div>
                                  <label>{__('client.form_phone_l',localizations)}</label>
                                  <input type="text" name="phone" placeholder={__('client.form_phone',localizations)} onChange={handleChange} />
                                  {errors.phone && <div>{errors.phone}</div>}
                              </div>
                              <div>
                                  <label>{__('client.form_email_l',localizations)}</label>
                                  <input type="text" name="email" placeholder={__('client.form_email',localizations)} onChange={handleChange} />
                                  {errors.email && <div>{errors.email}</div>}
                              </div>
                          </div>
                          <div>
                              <label>{__('client.form_message_l',localizations)}</label>
                              <textarea name="message" placeholder={__('client.form_message',localizations)} onChange={handleChange}></textarea>
                              {errors.message && <div>{errors.message}</div>}
                          </div>
                          <button className="main-btn">{__('client.send_msg',localizations)}</button>
                      </form>
                      <h3 className="op50">{__('client.contact_info',localizations)}</h3>
                      <div className="contact flex">
                          {contactInfo.map((item, index) => {
                              return (
                                  <Link key={index} href={item.link}>
                                      {item.icon}
                                      <h6>{item.text}</h6>
                                  </Link>
                              );
                          })}
                      </div>
                  </div>
              </div>
          </div>
      </Layout>

  );
};

export default Contact;
