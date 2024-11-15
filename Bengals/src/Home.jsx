import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, Dropdown } from "react-bootstrap";

import arrowCircleIcon from "./assets/arrowCircleIcon.svg";
import circleIcon from "./assets/circleIcon.svg";
import Sidebar from "./Components/Sidebar";
import USMap from "./Components/USMap";
import Brand from "./Components/Brand";
import ToAnalysisButtons from "./Components/ToAnalysisButtons";

function Home() {
  const [selectedState, setSelectedState] = useState("SELECT A STATE");
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
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
        <Sidebar show={showSideBar} handleClose={() => setShowSideBar(false)} />
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
                      src={circleIcon}
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
          {/* <ToAnalysisButtons
            show={showButtons}
            handleClose={() => setShowButtons(false)}
            toEnsemble={toEnsemble}
            toRandom={toRandom}
            selectedState={selectedState}
            toCompareCurrent={toCompareCurrent}
          /> */}
        </div>
      </div>
    </>
  );
}

export default Home;
