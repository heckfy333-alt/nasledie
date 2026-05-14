"use client";

import { useState }
from "react";

export default function InvitePage() {
  const [link,
  setLink] =
    useState("");

  function createInvite() {
    const code =
      Math.random()
        .toString(36)
        .substring(2, 10);

    const invite =
      `${window.location.origin}/join/${code}`;

    setLink(invite);
  }

  async function copyLink() {
    if (!link) return;

    await navigator.clipboard.writeText(
      link
    );

    alert(
      "Ссылка скопирована"
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(180deg,#020617,#000)",

        display: "flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",

          maxWidth: "700px",

          background:
            "rgba(255,255,255,0.05)",

          border:
            "1px solid rgba(255,255,255,0.08)",

          borderRadius:
            "30px",

          padding: "50px",

          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "58px",

            color: "#facc15",

            marginBottom:
              "20px",
          }}
        >
          Приглашение
        </h1>

        <p
          style={{
            color: "#cbd5e1",

            fontSize: "22px",

            marginBottom:
              "40px",
          }}
        >
          Создайте ссылку
          для родственников
        </p>

        <button
          onClick={
            createInvite
          }
          style={{
            width: "100%",

            padding:
              "20px",

            borderRadius:
              "18px",

            border: "none",

            background:
              "#facc15",

            color: "#000",

            fontSize: "22px",

            fontWeight:
              "bold",

            cursor:
              "pointer",

            marginBottom:
              "30px",
          }}
        >
          Создать ссылку
        </button>

        {link && (
          <>
            <div
              style={{
                background:
                  "#0f172a",

                borderRadius:
                  "16px",

                padding:
                  "20px",

                wordBreak:
                  "break-all",

                marginBottom:
                  "20px",

                color:
                  "#93c5fd",
              }}
            >
              {link}
            </div>

            <button
              onClick={
                copyLink
              }
              style={{
                width:
                  "100%",

                padding:
                  "18px",

                borderRadius:
                  "16px",

                border:
                  "1px solid rgba(255,255,255,0.1)",

                background:
                  "transparent",

                color:
                  "white",

                fontSize:
                  "20px",

                cursor:
                  "pointer",
              }}
            >
              Копировать
            </button>
          </>
        )}
      </div>
    </main>
  );
}