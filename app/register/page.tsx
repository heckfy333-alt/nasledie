"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function register() {
    setMessage("");
    setIsLoading(true);

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
    setIsLoading(false);

    if (data.error) {
      setMessage(data.error);
      return;
    }

    setMessage("Аккаунт создан. Сейчас откроется вход.");
    window.setTimeout(() => {
      window.location.href = "/login";
    }, 700);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at center, #0f172a 0%, #020617 100%)",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 450,
          background: "linear-gradient(to bottom, #111827, #030712)",
          border: "2px solid #facc15",
          borderRadius: 28,
          padding: 40,
          boxShadow: "0 0 40px rgba(250,204,21,0.25)",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: 42,
            marginBottom: 28,
            textAlign: "center",
          }}
        >
          Регистрация
        </h1>

        <input
          placeholder="Имя"
          value={name}
          onChange={(event) => setName(event.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={inputStyle}
        />

        <button
          onClick={register}
          disabled={isLoading}
          style={{
            width: "100%",
            padding: 18,
            background: "#facc15",
            color: "#000",
            border: "none",
            borderRadius: 14,
            fontWeight: "bold",
            fontSize: 18,
            cursor: isLoading ? "default" : "pointer",
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? "Создаем..." : "Создать аккаунт"}
        </button>

        <Link
          href="/login"
          style={{
            display: "block",
            marginTop: 16,
            color: "#facc15",
            textAlign: "center",
            textDecoration: "none",
          }}
        >
          Уже есть аккаунт? Войти
        </Link>

        {message && (
          <div
            style={{
              color: "white",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 16,
  marginBottom: 15,
  borderRadius: 12,
  border: "none",
  fontSize: 18,
};
