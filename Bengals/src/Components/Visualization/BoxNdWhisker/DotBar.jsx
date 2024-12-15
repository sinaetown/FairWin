import React from "react";

const DotBar = ({ x, y, width, height }) => {
  if (x == null || y == null || width == null || height == null) return null;

  return (
    <line
      x1={x + width / 2}
      y1={y + height}
      x2={x + width / 2}
      y2={y}
      stroke="#000"
      strokeWidth={2}
    />
  );
};

export default DotBar;
