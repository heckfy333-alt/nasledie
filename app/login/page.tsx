"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const login =
    async () => {
      const res = await fetch(
        "/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await res.json();

      if (data.error) {
        setMessage(data.error);

        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setMessage(
        "Вход выполнен 🔥"
      );

      window.location.href =
        "/tree";
    };

  return (
    <div
      style={{
        minHeight: "100vh",

        display: "flex",

        justifyContent:
          "center",

        alignItems: "center",

        background:
          "radial-gradient(circle at center, #0f172a 0%, #020617 100%)",
      }}
    >
      <div
        style={{
          width: 450,

          background:
            "linear-gradient(to bottom, #111827, #030712)",

          border:
            "2px solid #facc15",

          borderRadius: 35,

          padding: 40,
        }}
      >
        <h1
          style={{
            color: "white",

            fontSize: 48,

            marginBottom: 30,

            textAlign: "center",
          }}
        >
          Вход
        </h1>

        <input
          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          style={{
            width: "100%",

            padding: 16,

            marginBottom: 15,

            borderRadius: 12,

            border: "none",
          }}
        />

        <input
          type="password"

          placeholder="Пароль"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          style={{
            width: "100%",

            padding: 16,

            marginBottom: 25,

            borderRadius: 12,

            border: "none",
          }}
        />

        <button
          onClick={login}

          style={{
            width: "100%",

            padding: 18,

            background:
              "#facc15",

            color: "#000",

            border: "none",

            borderRadius: 14,

            fontWeight:
              "bold",

            cursor:
              "pointer",
          }}
        >
          Войти
        </button>

        {message && (
          <div
            style={{
              color: "white",

              marginTop: 20,

              textAlign:
                "center",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}