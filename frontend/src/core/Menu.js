import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
import "../styles.css";

const currentTab = (history, path) => {
  if (history && history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => {
  const navigate = useNavigate();

  return (
    <div>
      <ul className="nav nav-tabs bg-off-white">
        <li className="nav-item">
          <Link
            style={currentTab(history, "/")}
            className="nav-link text-secondary"
            to="/"
          >
            Home
          </Link>
        </li>

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link text-secondary"
                to="/signup"
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signin")}
                className="nav-link text-secondary"
                to="/signin"
              >
                SignIn
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li
            style={{ position: "fixed", right: "10px" }}
            className="nav-item ml-auto"
          >
            <Link
              className="nav-link text-danger"
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
            >
              Signout
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
