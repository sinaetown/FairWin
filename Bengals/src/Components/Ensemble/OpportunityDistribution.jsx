import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import NavBar from "../UI/NavBar";
import SimpleBarChart from "../Visualization/SimpleBarChart";

const OpportunityDistribution = ({
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
      const api = `/${selectedStateAbbr.toUpperCase()}/opportunity-distribution/${smdmmd}`;
      try {
        const response = await axios.get(`http://localhost:8080${api}`);
        setData(response.data);
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
          <SimpleBarChart
            title="Opportunity Districts"
            data={data.opportunityDistrictsBar?.[showGraph] || []}
            keyName="numberOfPlans"
          />
        </Col>
        <Col
          className="info-visualization-container"
          style={{ width: "100%", height: 330 }}
        >
          <SimpleBarChart
            title="Opportunity Representatives"
            data={data.opportunityRepresentativesBar?.[showGraph] || []}
            keyName="numberOfPlans"
          />
        </Col>
      </Row>
    </Row>
  );
};

export default OpportunityDistribution;
