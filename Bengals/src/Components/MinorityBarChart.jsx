import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const MinorityBarChart = ({ data }) => {
  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
        // tickFormatter={(value) => {
        //   return value >= 10000
        //     ? `${Math.round(value / 1000000)}M`
        //     : value.toLocaleString();
        // }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="White" fill="#ffc658" />
        <Bar dataKey="Asian" stackId="a" fill="#8884d8" />
        <Bar dataKey="Black" stackId="a" fill="#82ca9d" />
        <Bar dataKey="Hispanic" stackId="a" fill="#f7a1b8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MinorityBarChart;
