"use client";

import { useState } from "react";

export default function AddGalleryPhotoPage() {
  const [personId, setPersonId] = useState("");
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState<File | null>(
    null
  );

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!photo) {
      alert("Выберите фото");

      return;
    }

    const formData = new FormData();

    formData.append("file", photo);

    const upload = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await upload.json();

    await fetch("/api/gallery", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        image: uploadData.path,

        caption,

        personId,
      }),
    });

    alert("Фото добавлено");

    setPersonId("");

    setCaption("");

    setPhoto(null);
  }

  const inputStyle = {
    background: "#0f172a",

    color: "white",

    border: "1px solid #334155",

    borderRadius: "20px",

    padding: "22px",

    fontSize: "20px",
  };

  return (
    <main
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(180deg,#020617,#0f172a,#111827)",

        padding: "50px",

        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "56px",

          marginBottom: "40px",

          color: "#facc15",
        }}
      >
        Добавить фото в архив
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",

          flexDirection: "column",

          gap: "25px",

          maxWidth: "700px",
        }}
      >
        <input
          placeholder="ID человека"
          value={personId}
          onChange={(e) =>
            setPersonId(e.target.value)
          }
          style={inputStyle}
        />

        <input
          placeholder="Описание фото"
          value={caption}
          onChange={(e) =>
            setCaption(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e: any) =>
            setPhoto(e.target.files[0])
          }
          style={{
            fontSize: "20px",
          }}
        />

        <button
          type="submit"
          style={{
            background: "#facc15",

            color: "black",

            border: "none",

            borderRadius: "20px",

            padding: "24px",

            fontSize: "24px",

            fontWeight: "bold",

            cursor: "pointer",
          }}
        >
          Сохранить фото
        </button>
      </form>
    </main>
  );
}