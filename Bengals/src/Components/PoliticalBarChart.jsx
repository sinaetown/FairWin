import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PoliticalBarChart = ({ data }) => {
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
        <Bar dataKey="democratic" fill="#6a9bd1" />
        <Bar dataKey="republican" fill="#ff4c4c" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PoliticalBarChart;
