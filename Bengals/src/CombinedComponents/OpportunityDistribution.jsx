import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import NavBar from "../Components/NavBar";
import OpportunityBar from "../Components/OpportunityBar";

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
      const api = `/${selectedStateAbbr.toUpperCase()}/opDistribution/${SMDMMD}`;
      try {
        const response = await axios.get(`http://localhost:8080${api}`);
        setData(response.data);
        console.log("Connected!");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [selectedStateAbbr, SMDMMD]);

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
            data={data.op_districts_bar?.[showGraph] || []}
            keyName="num_op_districts"
          />
        </Col>
        <Col
          className="item_plot_Ensemble"
          style={{ width: "100%", height: 330 }}
        >
          <OpportunityBar
            data={data.op_representatives_bar?.[showGraph] || []}
            keyName="op_representatives"
          />
        </Col>
      </Row>
    </Row>
  );
};

export default OpportunityDistribution;
