import React from "react";
import BengalLogo from "../../assets/bengal-icon.svg";
import { Navbar } from "react-bootstrap";

const Brand = ({ title, className }) => {
  return (
    <Navbar data-bs-theme="dark" className="brand">
      <Navbar.Brand href="/" className="text_FAIRWIN">
        <img alt="" src={BengalLogo} className="svgIcon" />
        &nbsp; FAIRWIN
      </Navbar.Brand>
      <span className={className}>{title}</span>
    </Navbar>
  );
};

export default Brand;
