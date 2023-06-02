import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Base = () => (
  <div>
    <footer className="footer bg-secondary mt-auto py-3">
      <div className="container-fluid text-white text-center">
        <p className="text-muted">
          &copy; {new Date().getFullYear()} Blog Website
        </p>
      </div>
    </footer>
  </div>
);

export default Base;
