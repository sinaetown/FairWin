import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SeatVoteCurve = ({ data }) => {
  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 35,
          left: 15,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          tickFormatter={(tick) => {
            return `${tick}%`;
          }}
        />
        <YAxis
          domain={[0, 100]}
          tickFormatter={(tick) => {
            return `${tick.toFixed(0)}%`;
          }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="democratic"
          stroke="#6a9bd1"
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="republican"
          stroke="#ff4c4c"
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SeatVoteCurve;
