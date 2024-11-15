import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Nav, Row, Col } from "react-bootstrap";
import CompareCurrentBar from "./Components/CompareCurrentBar";
import Sidebar from "./Components/Sidebar";
import Brand from "./Components/Brand";

function CompareCurrent() {
  const { id: selectedState } = useParams();
  const [showSideBar, setShowSideBar] = useState(false);
  const [republicansBar, setRepublicansBar] = useState([]);
  const [democratsBar, setDemocratsBar] = useState([]);
  const [opDistrictBar, setOPDistrictBar] = useState([]);
  const [opRepresentativesBar, setOPRepresentativesBar] = useState([]);
  const [showGraph, setShowGraph] = useState("Democrats & Republicans Bar");

  useEffect(() => {
    const api = {
      Mississippi: "/MS/compare",
      Alabama: "/AL/compare",
      Pennsylvania: "/PA/compare",
    };
    const initValue = () => {
      setRepublicansBar([]);
      setDemocratsBar([]);
      setOPDistrictBar([]);
      setOPRepresentativesBar([]);
    };
    const setValue = (compareCurrent) => {
      const features = compareCurrent.data;
      setRepublicansBar(features["republicans_bar"]);
      setDemocratsBar(features["democrats_bar"]);
      setOPDistrictBar(features["op_districts_bar"]);
      setOPRepresentativesBar(features["op_representatives_bar"]);
    };
    const fetchData = async () => {
      try {
        initValue();
        const compareCurrent = await axios.get(
          `http://localhost:8080${api[selectedState]}`
        );
        setValue(compareCurrent);
        console.log("Connected!");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedState]);
  return (
    <>
      <div className="body">
        <Sidebar show={showSideBar} handleClose={() => setShowSideBar(false)} />
        <Brand
          title={selectedState.toUpperCase()}
          className={"text_selectedState_Analysis"}
        />
        <div className="body_analysis">
          <Row className="contents_Ensemble">
            <Row className="item_contents_Ensemble">
              <div className="text_contentsTitle_Analysis">
                Current SMD vs. Average MMD
              </div>
            </Row>
            <Row className="item_contents_Ensemble">
              <Nav
                variant="tabs"
                defaultActiveKey="link-1"
                className="navbar_Ensemble"
              >
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    className="text_navElement_analysis"
                    onClick={() => setShowGraph("Democrats & Republicans Bar")}
                  >
                    Democrats & Republicans Bar
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-3"
                    className="text_navElement_analysis"
                    onClick={() => setShowGraph("Opportunity Bar")}
                  >
                    Opportunity Bar
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Row>
            {showGraph == "Democrats & Republicans Bar" && (
              <div>
                <div className="text_SMDvsMMD">Democrats & Republicans</div>
                <Row className="item_contents_Ensemble">
                  <Col
                    className="item_plot_Ensemble"
                    style={{ width: "100%", height: 330 }}
                  >
                    <CompareCurrentBar
                      keyName="Democrats"
                      data={democratsBar}
                    />
                  </Col>
                  <Col
                    className="item_plot_Ensemble"
                    style={{ width: "100%", height: 330 }}
                  >
                    <CompareCurrentBar
                      keyName="Republicans"
                      data={republicansBar}
                    />
                  </Col>
                </Row>
              </div>
            )}
            {showGraph == "Opportunity Bar" && (
              <div>
                <div className="text_SMDvsMMD">
                  Opportunity District & Representatives
                </div>
                <Row className="item_contents_Ensemble">
                  <Col
                    className="item_plot_Ensemble"
                    style={{ width: "100%", height: 330 }}
                  >
                    <CompareCurrentBar
                      keyName="op_districts"
                      data={opDistrictBar}
                    />
                  </Col>
                  <Col
                    className="item_plot_Ensemble"
                    style={{ width: "100%", height: 330 }}
                  >
                    <CompareCurrentBar
                      keyName="op_representatives"
                      data={opRepresentativesBar}
                    />
                  </Col>
                </Row>
              </div>
            )}
          </Row>
        </div>
      </div>
    </>
  );
}

export default CompareCurrent;
