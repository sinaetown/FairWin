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
        className="item_plot_Ensemble"
        style={{ width: "100%", height: 330 }}
      >
        <SeatVoteCurve data={seatVoteCurveData} />
      </Row>
      <Row xs={1}>
        <Table striped bordered hover className="info_table">
          <thead className="table_th">
            <tr>
              <td>Fields</td>
              <td>Values</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table_stateInfo_col1">Bias (50%)</td>
              <td>{bias}%</td>
            </tr>
            <tr>
              <td className="table_stateInfo_col1">Symmetry</td>
              <td>{symmetry}</td>
            </tr>
            <tr>
              <td className="table_stateInfo_col1">Responsiveness</td>
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
