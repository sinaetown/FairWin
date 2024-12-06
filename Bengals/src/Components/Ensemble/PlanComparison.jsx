import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Table } from "react-bootstrap";
import SeatVoteCurve from "../Visualization/SeatVoteCurve";

const PlanComparison = ({ title, selectedStateAbbr, smdmmd }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData({});
    const getData = async () => {
      const api = `/${selectedStateAbbr.toUpperCase()}/plan-comparison`;
      try {
        const response = await axios.get(`http://localhost:8080${api}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [selectedStateAbbr, smdmmd]);

  return (
    <Row className="info-contents-row">
      <div className="info-title">{title}</div>
      <Row>
        <Table striped bordered hover>
          <thead className="table-header">
            <tr>
              <td></td>
              <td>Enacted Plan</td>
              <td>Average MMD Plans</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-first-col">Party Splits</td>
              <td>
                {data.enacted?.republican || 0} Republicans
                <br />
                {data.enacted?.democratic || 0} Democrats
              </td>
              <td>
                {data.averageMmd?.republican || 0} Republicans
                <br />
                {data.averageMmd?.democratic || 0} Democrats
              </td>
            </tr>
            <tr>
              <td className="table-first-col">
                Opportunity
                <br />
                Representatives
              </td>
              <td>
                {data.enacted?.numOpportunityRepresentatives || 0}{" "}
                representatives
              </td>
              <td>
                {data.averageMmd?.numOpportunityRepresentatives || 0}{" "}
                representatives
              </td>
            </tr>
            <tr>
              <td className="table-first-col">
                Seats-Votes
                <br />
                Curve
              </td>
              <td>
                <div
                  className="info-visualization-container"
                  style={{ width: "100%", height: 330 }}
                >
                  <SeatVoteCurve data={data.enacted?.seatsVotes || []} />
                </div>
              </td>
              <td>
                <div
                  className="info-visualization-container"
                  style={{ width: "100%", height: 330 }}
                >
                  <SeatVoteCurve data={data.averageMmd?.seatsVotes || []} />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Row>
  );
};

export default PlanComparison;
