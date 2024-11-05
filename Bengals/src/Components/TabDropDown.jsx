import React from "react";
import { NavDropdown } from "react-bootstrap";

const TabDropDown = ({ title, onSelect, startingEventKey }) => {
  const options = [
    { label: "Black", value: "blk" },
    { label: "Asian", value: "asn" },
    { label: "Hispanic", value: "hsp" },
    { label: "Non-White", value: "non_wht" },
  ];
  return (
    <NavDropdown title={title}>
      {options.map((option, index) => (
        <NavDropdown.Item
          key={index}
          eventKey={`link-${index + startingEventKey}`}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

export default TabDropDown;
