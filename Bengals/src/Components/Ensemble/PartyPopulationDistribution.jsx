import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import BoxWhisker from "../Visualization/BoxNdWhisker/BoxWhisker";
import NavBar from "../UI/NavBar";

const PartyPopulationDistribution = ({
  title,
  showGraph,
  setShowGraph,
  navbarItem,
  selectedStateAbbr,
  smdmmd,
}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData({});
    const getData = async () => {
      const api = `/${selectedStateAbbr.toUpperCase()}/party-population-distribution/${smdmmd}`;
      try {
        const data = await axios.get(`http://localhost:8080${api}`);
        setData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [selectedStateAbbr, smdmmd, showGraph]);

  return (
    <Row className="info-contents-row">
      <div className="info-title">{title}</div>
      <Row>
        <NavBar setShowContent={setShowGraph} simpleItem={navbarItem} />
      </Row>
      <Row className="info-contents-inner-row">
        <Col
          className="info-visualization-container"
          style={{ width: "100%", height: 330 }}
        >
          <BoxWhisker data={data[showGraph] || []} option={smdmmd} />
        </Col>
      </Row>
    </Row>
  );
};

export default PartyPopulationDistribution;
