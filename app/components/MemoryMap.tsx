"use client";

import dynamic from "next/dynamic";
import type { LatLngExpression } from "leaflet";

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then((m) => m.Polyline), { ssr: false });

type MapPerson = {
  id: number;
  name: string;
  birthPlace: string | null;
  birthLat: number | null;
  birthLng: number | null;
  fatherId?: number | null;
};

export default function MemoryMap({ people = [] }: { people?: MapPerson[] }) {
  const center: LatLngExpression =
    people[0]?.birthLat && people[0]?.birthLng ? [people[0].birthLat, people[0].birthLng] : [55.751244, 37.618423];

  return (
    <div className="h-[calc(100vh-190px)] min-h-[620px] overflow-hidden rounded-xl border border-white/10">
      <MapContainer center={center} zoom={people.length ? 4 : 3} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
        <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {people.map((person) => {
          if (!person.birthLat || !person.birthLng) {
            return null;
          }

          return (
            <Marker key={person.id} position={[person.birthLat, person.birthLng]}>
              <Popup>
                <strong>{person.name}</strong>
                <br />
                {person.birthPlace || "Место памяти"}
              </Popup>
            </Marker>
          );
        })}
        {people.map((person) => {
          const father = people.find((item) => item.id === person.fatherId);
          if (!father?.birthLat || !father.birthLng || !person.birthLat || !person.birthLng) {
            return null;
          }

          return (
            <Polyline
              key={`${father.id}-${person.id}`}
              positions={[
                [father.birthLat, father.birthLng],
                [person.birthLat, person.birthLng],
              ]}
              pathOptions={{ color: "#d6ad52", weight: 3 }}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}
