import React, { useMemo } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";

const DistrictMap = ({ selectedState, mapKey, data }) => {
  const coordinate = useMemo(() => {
    if (selectedState === "ALABAMA") {
      return [32.8067, -86.7911];
    } else if (selectedState === "MISSISSIPPI") {
      return [32.3547, -90.0];
    } else {
      return [40.8781, -77.7996];
    }
  }, [selectedState]);

  const onEachDistrict = (district, layer) => {
    const properties = district["properties"];
    let centroid = properties["centroid"].split(",");
    const latLng = L.latLng(parseFloat(centroid[1]), parseFloat(centroid[0]));
    const onMouseOver = (e) => {
      layer.setStyle({
        fillColor: "rgb(40, 38, 38)",
      });
    };
    const onMouseOut = (e) => {
      layer.setStyle({
        fillColor: "rgb(220, 25, 10)",
      });
    };
    // {
    //   properties[""] && layer.bindPopup(properties["win_pty"]);
    // }
    // {
    //   properties[""] && layer.bindPopup(properties["win_pty"]);
    // }

    const onAdd = (e) => {
      const label = L.divIcon({
        className: "district-label",
        html: `<div style="font-size: 20px; color: black;"></div>`,
      });
      L.marker(latLng, { icon: label }).addTo(layer._map);
    };
    layer.setStyle({
      color: "rgba(241, 243, 243, 1)",
      fillColor: "rgb(220, 25, 10)",
    });
    layer.on({
      mouseout: onMouseOut,
      mouseover: onMouseOver,
      add: onAdd,
    });
  };

  return (
    <div className="districtMap">
      <MapContainer
        key={mapKey}
        center={coordinate}
        zoom={6.5}
        zoomControl={true}
        scrollWheelZoom={false}
        className="map_district"
      >
        <GeoJSON
          data={data}
          onEachFeature={(district, layer) => {
            onEachDistrict(district, layer);
          }}
        />
      </MapContainer>
    </div>
  );
};

export default DistrictMap;
