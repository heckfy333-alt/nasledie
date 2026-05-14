"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  async () =>
    (await import(
      "react-leaflet"
    )).MapContainer,
  {
    ssr: false,
  }
);

const TileLayer = dynamic(
  async () =>
    (await import(
      "react-leaflet"
    )).TileLayer,
  {
    ssr: false,
  }
);

const Marker = dynamic(
  async () =>
    (await import(
      "react-leaflet"
    )).Marker,
  {
    ssr: false,
  }
);

const Popup = dynamic(
  async () =>
    (await import(
      "react-leaflet"
    )).Popup,
  {
    ssr: false,
  }
);

const graves = [
  {
    id: 1,
    name: "Александр Петров",
    years: "1947 — 2021",
    lat: 55.7558,
    lng: 37.6176,
    description:
      "Любимый отец и дедушка",
  },

  {
    id: 2,
    name: "Мария Петрова",
    years: "1950 — 2018",
    lat: 59.9343,
    lng: 30.3351,
    description:
      "Хранительница семьи",
  },
];

export default function MemorialMapPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1a1f4d 0%, #050816 60%)",
        color: "white",
      }}
    >
      <div
        style={{
          padding: "30px 50px",
          borderBottom:
            "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#ffe600",
            textDecoration: "none",
            fontSize: "42px",
            fontWeight: "bold",
          }}
        >
          НАСЛЕДИЕ
        </Link>
      </div>

      <div
        style={{
          padding: "50px",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            color: "#ffe600",
            marginBottom: "40px",
          }}
        >
          Карта памяти
        </h1>

        <div
          style={{
            height: "75vh",
            borderRadius: "30px",
            overflow: "hidden",
            border:
              "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <MapContainer
            center={[55.7558, 37.6176]}
            zoom={4}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {graves.map(
              (grave) => (
                <Marker
                  key={grave.id}
                  position={[
                    grave.lat,
                    grave.lng,
                  ]}
                >
                  <Popup>
                    <div>
                      <h2>
                        {
                          grave.name
                        }
                      </h2>

                      <div>
                        {
                          grave.years
                        }
                      </div>

                      <div>
                        {
                          grave.description
                        }
                      </div>
                    </div>
                  </Popup>
                </Marker>
              )
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}