"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const register =
    async () => {
      const res = await fetch(
        "/api/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
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

      setMessage(
        "Аккаунт создан 🔥"
      );

      setName("");
      setEmail("");
      setPassword("");
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

          boxShadow:
            "0 0 40px rgba(250,204,21,0.25)",
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
          Регистрация
        </h1>

        <input
          placeholder="Имя"

          value={name}

          onChange={(e) =>
            setName(
              e.target.value
            )
          }

          style={{
            width: "100%",

            padding: 16,

            marginBottom: 15,

            borderRadius: 12,

            border: "none",

            fontSize: 18,
          }}
        />

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

            fontSize: 18,
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

            fontSize: 18,
          }}
        />

        <button
          onClick={register}

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

            fontSize: 18,

            cursor:
              "pointer",
          }}
        >
          Создать аккаунт
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