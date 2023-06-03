import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import "../styles.css";
import Menu from "../core/Menu";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;
  const handleChange = (name) => (event) => {
    //highorder function
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <div className="main">
        <div class="register">
          <h2> Signup  Here</h2>
          <form id="register" method="post">
            
            <div className="form-group">
              <label className="text">Name</label>
              <br/>
              <input
                className="fname"
                onChange={handleChange("name")}
                type="text"
                value={name}
                placeholder="Enter your name"
                id="name"
              />
              <br/>
              <br/>
            </div>
            <div className="form-group">
              <label className="text">Email</label>
              <br/>
              <input
                className="email"
                onChange={handleChange("email")}
                type="email"
                value={email}
                id="name"
                placeholder="Enter your email"
              />
              <br/>
              <br/>
            </div>
            <div className="form-group">
              <label className="text">Password</label>
              <br/>
              <input
                className="password"
                onChange={handleChange("password")}
                type="password"
                value={password}
                placeholder="Enter your password"
                id="name"
              />
            </div>
            <br></br>
            <br/>
            <button onClick={onSubmit} className="submit" type="submit" id="submit" value="Submit" >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div class="col-md-6.offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. please{" "}
            <Link to="/signin"> Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div class="col-md-6.offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Menu />

      <div className="container">
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
      </div>

      {/* <p className="text-white text-center"> {JSON.stringify(values)} </p> */}
      <Base />
    </div>
  );
};

export default Signup;
