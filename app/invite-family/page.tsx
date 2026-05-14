"use client";

import { useState } from "react";
import Link from "next/link";

export default function InviteFamilyPage() {
  const [email,
  setEmail] =
    useState("");

  const [inviteLink,
  setInviteLink] =
    useState("");

  function createInvite() {
    if (!email) return;

    const random =
      Math.random()
        .toString(36)
        .substring(2, 10);

    setInviteLink(
      `http://localhost:3000/register?invite=${random}`
    );
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
          maxWidth: "900px",
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
          Приглашение семьи
        </h1>

        <div
          style={{
            fontSize: "24px",
            opacity: 0.8,
            lineHeight: "1.7",
            marginBottom: "50px",
          }}
        >
          Пригласите родственников
          в семейное древо.
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
          <input
            placeholder="Email родственника"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "22px",
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
            onClick={createInvite}
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
            Создать приглашение
          </button>

          {inviteLink && (
            <div
              style={{
                marginTop: "40px",
                background:
                  "rgba(255,255,255,0.06)",
                padding: "25px",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  opacity: 0.7,
                  marginBottom: "12px",
                }}
              >
                Ссылка приглашение:
              </div>

              <div
                style={{
                  color: "#93c5fd",
                  fontSize: "18px",
                  wordBreak:
                    "break-all",
                }}
              >
                {inviteLink}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}