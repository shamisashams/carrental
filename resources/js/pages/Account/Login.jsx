import React, {useState} from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import "./Account.css";
import Layout from "@/Layouts/Layout";

import { Inertia } from "@inertiajs/inertia";

const Login = ({seo}) => {

    const { pathname, errors, localizations } = usePage().props;

    const [values, setValues] = useState({
        email: "",
        password: "",
        remember: false
    });

    function handleChange(e) {
        const key = e.target.name;
        let value = e.target.value;
        if (e.target.name === "remember") {
            value = e.target.checked ? true : false;
        }
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("client.login"), values);
    }

  return (
      <Layout seo={seo}>
          <div className="accountPage login wrapper">
              <div className="container">
                  <h2>{__('client.login_h',localizations)}</h2>
                  {errors.email && <div>{errors.email}</div>}
                  <input type="text" placeholder={__('client.form_name',localizations)} name="email" onChange={handleChange} />
                  <input type="password" placeholder={__('client.form_password',localizations)} name="password" onChange={handleChange} />
                  <div className="flex">
                      <div>
                          <input type="checkbox" name="remember" id="agreeTerm" onClick={handleChange} />
                          <label htmlFor="agreeTerm">
                              <div></div>
                          </label>
                          <label htmlFor="agreeTerm">{__('client.form_remember',localizations)}</label>
                      </div>
                      <Link style={{ color: "#4267B2" }} href="/">
                          {__('client.login_forgot_pass',localizations)}
                      </Link>
                  </div>
                  <button onClick={handleSubmit} className="main-btn">{__('client.login_btn',localizations)}</button>
                  <div>
                      {__('client.login_have_not_account',localizations)}{" "}
                      <Link style={{ color: "#FF715A" }} href={route('client.registration.index')}>
                          {__('client.login_join_now',localizations)}
                      </Link>{" "}
                  </div>
              </div>
          </div>
      </Layout>

  );
};

export default Login;
