import React from "react";
import { Table } from "react-bootstrap";

const RandomPlanTable = ({ data }) => {
  const tableData = [
    {
      field: "Total Population",
      value: `${(data?.total_pop || 0).toLocaleString()} People`,
    },
    {
      field: "Voting Population",
      value: `${(data?.vote_pop || 0).toLocaleString()} People`,
    },
    {
      field: "Total White",
      value: `${(data?.total_wht || 0).toLocaleString()} People`,
    },
    {
      field: "Total African American",
      value: `${(data?.total_blk || 0).toLocaleString()} People`,
    },
    {
      field: "Total Asian",
      value: `${(data?.total_asn || 0).toLocaleString()} People`,
    },
    {
      field: "Total Hispanic",
      value: `${(data?.total_hsp || 0).toLocaleString()} People`,
    },
    {
      field: "Party Splits",
      value: (
        <>
          {data?.republican || 0} Republicans
          <br />
          {data?.democratic || 0} Democrats
        </>
      ),
    },
    {
      field: "White & Non-White Ratio",
      value: (
        <>
          {data?.white_ratio || 0} White
          <br />
          {data?.non_white_ratio || 0} Non-white
        </>
      ),
    },
    {
      field: "Number of Opportunity Districts",
      value: `${data?.num_op_districts || 0} out of ${
        (data?.republican || 0) + (data?.democratic || 0)
      } Districts`,
    },
    {
      field: "Number of Safe Districts",
      value: `${data?.num_safe_districts || 0} out of ${
        (data?.republican || 0) + (data?.democratic || 0)
      } Districts`,
    },
    { field: "Election Data Source", value: "2020 Presidential Election" },
  ];

  return (
    <Table striped bordered hover>
      <thead className="table_th">
        <tr>
          <td>Fields</td>
          <td>Values</td>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td className="table_stateInfo_col1">{row.field}</td>
            <td>{row.value}</td>
          </tr>
        ))}
        {data?.op_threshold !== undefined && data?.op_threshold !== 0 && (
          <tr>
            <td className="table_stateInfo_col1">
              Threshold Used For Opportunity Districts
            </td>
            <td>{`${data?.op_threshold}`}</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default RandomPlanTable;
