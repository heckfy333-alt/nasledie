"use client";

import { useState } from "react";
import Link from "next/link";

export default function AIBiographyPage() {
  const [name,
  setName] =
    useState("");

  const [birth,
  setBirth] =
    useState("");

  const [facts,
  setFacts] =
    useState("");

  const [bio,
  setBio] =
    useState("");

  function generateBio() {
    const generated = `
${name} родился(ась) ${birth}.

На протяжении жизни
${name} оставил(а)
важный след в истории семьи.

${facts}

Память о ${name}
сохранится для будущих
поколений как часть
семейного наследия.
`;

    setBio(generated);
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
          AI Биография
        </h1>

        <div
          style={{
            background:
              "rgba(255,255,255,0.05)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "30px",
            padding: "40px",
            marginBottom: "40px",
          }}
        >
          <input
            placeholder="Имя человека"
            value={name}
            onChange={(e) =>
              setName(
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
              marginBottom: "20px",
            }}
          />

          <input
            placeholder="Дата рождения"
            value={birth}
            onChange={(e) =>
              setBirth(
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
              marginBottom: "20px",
            }}
          />

          <textarea
            placeholder="Факты о человеке..."
            value={facts}
            onChange={(e) =>
              setFacts(
                e.target.value
              )
            }
            style={{
              width: "100%",
              minHeight: "220px",
              borderRadius: "20px",
              border: "none",
              padding: "20px",
              background:
                "rgba(255,255,255,0.08)",
              color: "white",
              fontSize: "20px",
              resize: "none",
              marginBottom: "20px",
            }}
          />

          <button
            onClick={generateBio}
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
            Сгенерировать
          </button>
        </div>

        {bio && (
          <div
            style={{
              background:
                "rgba(255,255,255,0.05)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              borderRadius: "30px",
              padding: "40px",
              fontSize: "24px",
              lineHeight: "2",
              whiteSpace:
                "pre-line",
            }}
          >
            {bio}
          </div>
        )}
      </div>
    </div>
  );
}