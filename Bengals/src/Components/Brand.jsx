import React from "react";
import bengalLogo from "../assets/Bengal.svg";
import { Navbar } from "react-bootstrap";

function Brand({title, className}) {
  return (
    <Navbar data-bs-theme="dark" className="brand">
      <Navbar.Brand href="/" className="text_FAIRWIN">
        <img alt="" src={bengalLogo} className="svgIcon" />
        &nbsp; FAIRWIN
      </Navbar.Brand>
      <span className={className}>
            {title}
          </span>
    </Navbar>
  );
}

export default Brand;
