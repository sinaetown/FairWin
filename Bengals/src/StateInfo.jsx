import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SideBar from "./Components/UI/SideBar";
import { Row, Col } from "react-bootstrap";
import DistrictMap from "./Components/Visualization/DistrictMap";
import Brand from "./Components/UI/Brand";
import NavBar from "./Components/UI/NavBar";
import DistrictMapTitle from "./Components/Pages/DistrictMapTitle";

const StateInfo = () => {
  const abbreviation = { ms: "MISSISSIPPI", al: "ALABAMA", pa: "PENNSYLVANIA" };
  const { id: selectedStateAbbr } = useParams();
  const selectedState = abbreviation[selectedStateAbbr] || "Unknown State";
  const [showSideBar, setShowSideBar] = useState(false);
  const [geoFeature, setGeoFeature] = useState([]);
  const [mapKey, setMapKey] = useState(0);
  const [data, setData] = useState({});
  const apis = [
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
  ];

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
      const api_enactedMap = `/${selectedStateAbbr.toUpperCase()}/enacted-map`;
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

  const infoItems = [
    {
      title: "Total Population",
      values: [
        {
          value: data.totalPopulation?.toLocaleString() || 0,
          suffix: "people",
        },
      ],
    },
    {
      title: "Total Seats",
      values: [{ value: data.totalSeats || 0, suffix: "seats" }],
    },
    {
      title: "2020 Party Splits",
      values: [
        { value: data.republican || 0, suffix: "Republicans" },
        { value: data.democratic || 0, suffix: "Democrats" },
      ],
    },
    {
      title: "Minority Population",
      values: [
        {
          value: data.racialPopulation?.black?.toLocaleString() || 0,
          suffix: "African Americans",
        },
        {
          value: data.racialPopulation?.asian?.toLocaleString() || 0,
          suffix: "Asians",
        },
        {
          value: data.racialPopulation?.hispanic?.toLocaleString() || 0,
          suffix: "Hispanics",
        },
      ],
    },
  ];

  return (
    <>
      <div className="body">
        <SideBar show={showSideBar} handleClose={() => setShowSideBar(false)} />
        <Brand
          title={selectedState}
          className={"text_selectedState_Analysis"}
        />
        <div className="body_analysis">
          <NavBar navigateItem={apis} />
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
                  {infoItems.map((item, index) => (
                    <Col key={index} className="info_item">
                      <div className="info_subTitle">{item.title}</div>
                      {item.values.map((val, idx) => (
                        <div key={idx}>
                          <span className="info_data">{val.value}</span>{" "}
                          {val.suffix}
                        </div>
                      ))}
                    </Col>
                  ))}
                </Row>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default StateInfo;
