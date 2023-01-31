import React, {useState} from "react";
//import { Link } from "react-router-dom";
import { Link, usePage, useForm } from "@inertiajs/inertia-react";
import "./Account.css";
import Layout from "@/Layouts/Layout";

import { Inertia } from "@inertiajs/inertia";

const Signup = ({seo}) => {

    const { errors, localizations } = usePage().props;


    const { data, setData, post, progress } = useForm({
        name: null,
        surname: null,
        email: null,
        phone: null,
        password: null,
        id_1: null,
        id_2: null,
        drl_1: null,
        drl_2: null
    });

    function handleChange(e) {
        setData(e.target.name, e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(route("client.register"));
    }

  return (
      <Layout seo={seo}>
          <div className="accountPage wrapper">
              <div className="container">
                  <h2>{__('client.signup_h',localizations)}</h2>
                  <div>{__('client.signup_t',localizations)}</div>
                  <div className="grid">
                      <input type="text" placeholder={__('client.form_name',localizations)} name="name" onChange={handleChange} />
                      <input type="text" placeholder={__('client.form_surname',localizations)} name="surname" onChange={handleChange} />
                      <input type="text" placeholder={__('client.form_email',localizations)} name="email" onChange={handleChange} />
                      <input type="text" placeholder={__('client.form_phone',localizations)} name="phone" onChange={handleChange} />
                      <input type="password" placeholder={__('client.form_password',localizations)} name="password" onChange={handleChange} />
                      <input type="password" placeholder={__('client.form_password_repeat',localizations)} name="password_repeat" onChange={handleChange} />
                  </div>
                  <div>{__('client.form_upload',localizations)}</div>
                  <div className="grid">
                      <div className="input">
                          <input type="file" name="file1" onChange={(e) =>
                              setData("id_1", e.target.files[0])
                          } />
                      </div>
                      <div className="input">
                          <input type="file" name="file2" onChange={(e) =>
                              setData("id_2", e.target.files[0])
                          } />
                      </div>
                      <div className="input">
                          <input type="file" name="file3" onChange={(e) =>
                              setData("drl_1", e.target.files[0])
                          } />
                      </div>
                      <div className="input">
                          <input type="file" name="file4" onChange={(e) =>
                              setData("drl_2", e.target.files[0])
                          } />
                      </div>
                  </div>
                  <div className="flex center">
                      <input type="checkbox" name="agree" id="agreeTerm" onChange={handleChange} />
                      <label htmlFor="agreeTerm">
                          <div></div>
                      </label>
                      <label htmlFor="agreeTerm">
                          {__('client.signup_agree',localizations)}{" "}
                          <Link style={{ textDecoration: "underline" }} href="/">
                              {__('client.signup_terms',localizations)}
                          </Link>{" "}
                      </label>
                  </div>
                  {/* remove attribute "disabled" if inputs are filled */}
                  <button onClick={handleSubmit} className="main-btn">
                      {__('client.create_account',localizations)}
                  </button>
                  <div>
                      {__('client.signup_have_account',localizations)}{" "}
                      <Link style={{ color: "#FF715A" }} href={route('client.login.index')}>
                          {__('client.login',localizations)}
                      </Link>{" "}
                  </div>
              </div>
          </div>
      </Layout>

  );
};

export default Signup;
