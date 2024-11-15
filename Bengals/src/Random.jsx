import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import { Row, Col } from "react-bootstrap";
import DistrictMap from "./Components/DistrictMap";
import Brand from "./Components/Brand";
import NavBar from "./Components/NavBar";
import RandomPlanContents from "./CombinedComponents/RandomPlanContents";
import DistrictMapTitle from "./CombinedComponents/DistrictMapTitle";

function Random() {
  const abbreviation = { ms: "MISSISSIPPI", al: "ALABAMA", pa: "PENNSYLVANIA" };
  const { id: selectedStateAbbr } = useParams();
  const selectedState = abbreviation[selectedStateAbbr];
  const [showSideBar, setShowSideBar] = useState(false);
  const [geoFeature, setGeoFeature] = useState([]);
  const location = useLocation().pathname;
  const SMDMMD = location.split("/")[3];
  const [showContent, setShowContent] = useState("Highest Republican Split");
  const [mapKey, setMapKey] = useState(0);
  const randomPlans = [
    "Highest Republican Split",
    "Highest Democratic Split",
    "Highest Opportunity District",
    "Lowest Opportunity District",
    "Highest Bias",
  ];
  const apis = {
    "Highest Republican Split": "rep",
    "Highest Democratic Split": "dem",
    "Highest Opportunity District": "op_max",
    "Lowest Opportunity District": "op_min",
    "Highest Bias": "bias",
  };
  const [planInfo, setPlanInfo] = useState({
    numDistricts: 0,
    op_districts: 0,
    safe_districts: 0,
    op_threshold: 0,
    Republicans: 0,
    Democrats: 0,
  });
  const seatVoteCurveData = {};
  const bias = 0;
  const symmetry = 0;
  const responsiveness = {
    republican: 0,
    democratic: 0,
  };
  const [data, setData] = useState({});

  useEffect(() => {
    setData({});
    const getData = async () => {
      const api = `/${selectedStateAbbr.toUpperCase()}/randomPlan/${
        apis[showContent]
      }/${SMDMMD}`;
      try {
        const response = await axios.get(`http://localhost:8080${api}`);
        setData(response.data.summary);
        setGeoFeature(response.data.features);
        console.log("Connected!");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [selectedStateAbbr, SMDMMD, showContent]);

  return (
    <>
      <div className="body">
        <Sidebar show={showSideBar} handleClose={() => setShowSideBar(false)} />
        <Brand
          title={selectedState}
          className={"text_selectedState_Analysis"}
        />
        <div className="body_analysis">
          <NavBar setShowContent={setShowContent} simpleItem={randomPlans} />
          <Row className="contents_Random">
            <Col xs={12} md={6} className="col_stateInformation">
              <DistrictMapTitle
                title={"Sample " + SMDMMD.toUpperCase() + " Plan"}
                address={`/${selectedState}`}
              />
              <Row className="item_plot_Random">
                <DistrictMap
                  mapKey={mapKey}
                  data={geoFeature}
                  selectedState={selectedState}
                />
              </Row>
            </Col>
            <Col className="col_districtInformation_Random">
              {randomPlans
                .filter((item) => showContent === item)
                .map((item) => (
                  <Row key={item} className="item_contents_Random">
                    <RandomPlanContents title={item} data={data} />
                  </Row>
                ))}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Random;
