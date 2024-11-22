import React, { useMemo } from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
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
        {data.enacted !== undefined && data.enacted !== null && (
          <p style={{ color: "red" }}>{`Enacted: ${data.enacted}`}</p>
        )}
      </div>
    );
  }
  return null;
};

function BoxWhisker({ data, option }) {
  const useBoxPlotSMD = (boxPlots) => {
    if (option === "smd") {
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

  const maxValue = Math.max(
    ...data.map((item) => item.max),
    ...data.map((item) => item.enacted || 0)
  );

  const getYAxisDomain = () => {
    if (maxValue < 0.1) {
      return [0, 0.1];
    } else if (maxValue >= 0.1 && maxValue < 0.2) {
      return [0, 0.2];
    } else if (maxValue >= 0.2 && maxValue < 0.4) {
      return [0, 0.4];
    } else if (maxValue >= 0.4 && maxValue < 0.6) {
      return [0, 0.6];
    } else if (maxValue >= 0.6 && maxValue < 0.8) {
      return [0, 0.8];
    } else {
      return [0, 1];
    }
  };

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
    if (option === "smd") {
      return [
        { value: "Box", type: "rect", id: "bottomBox", color: "#8884d8" },
        { value: "Enacted", type: "scatter", id: "enacted", color: "red" },
      ];
    } else {
      return [
        { value: "Box", type: "rect", id: "bottomBox", color: "#8884d8" },
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
        <Tooltip content={<CustomTooltip />} />
        <Legend payload={legendPayload()} />
        <XAxis dataKey="name" />
        <YAxis
          domain={getYAxisDomain()}
          tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default BoxWhisker;
