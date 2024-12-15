import React from "react";

const HorizonBar = ({ x, y, width }) => {
  if (x == null || y == null || width == null) return null;

  return (
    <line x1={x} y1={y} x2={x + width} y2={y} stroke="#000" strokeWidth={2} />
  );
};

export default HorizonBar;
