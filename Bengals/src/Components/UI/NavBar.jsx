import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavBar = ({ setShowContent, simpleItem, dropDown, navigateItem }) => {
  let key = 0;
  const navigate = useNavigate();
  const itemName = (item) => {
    if (item === "African American") return "black";
    const lowerCaseItems = ["Asian", "Hispanic", "Republican", "Democratic"];
    return lowerCaseItems.includes(item) ? item.toLowerCase() : item;
  };

  return (
    <Nav variant="tabs" defaultActiveKey="link-1" className="navbar">
      {navigateItem &&
        navigateItem.map((item) => {
          key++;
          return (
            <Nav.Item key={`address-${key}`}>
              <Nav.Link
                eventKey={`link-${key}`}
                className="text-navbar-item"
                onClick={() => navigate(item.address)}
              >
                {item.name}
              </Nav.Link>
            </Nav.Item>
          );
        })}

      {simpleItem &&
        simpleItem.map((item) => {
          key++;
          return (
            <Nav.Item key={`simple-${key}`}>
              <Nav.Link
                eventKey={`link-${key}`}
                className="text-navbar-item"
                onClick={() => setShowContent(itemName(item))}
              >
                {item}
              </Nav.Link>
            </Nav.Item>
          );
        })}

      {dropDown &&
        dropDown.map((dropdown, index) => (
          <NavDropdown title={dropdown.title} key={`dropdown-${index}`}>
            {dropdown.items.map((item) => {
              key++;
              return (
                <NavDropdown.Item
                  key={`dropdown-item-${key}`}
                  eventKey={`link-${key}`}
                  onClick={() => setShowContent(itemName(item))}
                >
                  {item}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        ))}
    </Nav>
  );
};

export default NavBar;
