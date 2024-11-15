import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import NavBar from "../Components/NavBar";
import BoxWhisker from "../Components/BoxWhisker";

const RacialDistribution = ({
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
      const api = `/${selectedStateAbbr.toUpperCase()}/racialDistribution/${SMDMMD}`;
      try {
        const data = await axios.get(`http://localhost:8080${api}`);
        setData(data.data);
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
          <BoxWhisker data={data[showGraph] || []} option={SMDMMD} />
        </Col>
      </Row>
    </Row>
  );
};

export default RacialDistribution;
