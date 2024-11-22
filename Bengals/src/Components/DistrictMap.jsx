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
      fillColor: "rgb(40, 38, 38)",
    };
    const onMouseOver = () => layer.setStyle(styleHover);
    const onMouseOut = () => layer.setStyle(styleDefault);

    layer.bindPopup(`
      <div style="font-size: 16px; width: 300px; word-wrap: break-word;">
        <b>Total Population:</b> ${
          properties.total_pop?.toLocaleString() || 0
        }<br/>
        <b>Voting Population:</b> ${
          properties.vote_pop?.toLocaleString() || 0
        }<br/>
        <b>Asian:</b> ${properties.total_asn?.toLocaleString() || 0}<br/>
        <b>African American:</b> ${
          properties.total_blk?.toLocaleString() || 0
        }<br/>
        <b>Hispanic:</b> ${properties.total_hsp?.toLocaleString() || 0}<br/>
        <b>White:</b> ${properties.total_wht?.toLocaleString() || 0}<br/>
        <b>Democratic Votes:</b> ${
          properties.vote_dem?.toLocaleString() || 0
        }<br/>
        <b>Republican Votes:</b> ${
          properties.vote_rep?.toLocaleString() || 0
        }<br/>
        <b>Winners:</b> ${properties.win_pty || "N/A"}<br/>
        ${
          properties.op_threshold
            ? `<b>Opportunity Threshold:</b> ${properties.op_threshold}%`
            : ""
        }
      </div>
    `);

    // layer.on("add", () => {
    //   const label = L.divIcon({
    //     className: "district-label",
    //     html: `<div style="font-size: 20px; color: black;">${1 || 0}</div>`,
    //   });
    //   L.marker(latLng, { icon: label }).addTo(layer._map);
    // });
    layer.setStyle(styleDefault);
    layer.on({
      mouseover: onMouseOver,
      mouseout: onMouseOut,
    });
  };

  return (
    <div className="districtMap">
      <MapContainer
        key={mapKey}
        center={coordinate}
        zoom={6.5}
        zoomControl
        scrollWheelZoom={false}
        className="map_district"
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
