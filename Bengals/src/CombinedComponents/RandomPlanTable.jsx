import React from "react";
import { Table } from "react-bootstrap";

const RandomPlanTable = ({
  numDistricts,
  partySplit,
  opDistricts,
  safeDistricts,
  opThreshold,
}) => (
  <Table striped bordered hover>
    <thead className="table_th">
      <tr>
        <td>Fields</td>
        <td>Values</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="table_stateInfo_col1">Party Splits</td>
        <td>
          {partySplit.republican} Republicans
          <br />
          {partySplit.democratic} Democrats
        </td>
      </tr>
      <tr>
        <td className="table_stateInfo_col1">
          Number of Opportunity Districts
        </td>
        <td>
          {opDistricts} out of {numDistricts} Districts
        </td>
      </tr>
      <tr>
        <td className="table_stateInfo_col1">
          Threshold Used For Opportunity Districts
        </td>
        <td>{opThreshold}%</td>
      </tr>
      <tr>
        <td className="table_stateInfo_col1">Number of Safe Districts</td>
        <td>
          {safeDistricts} out of {numDistricts} Districts
        </td>
      </tr>
      <tr>
        <td className="table_stateInfo_col1">Election Data Source</td>
        <td>2020 Presidential Election</td>
      </tr>
    </tbody>
  </Table>
);

export default RandomPlanTable;
