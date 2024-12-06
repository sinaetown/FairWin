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

const SimpleBarChart = ({ keyName, data }) => {
  const changeIdName = (name) => {
    return name
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {keyName.toLowerCase().includes("opportunity") && (
        <h5 className="bar-chart-title">
          {changeIdName(keyName).replace(/num/g, "")}
        </h5>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 35,
            left: 15,
            bottom: keyName.toLowerCase().includes("opportunity") ? 30 : 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [
              value,
              changeIdName(name).toLowerCase(),
            ]}
          />
          <Legend formatter={(value) => changeIdName(value).toLowerCase()} />
          <Bar dataKey={keyName} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;
