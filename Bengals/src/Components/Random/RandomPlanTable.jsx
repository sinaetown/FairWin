import React from "react";
import { Table } from "react-bootstrap";

const RandomPlanTable = ({ data }) => {
  const tableData = [
    {
      field: "Population",
      value: (
        <>
          Total Population: {(data?.totalPopulation || 0).toLocaleString()}
          <br />
          Voting Population: {(data?.votePopulation || 0).toLocaleString()}
          <br />
          Total White: {(data?.totalWhite || 0).toLocaleString()}
          <br />
          Total African American: {(data?.totalBlack || 0).toLocaleString()}
          <br />
          Total Asian: {(data?.totalAsian || 0).toLocaleString()}
          <br />
          Total Hispanic: {(data?.totalHispanic || 0).toLocaleString()}
        </>
      ),
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
          {data?.whiteProbability || 0}% White
          <br />
          {data?.nonWhiteProbability || 0}% Non-white
        </>
      ),
    },
    {
      field: "Number of Opportunity Districts",
      value: `${data?.numOpportunityDistricts || 0} out of ${
        data?.totalDistricts || 0
      } Districts`,
    },
    {
      field: "Number of Safe Districts",
      value: `${data?.numSafeDistricts || 0} out of ${
        data?.totalDistricts || 0
      } Districts`,
    },
    { field: "Election Data Source", value: "2020 Presidential Election" },
  ];

  return (
    <Table striped bordered hover>
      <thead className="table-header">
        <tr>
          <td>Fields</td>
          <td>Values</td>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td className="table-first-col">{row.field}</td>
            <td>{row.value}</td>
          </tr>
        ))}
        {data?.opportunityThreshold !== undefined &&
          data?.opportunityThreshold !== 0 && (
            <tr>
              <td className="table-first-col">
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
