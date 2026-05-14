"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MemoryMap() {
  return (
    <div
      style={{
        borderRadius: "24px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={[53.7575, 87.1361]}
        zoom={10}
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[53.7575, 87.1361]}>
          <Popup>
            Новокузнецк
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}