"use client";

import { useEffect, useState }
from "react";

import dynamic from "next/dynamic";

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

const Polyline = dynamic(
  async () =>
    (await import(
      "react-leaflet"
    )).Polyline,
  {
    ssr: false,
  }
);

export default function FamilyMapPage() {
  const [people, setPeople] =
    useState<any[]>([]);

  useEffect(() => {
    fetch("/api/people")
      .then((res) =>
        res.json()
      )
      .then((data) =>
        setPeople(data)
      );
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",

        background:
          "#020617",

        padding: "20px",
      }}
    >
      <h1
        style={{
          color: "#facc15",

          fontSize: "56px",

          marginBottom: "20px",
        }}
      >
        Миграция рода
      </h1>

      <div
        style={{
          height: "82vh",

          borderRadius:
            "24px",

          overflow: "hidden",

          border:
            "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <MapContainer
          center={[55.751244, 37.618423]}
          zoom={3}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* MARKERS */}

          {people.map(
            (person) => {
              if (
                !person.birthLat ||
                !person.birthLng
              ) {
                return null;
              }

              return (
                <Marker
                  key={person.id}
                  position={[
                    person.birthLat,
                    person.birthLng,
                  ]}
                >
                  <Popup>
                    <div>
                      <strong>
                        {
                          person.name
                        }
                      </strong>

                      <br />

                      {
                        person.birthPlace
                      }
                    </div>
                  </Popup>
                </Marker>
              );
            }
          )}

          {/* MIGRATION */}

          {people.map(
            (person) => {
              const father =
                people.find(
                  (
                    p: any
                  ) =>
                    p.id ===
                    person.fatherId
                );

              if (
                !father ||
                !father.birthLat ||
                !father.birthLng ||
                !person.birthLat ||
                !person.birthLng
              ) {
                return null;
              }

              return (
                <Polyline
                  key={
                    person.id
                  }
                  positions={[
                    [
                      father.birthLat,
                      father.birthLng,
                    ],

                    [
                      person.birthLat,
                      person.birthLng,
                    ],
                  ]}
                  pathOptions={{
                    color:
                      "#facc15",

                    weight: 4,
                  }}
                />
              );
            }
          )}
        </MapContainer>
      </div>
    </main>
  );
}