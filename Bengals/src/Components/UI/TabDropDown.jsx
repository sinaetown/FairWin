import React from "react";
import { NavDropdown } from "react-bootstrap";

const TabDropDown = ({ title, onSelect, startingEventKey }) => {
  const options = [
    { label: "Black", value: "black" },
    { label: "Asian", value: "asian" },
    { label: "Hispanic", value: "hispanic" },
    { label: "Non-White", value: "nonWhite" },
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
