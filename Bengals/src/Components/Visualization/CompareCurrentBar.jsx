import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const CompareCurrentBar = ({ keyName, data }) => {
  const setColor = () => {
    if (keyName == "republican") {
      return "#ff4c4c";
    } else if (keyName == "democratic") {
      return "#6a9bd1";
    } else {
      return "#8884d8";
    }
  };

  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 35,
          left: 15,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 1]} tickFormatter={(tick) => tick.toFixed(2)} />
        <Tooltip />
        <Legend />
        <Bar dataKey={keyName} fill={setColor()} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CompareCurrentBar;
