import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Table } from "react-bootstrap";
import SeatVoteCurve from "../Components/SeatVoteCurve";

function PlanComparison({ title, selectedStateAbbr, SMDMMD }) {
  const [data, setData] = useState({});

  useEffect(() => {
    setData({});
    const getData = async () => {
      const api = `/${selectedStateAbbr.toUpperCase()}/planComparison`;
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
        <Table striped bordered hover>
          <thead className="table_th">
            <tr>
              <td></td>
              <td>Enacted Plan</td>
              <td>Average MMD Plans</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table_stateInfo_col1">Party Splits</td>
              <td>
                {data.enacted?.republican || 0} Republicans
                <br />
                {data.enacted?.democratic || 0} Democrats
              </td>
              <td>
                {data.avg_mmd?.republican || 0} Republicans
                <br />
                {data.avg_mmd?.democratic || 0} Democrats
              </td>
            </tr>
            <tr>
              <td className="table_stateInfo_col1">
                Opportunity
                <br />
                Representatives
              </td>
              <td>
                {data.enacted?.num_op_representatives || 0} representatives
              </td>
              <td>
                {data.avg_mmd?.num_op_representatives || 0} representatives
              </td>
            </tr>
            <tr>
              <td className="table_stateInfo_col1">Seats-Votes Curve</td>
              <td>
                <div
                  className="item_plot_Ensemble"
                  style={{ width: "100%", height: 330 }}
                >
                  <SeatVoteCurve data={data.enacted?.seats_votes || []} />
                </div>
              </td>
              <td>
                <div
                  className="item_plot_Ensemble"
                  style={{ width: "100%", height: 330 }}
                >
                  <SeatVoteCurve data={data.avg_mmd?.seats_votes || []} />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Row>
  );
}

export default PlanComparison;
