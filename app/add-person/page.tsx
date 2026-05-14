"use client";

import { useState } from "react";

export default function AddPersonPage() {
  const [name, setName] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");

  async function createPerson() {
    const response = await fetch("/api/people", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        birthPlace,
        bio,
        photo,
      }),
    });

    if (response.ok) {
      alert("Человек добавлен");

      setName("");
      setBirthPlace("");
      setBio("");
      setPhoto("");
    } else {
      alert("Ошибка");
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
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "500px",
        }}
      >
        <input
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Место рождения"
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Биография"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          style={{
            ...inputStyle,
            height: "120px",
          }}
        />

        <input
          placeholder="Ссылка на фото"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={createPerson}
          style={{
            background: "#ffd700",
            color: "black",
            border: "none",
            padding: "15px",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  padding: "15px",
  color: "white",
};