"use client";

import { useState }
from "react";

export default function AddEventPage() {
  const [title,
  setTitle] =
    useState("");

  const [description,
  setDescription] =
    useState("");

  const [eventDate,
  setEventDate] =
    useState("");

  const [success,
  setSuccess] =
    useState(false);

  async function createEvent() {
    await fetch(
      "/api/events",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          title,

          description,

          eventDate,

          personId: 1,
        }),
      }
    );

    setSuccess(true);

    setTitle("");

    setDescription("");

    setEventDate("");
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
        Добавить событие
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
          placeholder="Название события"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <textarea
          placeholder="Описание"
          value={
            description
          }
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          style={{
            ...inputStyle,

            height:
              "180px",
          }}
        />

        <input
          placeholder="Дата события"
          value={
            eventDate
          }
          onChange={(e) =>
            setEventDate(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button
          onClick={
            createEvent
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
            Событие создано
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