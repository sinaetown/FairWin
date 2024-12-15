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
import HorizonBar from "./HorizonBar";
import DotBar from "./DotBar";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        className="customToolTip"
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <p className="text-tool-tip">{`${label}`}</p>
        <p className="text-tool-tip">{`Max: ${data.max}`}</p>
        <p className="text-tool-tip">{`Upper Quartile: ${data.upperQuartile}`}</p>
        <p className="text-tool-tip">{`Median: ${data.median}`}</p>
        <p className="text-tool-tip">{`Lower Quartile: ${data.lowerQuartile}`}</p>
        <p className="text-tool-tip">{`Min: ${data.min}`}</p>
        <p
          className="text-tool-tip"
          style={{ color: "blue" }}
        >{`Average: ${data.average}`}</p>
        {data.enacted !== undefined && data.enacted !== null && (
          <p
            className="text-tool-tip"
            style={{ color: "red" }}
          >{`Enacted: ${data.enacted}`}</p>
        )}
      </div>
    );
  }
  return null;
};

const BoxWhisker = ({ data, option }) => {
  const formatBoxPlotData = (boxPlots) => {
    return useMemo(() => {
      return boxPlots.map((v) => ({
        name: v.name,
        min: v.min,
        median: v.median,
        bottomWhisker: v.lowerQuartile - v.min,
        bottomBox: v.median - v.lowerQuartile,
        topBox: v.upperQuartile - v.median,
        topWhisker: v.max - v.upperQuartile,
        lowerQuartile: v.lowerQuartile,
        upperQuartile: v.upperQuartile,
        max: v.max,
        average: v.average,
        enacted: option === "smd" ? v.enacted : undefined,
        size: 250,
      }));
    }, [boxPlots, option]);
  };

  const maxValue = Math.max(
    ...data.map((item) => item.max),
    ...data.map((item) => item.enacted || 0)
  );

  const getYAxisDomain = () => {
    const thresholds = [0.1, 0.2, 0.4, 0.6, 0.8];
    for (let i = 0; i < thresholds.length; i++) {
      if (maxValue < thresholds[i]) {
        return [0, thresholds[i]];
      }
    }
    return [0, 1];
  };

  const legendPayload = () => {
    let baseLegend = [
      {
        value: "1st-3rd Quartile Range",
        type: "rect",
        id: "bottomBox",
        color: "#8884d8",
      },
    ];
    if (option === "smd") {
      baseLegend.push({
        value: "Enacted",
        type: "scatter",
        id: "enacted",
        color: "red",
      });
    }
    return baseLegend;
  };

  return (
    <ResponsiveContainer>
      <ComposedChart data={formatBoxPlotData(data)}>
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
};

export default BoxWhisker;
