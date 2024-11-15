import React from "react";
import usaMapData from "@svg-maps/usa";

const USMap = ({
  hoveredLocation,
  selectedState,
  setHoveredLocation,
  setSelectedState,
  toSateInfo,
}) => {
  const customStates = ["MISSISSIPPI", "ALABAMA", "PENNSYLVANIA"];

  return (
    <svg viewBox={usaMapData.viewBox} xmlns="http://www.w3.org/2000/svg">
      {usaMapData.locations.map((location) => {
        let capitalSelectedState = location.name.toUpperCase();
        const isCustom = customStates.includes(capitalSelectedState);
        return (
          <path
            key={location.id}
            d={location.path}
            fill={
              hoveredLocation === capitalSelectedState
                ? "rgba(236, 31, 12, 0.7)"
                : selectedState === capitalSelectedState
                ? "rgb(236, 31, 12)"
                : isCustom
                ? "#EEE"
                : "rgb(135, 135, 135)"
            }
            stroke="rgba(40, 38, 38, 1.0)"
            strokeWidth={selectedState === capitalSelectedState ? 3.0 : 0.9}
            onMouseEnter={() => setHoveredLocation(capitalSelectedState)}
            onMouseLeave={() => setHoveredLocation(null)}
            onClick={
              isCustom
                ? () => {
                    setSelectedState(capitalSelectedState);
                    toSateInfo(location.id);
                  }
                : null
            }
            style={{ cursor: "pointer" }}
          />
        );
      })}
    </svg>
  );
};

export default USMap;
