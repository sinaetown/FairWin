import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import { Row, Col } from "react-bootstrap";
import DistrictMap from "./Components/DistrictMap";
import Brand from "./Components/Brand";
import NavBar from "./Components/NavBar";
import DistrictMapTitle from "./CombinedComponents/DistrictMapTitle";

function StateInfo() {
  const abbreviation = { ms: "MISSISSIPPI", al: "ALABAMA", pa: "PENNSYLVANIA" };
  const { id: selectedStateAbbr } = useParams();
  const selectedState = abbreviation[selectedStateAbbr] || "Unknown State";
  const [showSideBar, setShowSideBar] = useState(false);
  const [geoFeature, setGeoFeature] = useState([]);
  const [mapKey, setMapKey] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    const initValue = () => {
      setGeoFeature([]);
      setData({});
    };

    const getData = async () => {
      const api_data = `/${selectedStateAbbr.toUpperCase()}/info`;
      try {
        const response = await axios.get(`http://localhost:8080${api_data}`);
        setData(response.data || {});
      } catch (error) {
        console.error("Error fetching state info data:", error);
      }
    };
    const getEnactedMap = async () => {
      const api_enactedMap = `/${selectedStateAbbr.toUpperCase()}/enactedMap`;
      try {
        const response = await axios.get(
          `http://localhost:8080${api_enactedMap}`
        );
        setGeoFeature(response.data.features || []);
        setMapKey((prevKey) => prevKey + 1);
      } catch (error) {
        console.error("Error fetching enacted map data:", error);
      }
    };
    initValue();
    getData();
    getEnactedMap();
  }, [selectedStateAbbr]);

  return (
    <>
      <div className="body">
        <Sidebar show={showSideBar} handleClose={() => setShowSideBar(false)} />
        <Brand
          title={selectedState}
          className={"text_selectedState_Analysis"}
        />
        <div className="body_analysis">
          <NavBar
            navigateItem={[
              {
                name: "StateInfo",
                address: `/${selectedStateAbbr}`,
              },
              {
                name: "EnsembleSMD",
                address: `/${selectedStateAbbr}/ensemble/smd`,
              },
              {
                name: "EnsembleMMD",
                address: `/${selectedStateAbbr}/ensemble/mmd`,
              },
              {
                name: "RandomPlanSMD",
                address: `/${selectedStateAbbr}/random/smd`,
              },
              {
                name: "RandomPlanMMD",
                address: `/${selectedStateAbbr}/random/mmd`,
              },
            ]}
          />
          <Row className="contents_Random">
            <Col xs={12} md={6} className="col_stateInformation">
              <DistrictMapTitle title={"Enacted Plan"} address={`/`} />
              <Row className="item_plot_Random">
                <DistrictMap
                  mapKey={mapKey}
                  data={geoFeature}
                  selectedState={selectedState}
                />
              </Row>
            </Col>
            <Col className="col_districtInformation_Random">
              <Row className="item_contents_Random">
                <div className="info_title">State Information</div>
                <Row className="info_grid">
                  <Row className="info_grid">
                    <Col className="info_item">
                      <div className="info_subTitle">Total Population</div>
                      <div>
                        <span className="info_data">
                          {data.total_pop ? data.total_pop.toLocaleString() : 0}
                        </span>{" "}
                        people
                      </div>
                    </Col>
                    <Col className="info_item">
                      <div className="info_subTitle">Total Seats</div>
                      <div>
                        <span className="info_data">
                          {data.total_seats || 0}
                        </span>{" "}
                        seats
                      </div>
                    </Col>
                  </Row>
                  <Row className="info_grid">
                    <Col className="info_item">
                      <div className="info_subTitle">2020 Party Splits</div>
                      <div>
                        <span className="info_data">
                          {data.republican || 0}
                        </span>{" "}
                        Republicans
                        <br />
                        <span className="info_data">
                          {data.democratic || 0}
                        </span>{" "}
                        Democrats
                      </div>
                    </Col>
                    <Col className="info_item">
                      <div className="info_subTitle">Minority Population</div>
                      <div>
                        <span className="info_data">
                          {data.racial_pop?.blk.toLocaleString() || 0}
                        </span>{" "}
                        African Americans
                        <br />
                        <span className="info_data">
                          {data.racial_pop?.asn.toLocaleString() || 0}
                        </span>{" "}
                        Asians
                        <br />
                        <span className="info_data">
                          {data.racial_pop?.hsp.toLocaleString() || 0}
                        </span>{" "}
                        Hispanics
                      </div>
                    </Col>
                  </Row>
                </Row>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default StateInfo;
