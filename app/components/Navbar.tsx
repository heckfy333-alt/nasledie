"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        background: "#111827",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #1f2937",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link
          href="/dashboard"
          style={{
            color: "#facc15",
            fontSize: "24px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          НАСЛЕДИЕ
        </Link>

        <Link href="/tree" style={{ color: "white" }}>
          Древо
        </Link>

        <Link href="/map" style={{ color: "white" }}>
          Карта
        </Link>

        <Link href="/people" style={{ color: "white" }}>
          Люди
        </Link>

        <Link href="/gallery" style={{ color: "white" }}>
          Галерея
        </Link>
      </div>

      <button
        onClick={() => signOut()}
        style={{
          background: "#dc2626",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Выйти
      </button>
    </nav>
  );
}