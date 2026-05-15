"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function login() {
    setMessage("");
    setIsLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setMessage("Неверный email или пароль");
      return;
    }

    window.location.href = "/add-person";
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
          boxShadow: "0 0 40px rgba(250,204,21,0.18)",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: 44,
            marginBottom: 28,
            textAlign: "center",
          }}
        >
          Вход
        </h1>

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
          onClick={login}
          disabled={isLoading}
          style={{
            width: "100%",
            padding: 18,
            background: "#facc15",
            color: "#000",
            border: "none",
            borderRadius: 14,
            fontWeight: "bold",
            cursor: isLoading ? "default" : "pointer",
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? "Входим..." : "Войти"}
        </button>

        <Link
          href="/register"
          style={{
            display: "block",
            marginTop: 16,
            padding: 16,
            border: "1px solid rgba(250,204,21,0.45)",
            borderRadius: 14,
            color: "#facc15",
            textAlign: "center",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Создать аккаунт
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
  fontSize: 16,
};
