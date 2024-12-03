import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import NavBar from "../UI/NavBar";
import OpportunityBar from "../Visualization/OpportunityBar";

const OpportunityDistribution = ({
  title,
  showGraph,
  setShowGraph,
  navbarItem,
  selectedStateAbbr,
  SMDMMD,
}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData({});
    const getData = async () => {
      const api = `/${selectedStateAbbr.toUpperCase()}/opportunity-distribution/${SMDMMD}`;
      try {
        const response = await axios.get(`http://localhost:8080${api}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [selectedStateAbbr, SMDMMD, showGraph]);

  return (
    <Row className="item_contents_Random">
      <div className="info_title">{title}</div>
      <Row>
        <NavBar setShowContent={setShowGraph} simpleItem={navbarItem} />
      </Row>
      <Row className="item_contents_Ensemble">
        <Col
          className="item_plot_Ensemble"
          style={{ width: "100%", height: 330 }}
        >
          <OpportunityBar
            data={data.opportunityDistrictsBar?.[showGraph] || []}
            keyName="numOpportunityDistricts"
          />
        </Col>
        <Col
          className="item_plot_Ensemble"
          style={{ width: "100%", height: 330 }}
        >
          <OpportunityBar
            data={data.opportunityRepresentativesBar?.[showGraph] || []}
            keyName="opportunityRepresentatives"
          />
        </Col>
      </Row>
    </Row>
  );
};

export default OpportunityDistribution;
