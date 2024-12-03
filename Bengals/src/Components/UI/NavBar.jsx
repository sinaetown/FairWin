import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavBar = ({ setShowContent, simpleItem, dropDown, navigateItem }) => {
  let key = 0;
  const navigate = useNavigate();
  const itemName = {
    "African American": "black",
    Asian: "asian",
    Hispanic: "hispanic",
    Republican: "republican",
    Democratic: "democratic",
    "Highest Republican Split": "Highest Republican Split",
    "Highest Democratic Split": "Highest Democratic Split",
    "Highest Opportunity District": "Highest Opportunity District",
    "Highest Non-White Probability": "Highest Non-White Probability",
    "Highest White Probability": "Highest White Probability",
    "Ensemble Summary": "Ensemble Summary",
    "Distribution of Racial Population": "Distribution of Racial Population",
    "Opportunity Districts & Representatives":
      "Opportunity Districts & Representatives",
    "Distribution of Party Population": "Distribution of Party Population",
    "Party Splits": "Party Splits",
    "Enacted Plan vs Average MMD Plans": "Enacted Plan vs Average MMD Plans",
  };
  return (
    <Nav variant="tabs" defaultActiveKey="link-1" className="navbar_Random">
      {navigateItem &&
        navigateItem.map((item) => {
          key++;
          return (
            <Nav.Item key={`address-${key}`}>
              <Nav.Link
                eventKey={`link-${key}`}
                className="text_navElement_analysis"
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
                className="text_navElement_analysis"
                onClick={() => setShowContent(itemName[item])}
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
                  onClick={() => setShowContent(itemName[item])}
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
