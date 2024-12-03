import React from "react";
import { Table } from "react-bootstrap";

const RandomPlanTable = ({ data }) => {
  const tableData = [
    {
      field: "Total Population",
      value: `${(data?.totalPopulation || 0).toLocaleString()} People`,
    },
    {
      field: "Voting Population",
      value: `${(data?.votePopulation || 0).toLocaleString()} People`,
    },
    {
      field: "Total White",
      value: `${(data?.totalWhite || 0).toLocaleString()} People`,
    },
    {
      field: "Total African American",
      value: `${(data?.totalBlack || 0).toLocaleString()} People`,
    },
    {
      field: "Total Asian",
      value: `${(data?.totalAsian || 0).toLocaleString()} People`,
    },
    {
      field: "Total Hispanic",
      value: `${(data?.totalHispanic || 0).toLocaleString()} People`,
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
      field: "White & Non-White Probability",
      value: (
        <>
          {data?.whiteRatio || 0} White
          <br />
          {data?.nonWhiteRatio || 0} Non-white
        </>
      ),
    },
    {
      field: "Number of Opportunity Districts",
      value: `${data?.numOpportunityDistricts || 0} out of ${
        (data?.republican || 0) + (data?.democratic || 0)
      } Districts`,
    },
    {
      field: "Number of Safe Districts",
      value: `${data?.numSafeDistricts || 0} out of ${
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
        {data?.opportunityThreshold !== undefined &&
          data?.opportunityThreshold !== 0 && (
            <tr>
              <td className="table_stateInfo_col1">
                Threshold Used For Opportunity Districts
              </td>
              <td>{`${data?.opportunityThreshold}`}</td>
            </tr>
          )}
      </tbody>
    </Table>
  );
};

export default RandomPlanTable;
