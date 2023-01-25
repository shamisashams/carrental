import React, {useState} from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from "@inertiajs/inertia-react";
import "./Account.css";
import Layout from "@/Layouts/Layout";

import { Inertia } from "@inertiajs/inertia";

const Signup = ({seo}) => {

    const { errors, localizations } = usePage().props;
    const [values, setValues] = useState({
        name: "",
        Surname: "",
        id: "",
        email: "",
        password: "",
        password_repeat: "",
        phone: "",
        agree: false,
    });

    function handleChange(e) {
        const key = e.target.name;
        let value = e.target.value;
        if (e.target.name === "agree") {
            value = e.target.checked ? true : false;
        }
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("client.register"), values);
    }

  return (
      <Layout seo={seo}>
          <div className="accountPage wrapper">
              <div className="container">
                  <h2>Create account</h2>
                  <div>Fill all the sections below</div>
                  <div className="grid">
                      <input type="text" placeholder="Name" name="name" onChange={handleChange} />
                      <input type="text" placeholder="Surname" name="surname" onChange={handleChange} />
                      <input type="text" placeholder="Email address" name="email" onChange={handleChange} />
                      <input type="text" placeholder="Phone number" name="phone" onChange={handleChange} />
                      <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                      <input type="password" placeholder="Repeate password" name="password_repeat" onChange={handleChange} />
                  </div>
                  <div>Upload documents</div>
                  <div className="grid">
                      <div className="input">
                          <input type="file" name="file1" id="" />
                      </div>
                      <div className="input">
                          <input type="file" name="file2" id="" />
                      </div>
                      <div className="input">
                          <input type="file" name="file3" id="" />
                      </div>
                      <div className="input">
                          <input type="file" name="file4" id="" />
                      </div>
                  </div>
                  <div className="flex center">
                      <input type="checkbox" name="agree" id="agreeTerm" onChange={handleChange} />
                      <label htmlFor="agreeTerm">
                          <div></div>
                      </label>
                      <label htmlFor="agreeTerm">
                          I agree with{" "}
                          <Link style={{ textDecoration: "underline" }} href="/">
                              Terms of Use
                          </Link>{" "}
                      </label>
                  </div>
                  {/* remove attribute "disabled" if inputs are filled */}
                  <button onClick={handleSubmit} className="main-btn">
                      Create account
                  </button>
                  <div>
                      Already have an account?{" "}
                      <Link style={{ color: "#FF715A" }} href={route('client.login.index')}>
                          Log in
                      </Link>{" "}
                  </div>
              </div>
          </div>
      </Layout>

  );
};

export default Signup;
