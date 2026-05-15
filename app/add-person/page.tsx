"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { LatLngExpression } from "leaflet";

const MapContainer = dynamic(() => import("react-leaflet").then((module) => module.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((module) => module.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import("react-leaflet").then((module) => module.CircleMarker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((module) => module.Popup), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then((module) => module.Polyline), { ssr: false });

type PlacePoint = {
  label: string;
  lat: number;
  lng: number;
  kind: "birth" | "death";
};

export default function AddPersonPage() {
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [deathPlace, setDeathPlace] = useState("");
  const [birthPoint, setBirthPoint] = useState<PlacePoint | null>(null);
  const [deathPoint, setDeathPoint] = useState<PlacePoint | null>(null);
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!photoFile) {
      setPhotoPreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(photoFile);
    setPhotoPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [photoFile]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      geocodePlace(birthPlace, "birth").then(setBirthPoint);
    }, 650);

    return () => window.clearTimeout(timeout);
  }, [birthPlace]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      geocodePlace(deathPlace, "death").then(setDeathPoint);
    }, 650);

    return () => window.clearTimeout(timeout);
  }, [deathPlace]);

  const mapPoints = useMemo(
    () => [birthPoint, deathPoint].filter((point): point is PlacePoint => Boolean(point)),
    [birthPoint, deathPoint],
  );

  async function uploadPhoto() {
    if (!photoFile) {
      return photo.trim();
    }

    const formData = new FormData();
    formData.append("file", photoFile);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Не удалось загрузить фото");
    }

    return data.url as string;
  }

  async function createPerson() {
    setMessage("");

    if (!firstName.trim() && !lastName.trim()) {
      setMessage("Укажите имя человека");
      return;
    }

    setIsSaving(true);

    try {
      const photoUrl = await uploadPhoto();
      const response = await fetch("/api/people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: [lastName, firstName, middleName].filter(Boolean).join(" "),
          firstName,
          lastName,
          birthDate: displayDateToIso(birthDate),
          deathDate: displayDateToIso(deathDate),
          birthPlace,
          deathPlace,
          city: birthPlace || deathPlace,
          birthLat: birthPoint?.lat,
          birthLng: birthPoint?.lng,
          deathLat: deathPoint?.lat,
          deathLng: deathPoint?.lng,
          bio,
          photo: photoUrl,
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      const data = await response.json().catch(() => null);
      setMessage(data?.error || "Не удалось добавить человека");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Не удалось сохранить данные");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#070b14",
        color: "white",
        padding: "40px",
      }}
    >
      <div style={{ margin: "0 auto", maxWidth: "1180px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "22px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Назад"
              title="Назад"
              style={navButtonStyle}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => router.forward()}
              aria-label="Вперед"
              title="Вперед"
              style={navButtonStyle}
            >
              →
            </button>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button type="button" onClick={() => router.push("/dashboard")} style={secondaryNavButtonStyle}>
              В кабинет
            </button>
            <button type="button" onClick={() => router.push("/")} style={secondaryNavButtonStyle}>
              На главную
            </button>
          </div>
        </div>

        <h1
          style={{
            color: "#ffd700",
            fontSize: "42px",
            marginBottom: "30px",
          }}
        >
          Добавить человека
        </h1>

        <div
          style={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "minmax(300px, 520px) minmax(320px, 1fr)",
            alignItems: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <input
              placeholder="Фамилия"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Имя"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Отчество"
              value={middleName}
              onChange={(event) => setMiddleName(event.target.value)}
              style={inputStyle}
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <input
                inputMode="numeric"
                placeholder="Дата рождения: ДД.ММ.ГГГГ"
                value={birthDate}
                onChange={(event) => setBirthDate(formatDisplayDate(event.target.value))}
                style={inputStyle}
              />
              <input
                inputMode="numeric"
                placeholder="Дата смерти: ДД.ММ.ГГГГ"
                value={deathDate}
                onChange={(event) => setDeathDate(formatDisplayDate(event.target.value))}
                style={inputStyle}
              />
            </div>

            <input
              placeholder="Город рождения"
              value={birthPlace}
              onChange={(event) => setBirthPlace(event.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Город смерти"
              value={deathPlace}
              onChange={(event) => setDeathPlace(event.target.value)}
              style={inputStyle}
            />

            <textarea
              placeholder="Биография"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              style={{
                ...inputStyle,
                height: "120px",
              }}
            />

            <input
              placeholder="Ссылка на фото"
              value={photo}
              onChange={(event) => setPhoto(event.target.value)}
              style={inputStyle}
            />

            <label
              style={{
                border: "1px dashed rgba(255,215,0,0.45)",
                borderRadius: "12px",
                padding: "16px",
                color: "#fde68a",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              {photoFile ? photoFile.name : "Загрузить фото с компьютера"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => setPhotoFile(event.target.files?.[0] || null)}
                style={{ display: "none" }}
              />
            </label>

            {(photoPreview || photo) && (
              <img
                src={photoPreview || photo}
                alt="Предпросмотр фото"
                style={{
                  height: "190px",
                  width: "100%",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  objectFit: "cover",
                }}
              />
            )}

            <button
              onClick={createPerson}
              disabled={isSaving}
              style={{
                background: "#ffd700",
                color: "black",
                border: "none",
                padding: "15px",
                borderRadius: "12px",
                fontWeight: "bold",
                cursor: isSaving ? "default" : "pointer",
                opacity: isSaving ? 0.7 : 1,
              }}
            >
              {isSaving ? "Сохраняем..." : "Сохранить"}
            </button>

            {message && (
              <div
                style={{
                  color: "#fca5a5",
                  lineHeight: 1.5,
                }}
              >
                {message}
              </div>
            )}
          </div>

          <div
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "18px",
              overflow: "hidden",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ padding: "16px 18px" }}>
              <h2 style={{ margin: 0, color: "#fde68a", fontSize: "22px" }}>Места на карте</h2>
              <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.62)", lineHeight: 1.5 }}>
                Впишите город рождения или смерти, и отметка появится на карте.
              </p>
            </div>
            <PreviewMap points={mapPoints} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewMap({ points }: { points: PlacePoint[] }) {
  const center: LatLngExpression = points[0] ? [points[0].lat, points[0].lng] : [55.751244, 37.618423];

  return (
    <div style={{ height: "540px", width: "100%" }}>
      <MapContainer center={center} zoom={points.length ? 5 : 3} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
        <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {points.map((point) => (
          <CircleMarker
            key={point.kind}
            center={[point.lat, point.lng]}
            radius={10}
            pathOptions={{
              color: point.kind === "birth" ? "#facc15" : "#fb7185",
              fillColor: point.kind === "birth" ? "#facc15" : "#fb7185",
              fillOpacity: 0.75,
              weight: 3,
            }}
          >
            <Popup>
              <strong>{point.kind === "birth" ? "Рождение" : "Смерть"}</strong>
              <br />
              {point.label}
            </Popup>
          </CircleMarker>
        ))}
        {points.length === 2 && (
          <Polyline
            positions={[
              [points[0].lat, points[0].lng],
              [points[1].lat, points[1].lng],
            ]}
            pathOptions={{ color: "#d6ad52", weight: 3, dashArray: "8 8" }}
          />
        )}
      </MapContainer>
    </div>
  );
}

async function geocodePlace(value: string, kind: PlacePoint["kind"]) {
  const query = value.trim();

  if (query.length < 3) {
    return null;
  }

  try {
    const params = new URLSearchParams({
      q: query,
      format: "json",
      limit: "1",
      addressdetails: "1",
    });
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`);
    const data = (await response.json()) as Array<{ display_name: string; lat: string; lon: string }>;
    const result = data[0];

    if (!result) {
      return null;
    }

    return {
      label: result.display_name,
      lat: Number(result.lat),
      lng: Number(result.lon),
      kind,
    };
  } catch {
    return null;
  }
}

function formatDisplayDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);

  return [day, month, year].filter(Boolean).join(".");
}

function displayDateToIso(value: string) {
  if (!value) {
    return undefined;
  }

  const [day, month, year] = value.split(".");

  if (!day || !month || !year || year.length !== 4) {
    return undefined;
  }

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

const inputStyle = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  padding: "15px",
  color: "white",
  fontSize: "16px",
};

const navButtonStyle = {
  width: "46px",
  height: "42px",
  borderRadius: "12px",
  border: "1px solid rgba(255,215,0,0.45)",
  background: "rgba(255,215,0,0.12)",
  color: "#fde68a",
  fontSize: "24px",
  fontWeight: 800,
  cursor: "pointer",
};

const secondaryNavButtonStyle = {
  minHeight: "42px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  padding: "0 16px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
};
