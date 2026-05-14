"use client";

import { useState }
from "react";

export default function AddVoicePage() {
  const [title,
  setTitle] =
    useState("");

  const [audioUrl,
  setAudioUrl] =
    useState("");

  const [success,
  setSuccess] =
    useState(false);

  async function saveVoice() {
    await fetch(
      "/api/voice-memories",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          title,

          audioUrl,

          personId: 1,
        }),
      }
    );

    setSuccess(true);

    setTitle("");

    setAudioUrl("");
  }

  return (
    <div
      style={{
        maxWidth:
          "800px",

        margin:
          "0 auto",

        padding:
          "80px 40px",
      }}
    >
      <h1
        style={{
          fontSize:
            "64px",

          color:
            "#ffe600",

          marginBottom:
            "50px",
        }}
      >
        Голос памяти
      </h1>

      <div
        style={{
          display:
            "flex",

          flexDirection:
            "column",

          gap: "24px",
        }}
      >
        <input
          placeholder="Название записи"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          placeholder="Ссылка на mp3"
          value={audioUrl}
          onChange={(e) =>
            setAudioUrl(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button
          onClick={
            saveVoice
          }
          style={{
            background:
              "#ffe600",

            border:
              "none",

            padding:
              "22px",

            borderRadius:
              "18px",

            fontWeight:
              "bold",

            fontSize:
              "22px",

            cursor:
              "pointer",
          }}
        >
          Сохранить
        </button>

        {success && (
          <div
            style={{
              color:
                "#22c55e",

              fontSize:
                "22px",
            }}
          >
            Аудио сохранено
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  background:
    "rgba(255,255,255,0.06)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  borderRadius:
    "18px",

  padding: "20px",

  color: "white",

  fontSize: "20px",
};