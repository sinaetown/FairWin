import React from "react";
import BackIcon from "../../assets/back-icon.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const BackButton = ({ address }) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="link"
      onClick={() => navigate(address)}
      style={{ margin: "15%" }}
    >
      <img alt="" src={BackIcon} className="svgIcon" height={40} width={40} />
    </Button>
  );
};

export default BackButton;
