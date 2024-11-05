import React from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ZAxis,
  Tooltip,
  Legend,
  ComposedChart,
  Scatter,
} from "recharts";

// Horizontal Line
const HorizonBar = (props) => {
  const { x, y, width, height } = props;
  if (x == null || y == null || width == null || height == null) {
    return null;
  }
  return (
    <line x1={x} y1={y} x2={x + width} y2={y} stroke={"#000"} strokeWidth={3} />
  );
};

// Whisker
const DotBar = (props) => {
  const { x, y, width, height } = props;

  if (x == null || y == null || width == null || height == null) {
    return null;
  }
  return (
    <line
      x1={x + width / 2}
      y1={y + height}
      x2={x + width / 2}
      y2={y}
      stroke={"#000"}
      strokeWidth={5}
      strokeDasharray={"5"}
    />
  );
};

function BoxWhisker({ data }) {
  const legendPayload = [
    { value: "Box", type: "rect", id: "bottomBox", color: "#8884d8" },
  ];
  return (
    <ResponsiveContainer>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Bar stackId={"a"} dataKey={"min"} fill={"none"} />
        <Bar stackId={"a"} dataKey={"bar"} shape={<HorizonBar />} />
        <Bar stackId={"a"} dataKey={"bottomWhisker"} shape={<DotBar />} />
        <Bar stackId={"a"} dataKey={"bottomBox"} fill={"#8884d8"} />
        <Bar stackId={"a"} dataKey={"bar"} shape={<HorizonBar />} />
        <Bar stackId={"a"} dataKey={"topBox"} fill={"#8884d8"} />
        <Bar stackId={"a"} dataKey={"topWhisker"} shape={<DotBar />} />
        <Bar stackId={"a"} dataKey={"bar"} shape={<HorizonBar />} />
        <Scatter dataKey={"enacted"} fill={"red"} stroke={"#FFF"} />
        {/* <ZAxis type="number" dataKey="size" range={[0, 250]} /> */}
        <Tooltip />
        <Legend payload={legendPayload} />
        <XAxis dataKey="name" />
        <YAxis
          domain={[0, 1]}
          tickFormatter={(tick) => {
            return `${(tick * 100).toFixed(0)}%`;
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
export default BoxWhisker;
