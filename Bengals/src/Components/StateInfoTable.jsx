import React from "react";
import { Table } from "react-bootstrap";

const StateInfoTable = ({ stateInfo, className }) => {
  // const toPercent = (value) => {
  //   return `${(value * 100).toFixed(0)}%`;
  // };
  // const toPercentWithPoint = (value) => {
  //   return `${(value * 100).toFixed(1)}%`;
  // };
  return (
    <Table striped bordered hover className={className}>
      <thead>
        <tr>
          <td className="table_stateInfo_col1">Population</td>
          <td>{stateInfo.population.toLocaleString()}</td>
          <td className="table_stateInfo_col1">Voting Population</td>
          <td>{stateInfo.votePopulation.toLocaleString()}</td>
        </tr>
        <tr>
          <td className="table_stateInfo_col1">Total Seats</td>
          <td>{stateInfo.totalSeats}</td>
          <td className="table_stateInfo_col1">Party Splits</td>
          <td>
            Democrat: {stateInfo.Democrat}; <br />
            Republican: {stateInfo.Republican}
          </td>
        </tr>
        <tr>
          <td className="table_stateInfo_col1">Minorities Split</td>
          <td colSpan={3}>
            Asian: {stateInfo.Minorities.asn}; Black: {stateInfo.Minorities.blk}
            ; Hispanic: {stateInfo.Minorities.hisp}
          </td>
        </tr>
      </thead>
    </Table>
  );
};

export default StateInfoTable;
