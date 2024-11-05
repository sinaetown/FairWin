import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import StateInfoTable from "./Components/StateInfoTable";
import testJson from "./assets/blank_ensemble.json";
import Sidebar from "./Components/Sidebar";
import Brand from "./Components/Brand";
import BoxWhisker from "./Components/BoxWhisker";
import { Nav, Row, Col } from "react-bootstrap";
import SeatVoteCurve from "./Components/SeatVoteCurve";
import PoliticalBarChart from "./Components/PoliticalBarChart";
import OpportunityBar from "./Components/OpportunityBar";
import TabDropDown from "./Components/TabDropDown";

const useBoxPlot = (boxPlots) => {
  const data = useMemo(
    () =>
      boxPlots.map((v) => {
        return {
          name: v.name,
          min: v.min,
          bottomWhisker: v.lowerQuartile - v.min,
          bottomBox: v.median - v.lowerQuartile,
          topBox: v.upperQuartile - v.median,
          topWhisker: v.max - v.upperQuartile,
          average: v.average,
          size: 250,
        };
      }),
    [boxPlots]
  );
  return data;
};
function Ensemble() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [geoFeature, setGeoFeature] = useState([]);
  const [mapKey, setMapKey] = useState(0);
  const location = useLocation();
  const { selectedState, option } = location.state || {};
  const [showGraph, setShowGraph] = useState("Box & Whisker");
  const [showMinority, setShowMinority] = useState("blk");
  const [boxWhisker_data, setBoxWhisker] = useState({
    SMD: [],
    MMD: [],
  });
  const [minority_curve, setMinority_curve] = useState({ SMD: {}, MMD: {} });
  const [partySplits, setPartySplits] = useState({ SMD: {}, MMD: {} });
  const [opDistrict, setOpDistrict] = useState({ SMD: {}, MMD: {} });
  const [opRepresentatives, setOpRepresentatives] = useState({
    SMD: {},
    MMD: {},
  });
  const [stateInfo, setStateInfo] = useState({
    population: 0,
    votePopulation: 0,
    totalSeats: 0,
    Democrat: 0.0,
    Republican: 0.0,
    Minorities: { blk: 0.0, hisp: 0.0, asn: 0.0, non_white: 0.0 },
  });

  useEffect(() => {
    const api = {
      Mississippi: { stateInfo: "/MS/info", ensemble: "/MS/ensemble" },
      Alabama: { stateInfo: "/AL/info", ensemble: "/AL/ensemble" },
      Pennsylvania: { stateInfo: "/PA/info", ensemble: "/PA/ensemble" },
    };
    const initValue = () => {
      setStateInfo({
        population: 0,
        votePopulation: 0,
        totalSeats: 0,
        Democrat: 0.0,
        Republican: 0.0,
        Minorities: { blk: 0.0, hisp: 0.0, asn: 0.0, non_white: 0.0 },
      });
      setBoxWhisker({ SMD: [], MMD: [] });
      setMinority_curve({ SMD: {}, MMD: {} });
      setPartySplits({ SMD: {}, MMD: {} });
      setOpDistrict({ SMD: {}, MMD: {} });
      setOpRepresentatives({ SMD: {}, MMD: {} });
    };
    const setValue = (stateInfo, ensemble) => {
      let features = ensemble.data;
      setStateInfo({
        population: stateInfo.data["total_pop"],
        votePopulation: stateInfo.data["vote_pop"],
        totalSeats: stateInfo.data["total_seats"],
        Democrat: stateInfo.data["Democrats"],
        Republican: stateInfo.data["Republicans"],
        Minorities: stateInfo.data["racial_pop"],
      });
      setGeoFeature(features);
      setMapKey(mapKey + 1);
      setBoxWhisker({
        SMD: features["box_whisker"]["box_SMD"],
        MMD: features["box_whisker"]["box_MMD"],
      });
      setMinority_curve({
        SMD: features["vote_seats"]["SMD"],
        MMD: features["vote_seats"]["MMD"],
      });
      setPartySplits({
        SMD: features["party_splits_bar"]["SMD"],
        MMD: features["party_splits_bar"]["MMD"],
      });
      setOpDistrict({
        SMD: features["op_district_bar"]["SMD"],
        MMD: features["op_district_bar"]["MMD"],
      });
      setOpRepresentatives({
        SMD: features["op_representatives_bar"]["SMD"],
        MMD: features["op_representatives_bar"]["MMD"],
      });
    };
    const fetchData = async () => {
      let api_stateInfo = api[selectedState].stateInfo;
      let api_ensemble = api[selectedState].ensemble;
      try {
        initValue();
        const stateInfo = await axios.get(
          `http://localhost:8080${api_stateInfo}`
        );
        const ensemble = await axios.get(
          `http://localhost:8080${api_ensemble}`
        );
        setValue(stateInfo, ensemble);
        console.log("Connected!");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedState]);
  const boxWhiskerSMD = useBoxPlot(boxWhisker_data.SMD);
  const boxWhiskerMMD = useBoxPlot(boxWhisker_data.MMD);

  return (
    <>
      <div className="body">
        <Sidebar show={showSideBar} handleClose={() => setShowSideBar(false)} />
        <Brand title={option} className={"text_contentsTitle_Ensemble"} />
        <div className="body_analysis">
          <Row className="contents_Ensemble">
            <Col xs={12} md={6} className="col_stateInformation">
              <Row className="item_contents_Ensemble">
                <StateInfoTable
                  stateInfo={stateInfo}
                  className={"table_contents_Ensemble"}
                  key={stateInfo}
                />
              </Row>
            </Col>
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
                    onClick={() => setShowGraph("Box & Whisker")}
                  >
                    Box & Whisker
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-2"
                    className="text_navElement_analysis"
                    onClick={() => setShowGraph("SeatVoteCurve")}
                  >
                    SeatVoteCurve
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-3"
                    className="text_navElement_analysis"
                    onClick={() => setShowGraph("Party Splits")}
                  >
                    Party Splits
                  </Nav.Link>
                </Nav.Item>
                <TabDropDown
                  title="Opportunity District"
                  startingEventKey="4"
                  onSelect={(value) => {
                    setShowGraph("Opportunity District");
                    setShowMinority(value);
                  }}
                />

                <TabDropDown
                  title="Opportunity Representatives"
                  startingEventKey="8"
                  onSelect={(value) => {
                    setShowGraph("Opportunity Representatives");
                    setShowMinority(value);
                  }}
                />
              </Nav>
            </Row>
            <div className="text_SMDvsMMD">SMD VS MMD</div>
            {showGraph == "Box & Whisker" && (
              <Row className="item_contents_Ensemble">
                <Col
                  className="item_plot_Ensemble"
                  style={{ width: "100%", height: 330 }}
                >
                  <BoxWhisker data={boxWhiskerSMD} />
                </Col>
                <Col
                  className="item_plot_Ensemble"
                  style={{ width: "100%", height: 330 }}
                >
                  <BoxWhisker data={boxWhiskerMMD} />
                </Col>
              </Row>
            )}
            {showGraph == "SeatVoteCurve" && (
              <Row className="item_contents_Ensemble">
                <Col
                  className="item_plot_Ensemble"
                  style={{ width: "100%", height: 330 }}
                >
                  <SeatVoteCurve data={minority_curve.SMD} />
                </Col>
                <Col
                  className="item_plot_Ensemble"
                  style={{ width: "100%", height: 330 }}
                >
                  <SeatVoteCurve data={minority_curve.MMD} />
                </Col>
              </Row>
            )}
            {showGraph === "Party Splits" && (
              <Row className="item_contents_Ensemble">
                <Col
                  className="item_plot_Ensemble"
                  style={{ width: "100%", height: 330 }}
                >
                  <PoliticalBarChart data={partySplits.SMD} />
                </Col>
                <Col
                  className="item_plot_Ensemble"
                  style={{ width: "100%", height: 330 }}
                >
                  <PoliticalBarChart data={partySplits.MMD} />
                </Col>
              </Row>
            )}
            {showGraph === "Opportunity District" && (
              <Row className="item_contents_Ensemble">
                <Col
                  className="item_plot_Ensemble"
                  style={{ width: "100%", height: 330 }}
                >
                  <OpportunityBar
                    keyName="op_districts"
                    data={opDistrict.SMD[showMinority]}
                  />
                </Col>
                <Col
                  className="item_plot_Ensemble"
                  style={{ width: "100%", height: 330 }}
                >
                  <OpportunityBar
                    keyName="op_districts"
                    data={opDistrict.MMD[showMinority]}
                  />
                </Col>
              </Row>
            )}
            {showGraph === "Opportunity Representatives" && (
              <Row className="item_contents_Ensemble">
                <Col
                  className="item_plot_Ensemble"
                  style={{ width: "100%", height: 330 }}
                >
                  <OpportunityBar
                    keyName="op_representatives"
                    data={opRepresentatives.SMD[showMinority]}
                  />
                </Col>
                <Col
                  className="item_plot_Ensemble"
                  style={{ width: "100%", height: 330 }}
                >
                  <OpportunityBar
                    keyName="op_representatives"
                    data={opRepresentatives.MMD[showMinority]}
                  />
                </Col>
              </Row>
            )}
          </Row>
        </div>
      </div>
    </>
  );
}

export default Ensemble;
