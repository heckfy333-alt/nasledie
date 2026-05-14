"use client";

import Link from "next/link";
import QRCode from "react-qr-code";

export default function QRMemoryPage() {
  const profileUrl =
    "http://localhost:3000/person/1";

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
          maxWidth: "900px",
          margin: "0 auto",
          padding: "70px 30px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            color: "#ffe600",
            marginBottom: "30px",
          }}
        >
          QR Мемориал
        </h1>

        <div
          style={{
            fontSize: "24px",
            opacity: 0.8,
            lineHeight: "1.7",
            marginBottom: "50px",
          }}
        >
          Отсканируйте QR-код
          чтобы открыть страницу
          памяти человека.
        </div>

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "30px",
            display: "inline-block",
            marginBottom: "40px",
          }}
        >
          <QRCode
            value={profileUrl}
            size={320}
          />
        </div>

        <div
          style={{
            fontSize: "20px",
            color: "#93c5fd",
            marginBottom: "40px",
          }}
        >
          {profileUrl}
        </div>

        <button
          onClick={() =>
            window.print()
          }
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
          Печать QR
        </button>
      </div>
    </div>
  );
}