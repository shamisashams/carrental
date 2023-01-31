import React, { useState } from "react";
//import { Link, useLocation } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
//import Logo from "../../assets/images/logo/1.png";
import { MdArrowDropDown } from "react-icons/md";
import "./Navbar.css";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { pathname, locales, currentLocale, locale_urls, localizations } = usePage().props;

  const navigations = [
    {
      link: route('client.home.index'),
      text: __('client.nav_home',localizations),
    },
    /*{
      link: "/rent",
      text: __('client.nav_rent',localizations),
    },*/
    {
      link: route('client.car.index'),
      text: __('client.nav_cars',localizations),
    },
    {
      link: route('client.faq.index'),
      text: __('client.nav_faq',localizations),
    },
    {
      link: route('client.destination.index'),
      text: __('client.nav_destination',localizations),
    },
    {
      link: route('client.about.index'),
      text: __('client.nav_about',localizations),
    },
    {
      link: route('client.contact.index'),
      text: __('client.nav_contact',localizations),
    },
  ];
  return (
    <header className="navbar">
      <div className="mobile_content wrapper flex">
        <Link href={route('client.home.index')}>
          <img src="/client/assets/images/logo/1.png" alt="" />
        </Link>
        <button onClick={() => setMenu(true)} id="menuBtn">
          Menu
        </button>
      </div>
      <div className={`wrapper header-content flex ${menu && "show"}`}>
        <button onClick={() => setMenu(false)} className="closeMenu">
          <IoClose />
        </button>
        <Link href={route('client.home.index')}>
          <img src="/client/assets/images/logo/1.png" alt="" />
        </Link>
        <ul>
          {navigations.map((nav, index) => {
            return (
              <li
                key={index}
                className={`navbar-elements ${
                  pathname === nav.link && "active"
                }`}
              >
                <Link href={nav.link}>{nav.text}</Link>
              </li>
            );
          })}
        </ul>
        <div className="flex aut-seg">
          <Link className="sign-up" href={route('client.registration.index')}>
              {__('client.nav_signup',localizations)}
          </Link>
          <Link className="main-btn-sml log-in" href={route('client.login.index')}>
              {__('client.nav_login',localizations)}
          </Link>
          <div className="languages">
            <div className="">
              <MdArrowDropDown className="" />

                {Object.keys(locales).map((name, index) => {
                    if (locales[name] === currentLocale) {
                        return name;
                    }
                })}
            </div>
            <div className="dropdown">

                {Object.keys(locales).map((name, index) => {
                    if (locales[name] !== currentLocale) {
                        return (
                            <a
                                href={locale_urls[name]}
                                key={name + "locale"}
                            >
                                {name}
                            </a>
                        );
                    }
                })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
