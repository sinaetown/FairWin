import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Table } from "react-bootstrap";
import PoliticalBarChart from "../Components/PoliticalBarChart";

function PartySplitsDistribution({ title, selectedStateAbbr, SMDMMD }) {
  const [data, setData] = useState({});

  useEffect(() => {
    setData({});
    const getData = async () => {
      const api = `/${selectedStateAbbr.toUpperCase()}/partySplitDistribution/${SMDMMD}`;
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
      <Row className="item_contents_Ensemble">
        <Col
          className="item_plot_Ensemble"
          style={{ width: "100%", height: 330 }}
        >
          <PoliticalBarChart data={data.party_splits_bar || []} />
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover className="info_table">
          <thead className="table_th">
            <tr>
              <td>Vote Share</td>
              <td>Average Seat Share</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>50%(fixed)</td>
              <td>
                Rep = {data.avg_seat_share?.republican ?? 0}%, Dem ={" "}
                {data.avg_seat_share?.democratic ?? 0}%
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Row>
  );
}

export default PartySplitsDistribution;
