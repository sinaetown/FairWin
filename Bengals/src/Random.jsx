import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import StateInfoTable from "./Components/StateInfoTable";
import { Nav, Row, Col, Carousel } from "react-bootstrap";
import DistrictMap from "./Components/DistrictMap";
import MinorityBarChart from "./Components/MinorityBarChart";
import PoliticalBarChart from "./Components/PoliticalBarChart";
import Brand from "./Components/Brand";

function Random() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [geoFeature, setGeoFeature] = useState([]);
  const location = useLocation();
  const { selectedState, option } = location.state || {};
  const [showGraph, setShowGraph] = useState("Racial Population");
  const [mapKey, setMapKey] = useState(0);
  const [data_barchart_minority, setData_barchart_minority] = useState([]);
  const [data_barchart_party, setData_barchart_party] = useState([]);
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const [stateInfo, setStateInfo] = useState({
    population: 0,
    votePopulation: 0,
    totalSeats: 0,
    Democrat: 0,
    Republican: 0,
    Minorities: {},
  });

  useEffect(() => {
    const api = {
      Mississippi: {
        stateInfo: "/MS/info",
        randomPlanSMD: "/MS/all/districts/smd",
        randomPlanMMD: "/MS/all/districts/mmd",
      },
      Alabama: {
        stateInfo: "/AL/info",
        randomPlanSMD: "/AL/all/districts/smd",
        randomPlanMMD: "/MS/all/districts/mmd",
      },
      Pennsylvania: {
        stateInfo: "/PA/info",
        randomPlanSMD: "/PA/all/districts/smd",
        randomPlanMMD: "/MS/all/districts/mmd",
      },
    };
    const initValue = () => {
      setStateInfo({
        population: 0,
        votePopulation: 0,
        totalSeats: 0,
        Democrat: 0,
        Republican: 0,
        Minorities: {},
      });
      setData_barchart_minority([]);
      setData_barchart_party([]);
    };
    const setBarchartData = (features) => {
      let barchart_minority = [];
      let barchart_party = [];
      for (var i = 0; i < features.length; i++) {
        let properties = features[i]["properties"];
        barchart_minority.push({
          name: i + 1,
          White: properties["total_wht"],
          Asian: properties["total_asn"],
          Black: properties["total_blk"],
          Hispanic: properties["total_hsp"],
        });
        barchart_party.push({
          name: i + 1,
          Democrats: properties["vote_dem"],
          Republicans: properties["vote_rep"],
        });
      }
      setData_barchart_minority(barchart_minority);
      setData_barchart_party(barchart_party);
    };
    const fetchData = async () => {
      let api_stateInfo = api[selectedState].stateInfo;
      let api_randomPlan = "";
      if (option.includes("SMD")) {
        api_randomPlan = api[selectedState].randomPlanSMD;
      } else {
        api_randomPlan = api[selectedState].randomPlanMMD;
      }
      console.log(option);
      console.log(api_randomPlan);
      let features = [];
      try {
        initValue();
        const stateInfo = await axios.get(
          `http://localhost:8080${api_stateInfo}`
        );
        const randomPlan = await axios.get(
          `http://localhost:8080${api_randomPlan}`
        );
        console.log(api_randomPlan);
        setStateInfo({
          population: stateInfo.data["total_pop"],
          votePopulation: stateInfo.data["vote_pop"],
          totalSeats: stateInfo.data["total_seats"],
          Democrat: stateInfo.data["Democrats"],
          Republican: stateInfo.data["Republicans"],
          Minorities: stateInfo.data["racial_pop"],
        });
        features = randomPlan.data[index]["features"];
        setGeoFeature(features);
        setBarchartData(features);
        setMapKey(mapKey + 1);
        console.log("Connected!");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedState, index]);

  const coordinate = useMemo(() => {
    if (selectedState === "Alabama") {
      return [32.8067, -86.7911];
    } else if (selectedState === "Mississippi") {
      return [32.3547, -90.0];
    } else {
      return [40.8781, -77.7996];
    }
  }, [selectedState]);

  const onEachDistrict = (district, layer, index) => {
    let centroid = district["properties"]["centroid"].split(",");
    const latLng = L.latLng(parseFloat(centroid[1]), parseFloat(centroid[0]));
    const onMouseOver = (e) => {
      layer.setStyle({
        fillColor: "rgb(40, 38, 38)",
      });
    };
    const onMouseOut = (e) => {
      layer.setStyle({
        fillColor: "rgb(220, 25, 10)",
      });
    };
    layer.bindPopup(district["properties"]["win_pty"]);
    const onAdd = (e) => {
      const label = L.divIcon({
        className: "district-label",
        html: `<div style="font-size: 20px; color: black;">${index + 1}</div>`,
      });
      L.marker(latLng, { icon: label }).addTo(layer._map);
    };
    layer.setStyle({
      color: "rgba(241, 243, 243, 1)",
      fillColor: "rgb(220, 25, 10)",
    });
    layer.on({
      mouseout: onMouseOut,
      mouseover: onMouseOver,
      add: onAdd,
    });
  };

  return (
    <>
      <div className="body">
        <Sidebar show={showSideBar} handleClose={() => setShowSideBar(false)} />
        <Brand
          title={selectedState.toUpperCase()}
          className={"text_selectedState_Analysis"}
        />
        <div className="body_analysis">
          <Carousel
            variant="light"
            activeIndex={index}
            onSelect={handleSelect}
            interval={null}
          >
            {[0, 1, 2, 3, 4].map((item, index) => (
              <Carousel.Item key={index}>
                <Row className="contents_Random">
                  <Col xs={12} md={6} className="col_stateInformation">
                    <Row className="item_contents_Random">
                      <div className="text_contentsTitle_Analysis">
                        {option}
                      </div>
                    </Row>
                    <Row className="item_contents_Random">
                      <StateInfoTable
                        stateInfo={stateInfo}
                        className={"table_contents_Random"}
                      />
                    </Row>
                    <Row className="item_plot_Random">
                      <div className="districtMap">
                        <DistrictMap
                          mapKey={mapKey}
                          coordinate={coordinate}
                          data={geoFeature}
                          onEachDistrict={onEachDistrict}
                        />
                      </div>
                    </Row>
                  </Col>
                  <Col className="col_districtInformation_Random">
                    <Row className="item_contents_Random">
                      <Nav
                        variant="tabs"
                        defaultActiveKey="link-1"
                        className="navbar_Random"
                      >
                        <Nav.Item>
                          <Nav.Link
                            eventKey="link-1"
                            className="text_navElement_analysis"
                            onClick={() => setShowGraph("Racial Population")}
                          >
                            Racial Population
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="link-3"
                            className="text_navElement_analysis"
                            onClick={() => setShowGraph("Political Party")}
                          >
                            Political Party
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Row>
                    {showGraph === "Racial Population" && (
                      <Row>
                        <div
                          className="item_plot_Random"
                          style={{ width: "100%", height: 330 }}
                        >
                          <MinorityBarChart data={data_barchart_minority} />
                        </div>
                      </Row>
                    )}
                    {showGraph === "Political Party" && (
                      <Row>
                        <div
                          className="item_plot_Random"
                          style={{ width: "100%", height: 330 }}
                        >
                          <PoliticalBarChart data={data_barchart_party} />
                        </div>
                      </Row>
                    )}
                  </Col>
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default Random;
