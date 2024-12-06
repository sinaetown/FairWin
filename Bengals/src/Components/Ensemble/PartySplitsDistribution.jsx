import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Table } from "react-bootstrap";
import SimpleBarChart from "../Visualization/SimpleBarChart";

const PartySplitsDistribution = ({ title, selectedStateAbbr, smdmmd }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData({});
    const getData = async () => {
      const api = `/${selectedStateAbbr.toUpperCase()}/party-split-distribution/${smdmmd}`;
      try {
        const data = await axios.get(`http://localhost:8080${api}`);
        setData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [selectedStateAbbr, smdmmd]);

  return (
    <Row className="info-contents-row">
      <div className="info-title">{title}</div>
      <Row className="info-contents-inner-row">
        <Col
          className="info-visualization-container"
          style={{ width: "100%", height: 330 }}
        >
          <SimpleBarChart
            keyName={"numDistricts"}
            data={data.partySplitsBar || []}
          />
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover className="info-table">
          <thead className="table-header">
            <tr>
              <td>Vote Share</td>
              <td>Average Seat Share</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>50%(fixed)</td>
              <td>
                Republican = {data.averageSeatShare?.republican ?? 0}%,
                Democratic = {data.averageSeatShare?.democratic ?? 0}%
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Row>
  );
};

export default PartySplitsDistribution;
