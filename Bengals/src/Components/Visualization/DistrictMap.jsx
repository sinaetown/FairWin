import React, { useMemo } from "react";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import L from "leaflet";

const DistrictMap = ({ selectedState, mapKey, data }) => {
  const coordinate = useMemo(() => {
    const stateCoordinates = {
      ALABAMA: [32.55, -86.7911],
      MISSISSIPPI: [32.55, -90.0],
      PENNSYLVANIA: [40.8781, -77.7996],
    };
    return stateCoordinates[selectedState] || [0, 0];
  }, [selectedState]);

  const onEachDistrict = (district, layer) => {
    const { properties } = district;
    const centroid = properties.centroid.split(",");
    const latLng = L.latLng(parseFloat(centroid[1]), parseFloat(centroid[0]));
    const styleDefault = {
      color: "rgb(40, 38, 38)",
      fillColor: "rgb(220, 25, 10)",
    };
    const styleHover = {
      fillColor: "rgb(120, 115, 115)",
    };

    const onMouseOver = () => {
      layer.setStyle(styleHover);
      const label = L.divIcon({
        className: "district-label",
        html: properties.districtNumber
          ? `<div style="font-size: 25px; color: black;">${properties.districtNumber}</div>`
          : "",
      });
      layer._labelMarker = L.marker(latLng, { icon: label }).addTo(layer._map);
    };

    const onMouseOut = () => {
      layer.setStyle(styleDefault);
      if (layer._labelMarker) {
        layer._map.removeLayer(layer._labelMarker);
        layer._labelMarker = null;
      }
    };

    const generatePopupContent = (properties) => `
      <div style="font-size: 16px; width: 300px; word-wrap: break-word;">
        <b>Total Population:</b> ${
          properties.totalPopulation?.toLocaleString() || 0
        }<br/>
        <b>Voting Population:</b> ${
          properties.votePopulation?.toLocaleString() || 0
        }<br/>
        <b>Asian:</b> ${properties.totalAsian?.toLocaleString() || 0}<br/>
        <b>African American:</b> ${
          properties.totalBlack?.toLocaleString() || 0
        }<br/>
        <b>Hispanic:</b> ${properties.totalHispanic?.toLocaleString() || 0}<br/>
        <b>White:</b> ${properties.totalWhite?.toLocaleString() || 0}<br/>
        <b>Democratic Votes:</b> ${
          properties.democraticVotes?.toLocaleString() || 0
        }<br/>
        <b>Republican Votes:</b> ${
          properties.republicanVotes?.toLocaleString() || 0
        }<br/>
        <b>Winners:</b> ${properties.winningParty || "N/A"}<br/>
        ${
          properties.opportunityThreshold
            ? `<b>Opportunity Threshold:</b> ${properties.opportunityThreshold}`
            : ""
        }
      </div>
    `;

    layer.bindPopup(generatePopupContent(properties));
    layer.setStyle(styleDefault);
    layer.on({
      mouseover: onMouseOver,
      mouseout: onMouseOut,
    });
  };

  return (
    <div className="district-map">
      <MapContainer
        key={mapKey}
        center={coordinate}
        zoom={6.5}
        zoomControl
        scrollWheelZoom={false}
        className="map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON data={data} onEachFeature={onEachDistrict} />
      </MapContainer>
    </div>
  );
};

export default DistrictMap;
