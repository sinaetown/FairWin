import React, { useMemo } from "react";
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
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <p>{`${label}`}</p>
        <p>{`Median: ${data.median}`}</p>
        <p style={{ color: "blue" }}>{`Average: ${data.average}`}</p>
        {data.enacted && (
          <p style={{ color: "red" }}>{`Enacted: ${data.enacted}`}</p>
        )}
      </div>
    );
  }
  return null;
};
function BoxWhisker({ data, option }) {
  const useBoxPlotSMD = (boxPlots) => {
    if (option == "smd") {
      const data = useMemo(
        () =>
          boxPlots.map((v) => {
            return {
              name: v.name,
              min: v.min,
              median: v.median,
              bottomWhisker: v.lowerQuartile - v.min,
              bottomBox: v.median - v.lowerQuartile,
              topBox: v.upperQuartile - v.median,
              topWhisker: v.max - v.upperQuartile,
              average: v.average,
              enacted: v.enacted,
              size: 250,
            };
          }),
        [boxPlots]
      );
      return data;
    } else {
      const data = useMemo(
        () =>
          boxPlots.map((v) => {
            return {
              name: v.name,
              min: v.min,
              median: v.median,
              bottomWhisker: v.lowerQuartile - v.min,
              bottomBox: v.median - v.lowerQuartile,
              topBox: v.upperQuartile - v.median,
              topWhisker: v.max - v.upperQuartile,
              average: v.average,
              size: 250,
            };
          }),
        [boxPlots]
      );
      return data;
    }
  };
  // Horizontal Line
  const HorizonBar = (props) => {
    const { x, y, width, height } = props;
    if (x == null || y == null || width == null || height == null) {
      return null;
    }
    return (
      <line
        x1={x}
        y1={y}
        x2={x + width}
        y2={y}
        stroke={"#000"}
        strokeWidth={3}
      />
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
        strokeDasharray="None"
      />
    );
  };
  const legendPayload = () => {
    if (option == "smd") {
      return [
        { value: "Box", type: "rect", id: "bottomBox", color: "#8884d8" },
        { value: "Enacted", type: "scatter", id: "enacted", color: "red" },
        // { value: "Average", type: "scatter", id: "average", color: "blue" },
      ];
    } else {
      return [
        { value: "Box", type: "rect", id: "bottomBox", color: "#8884d8" },
        // { value: "Average", type: "scatter", id: "average", color: "blue" }
      ];
    }
  };
  return (
    <ResponsiveContainer>
      <ComposedChart data={useBoxPlotSMD(data)}>
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
        {/* <Scatter dataKey={"average"} fill={"blue"} stroke={"#FFF"} /> */}
        {/* <ZAxis type="number" dataKey="size" range={[0, 250]} /> */}
        <Tooltip content={<CustomTooltip />} />
        <Legend payload={legendPayload()} />
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
