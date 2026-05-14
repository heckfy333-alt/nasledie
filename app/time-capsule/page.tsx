"use client";

import { useState } from "react";
import Link from "next/link";

export default function TimeCapsulePage() {
  const [message,
  setMessage] =
    useState("");

  const [date,
  setDate] =
    useState("");

  const [saved,
  setSaved] =
    useState(false);

  function saveCapsule() {
    if (!message || !date)
      return;

    setSaved(true);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1a1f4d 0%, #050816 60%)",
        color: "white",
      }}
    >
      <div
        style={{
          padding: "30px 50px",
          borderBottom:
            "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#ffe600",
            textDecoration: "none",
            fontSize: "42px",
            fontWeight: "bold",
          }}
        >
          НАСЛЕДИЕ
        </Link>
      </div>

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "70px 30px",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            color: "#ffe600",
            marginBottom: "30px",
          }}
        >
          Капсула времени
        </h1>

        <div
          style={{
            fontSize: "24px",
            opacity: 0.8,
            lineHeight: "1.7",
            marginBottom: "50px",
          }}
        >
          Оставьте сообщение будущим
          поколениям семьи.
        </div>

        <div
          style={{
            background:
              "rgba(255,255,255,0.05)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "30px",
            padding: "40px",
          }}
        >
          <textarea
            placeholder="Ваше послание..."
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            style={{
              width: "100%",
              minHeight: "240px",
              borderRadius: "24px",
              border: "none",
              padding: "24px",
              fontSize: "20px",
              resize: "none",
              background:
                "rgba(255,255,255,0.08)",
              color: "white",
              marginBottom: "30px",
            }}
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "20px",
              borderRadius: "20px",
              border: "none",
              background:
                "rgba(255,255,255,0.08)",
              color: "white",
              fontSize: "20px",
              marginBottom: "30px",
            }}
          />

          <button
            onClick={saveCapsule}
            style={{
              background: "#ffe600",
              border: "none",
              padding: "18px 34px",
              borderRadius: "18px",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Сохранить капсулу
          </button>

          {saved && (
            <div
              style={{
                marginTop: "30px",
                padding: "24px",
                borderRadius: "20px",
                background:
                  "rgba(34,197,94,0.15)",
                border:
                  "1px solid rgba(34,197,94,0.3)",
                color: "#86efac",
                fontSize: "20px",
              }}
            >
              Капсула времени
              сохранена до {date}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}