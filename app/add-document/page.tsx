"use client";

import { useState }
from "react";

export default function AddDocumentPage() {
  const [title,
  setTitle] =
    useState("");

  const [fileUrl,
  setFileUrl] =
    useState("");

  const [success,
  setSuccess] =
    useState(false);

  async function saveDocument() {
    await fetch(
      "/api/documents",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          title,

          fileUrl,

          personId: 1,
        }),
      }
    );

    setSuccess(true);

    setTitle("");

    setFileUrl("");
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
        Добавить документ
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
          placeholder="Название документа"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          placeholder="Ссылка на файл"
          value={fileUrl}
          onChange={(e) =>
            setFileUrl(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button
          onClick={
            saveDocument
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
            Документ добавлен
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