import React from "react";
import SeatVoteCurve from "../Visualization/SeatVoteCurve";
import { Row, Table } from "react-bootstrap";

const SeatVoteCurveInfo = ({
  seatVoteCurveData,
  bias,
  symmetry,
  responsiveness,
}) => {
  return (
    <Row>
      <Row
        xs={5}
        className="info-visualization-container"
        style={{ width: "100%", height: 330 }}
      >
        <SeatVoteCurve data={seatVoteCurveData} />
      </Row>
      <Row xs={1}>
        <Table striped bordered hover className="info-table">
          <thead className="table-header">
            <tr>
              <td>Fields</td>
              <td>Values</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-first-col">Bias (50%)</td>
              <td>{bias}%</td>
            </tr>
            <tr>
              <td className="table-first-col">Symmetry</td>
              <td>{symmetry}</td>
            </tr>
            <tr>
              <td className="table-first-col">Responsiveness</td>
              <td>
                Republican: {responsiveness.republican}
                <br />
                Democratic: {responsiveness.democratic}
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Row>
  );
};

export default SeatVoteCurveInfo;
