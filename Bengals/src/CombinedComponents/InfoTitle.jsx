import React from "react";
import { Button } from "react-bootstrap";
import leftArrowIcon from "../assets/leftArrowIcon.svg";
import rightArrowIcon from "../assets/rightArrowIcon.svg";

const InfoTitle = ({ title, activePage, onPageChange }) => (
  <div className="info_title">
    <Button onClick={() => onPageChange(!activePage)} variant="link">
      <img alt="" src={leftArrowIcon} width="30" height="30" />
    </Button>
    {title}
    <Button onClick={() => onPageChange(!activePage)} variant="link">
      <img alt="" src={rightArrowIcon} width="30" height="30" />
    </Button>
  </div>
);

export default InfoTitle;
