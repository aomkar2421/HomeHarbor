import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.scss";
import Pin from "../pin/Pin";

const map = ({ items }) => {
  return (
    // for changing marker position change the position coordinates to pune
    <MapContainer center={ items.length === 1 ? [items[0].latitude, items[0].longitude] : [21.1466, 79.0888] } zoom={5} scrollWheelZoom={false} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
};

export default map;
