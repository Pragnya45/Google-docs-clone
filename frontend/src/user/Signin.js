import React, { useState } from "react";
import Base from "../core/Base";
import { useNavigate } from "react-router";
import "../styles.css";
import Menu from "../core/Menu";

import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            didRedirect: true,
          });
        });
      }
    });
  };

  const performRedirect = () => {
    if (didRedirect) {
      navigate("/");
    }
    if (isAuthenticated()) {
      navigate("/");
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="main">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="main">
        <div class="register">
        <h2> Signin  Here</h2>
        <form id="register" method="post">
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
            
            <button className="submit" onClick={onSubmit} type="submit" id="submit" value="Submit">
             Submit
            </button>

            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Menu />
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <Base />
    </div>
  );
};

export default Signin;
