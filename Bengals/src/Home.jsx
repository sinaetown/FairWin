import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, Dropdown } from "react-bootstrap";
import CircleIcon from "./assets/circle-icon.svg";
import SideBar from "./Components/UI/SideBar";
import USMap from "./Components/Visualization/USMap";
import Brand from "./Components/UI/Brand";

const Home = () => {
  const [selectedState, setSelectedState] = useState("SELECT A STATE");
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const customStates = ["MISSISSIPPI", "ALABAMA", "PENNSYLVANIA"];
  const abbreviation = { MISSISSIPPI: "ms", ALABAMA: "al", PENNSYLVANIA: "pa" };
  const navigate = useNavigate();
  const toSateInfo = (state) => {
    navigate(`/${state}`);
  };
  return (
    <>
      <div className="body">
        <SideBar show={showSideBar} handleClose={() => setShowSideBar(false)} />
        <div className="body_home">
          <Brand />
          <Container>
            <div className="text_question">IS A FAIR VOTE BEING HELD?</div>
            <div className="text_selectedState">
              {hoveredLocation ? hoveredLocation : selectedState}
            </div>
            <Row>
              <Col xs={1}>
                <div className="dataExplaination">
                  <span className="text_Available_State">
                    {" "}
                    <img
                      alt=""
                      src={CircleIcon}
                      width="10px"
                      height="10px"
                      className="svgIcon"
                    />
                    &nbsp;Available State
                  </span>
                </div>
              </Col>
              <Col xs={9}>
                <Container className="map_us">
                  <USMap
                    hoveredLocation={hoveredLocation}
                    selectedState={selectedState}
                    setHoveredLocation={setHoveredLocation}
                    setSelectedState={setSelectedState}
                    toSateInfo={toSateInfo}
                  />
                </Container>
              </Col>
              <Col xs={2}>
                <Dropdown className="button_toAnalysis">
                  <Dropdown.Toggle variant="dark">
                    Select a State
                  </Dropdown.Toggle>
                  <Dropdown.Menu show>
                    {customStates.map((state) => (
                      <Dropdown.Item
                        key={state}
                        onClick={() => {
                          setSelectedState(state);
                          toSateInfo(abbreviation[state]);
                        }}
                      >
                        {state}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Home;
