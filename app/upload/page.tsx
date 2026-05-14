"use client";

import { useState }
from "react";

export default function UploadPage() {
  const [image,
  setImage] =
    useState("");

  const [loading,
  setLoading] =
    useState(false);

  async function uploadFile(
    e: any
  ) {
    const file =
      e.target.files[0];

    if (!file) return;

    setLoading(true);

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const res =
      await fetch(
        "/api/upload",
        {
          method: "POST",

          body:
            formData,
        }
      );

    const data =
      await res.json();

    setImage(data.url);

    setLoading(false);
  }

  return (
    <div
      style={{
        padding: "80px",
      }}
    >
      <h1
        style={{
          fontSize: "64px",

          color: "#ffe600",

          marginBottom:
            "40px",
        }}
      >
        Загрузка фото
      </h1>

      <input
        type="file"
        onChange={
          uploadFile
        }
      />

      {loading && (
        <div
          style={{
            marginTop:
              "20px",
          }}
        >
          Загрузка...
        </div>
      )}

      {image && (
        <div
          style={{
            marginTop:
              "40px",
          }}
        >
          <img
            src={image}
            style={{
              width:
                "500px",

              borderRadius:
                "30px",
            }}
          />

          <div
            style={{
              marginTop:
                "20px",

              color:
                "#93c5fd",
            }}
          >
            {image}
          </div>
        </div>
      )}
    </div>
  );
}