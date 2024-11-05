import React from "react";
import { Table } from "react-bootstrap";

const StateInfoTable = ({ stateInfo, className }) => {
  const toPercent = (value) => {
    return `${(value * 100).toFixed(0)}%`;
  };
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
            Democrat: {toPercent(stateInfo.Democrat)}; <br/>Republican:{" "}
            {toPercent(stateInfo.Republican)}
          </td>
        </tr>
        <tr>
          <td className="table_stateInfo_col1">Minorities Split</td>
          <td colSpan={3}>
            Asian: {toPercent(stateInfo.Minorities.asn)}; Black:{" "}
            {toPercent(stateInfo.Minorities.blk)}; Hispanic:{" "}
            {toPercent(stateInfo.Minorities.hisp)}; Non_White:{" "}
            {toPercent(stateInfo.Minorities.non_white)}
          </td>
        </tr>
      </thead>
    </Table>
  );
};

export default StateInfoTable;
