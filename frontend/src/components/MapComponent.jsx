import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { useSelector } from "react-redux";

const containerStyle = {
  width: `{screen.width}px`,
  height: "200px",
};

const MapComponent = ({ api, zoom, lat, long }) => {
  const center = {
    lat: lat,
    lng: long,
  };

  return (
    <LoadScript googleMapsApiKey={api}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
