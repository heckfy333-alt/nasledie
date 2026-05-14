"use client";

import { useState } from "react";
import Link from "next/link";

export default function FamilyAccessPage() {
  const [privateMode,
  setPrivateMode] =
    useState(true);

  const [inviteEmail,
  setInviteEmail] =
    useState("");

  const [members,
  setMembers] =
    useState([
      "family@gmail.com",
      "grandpa@mail.ru",
    ]);

  function inviteMember() {
    if (!inviteEmail)
      return;

    setMembers([
      ...members,
      inviteEmail,
    ]);

    setInviteEmail("");
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
            marginBottom: "40px",
          }}
        >
          Доступ к архиву
        </h1>

        {/* PRIVATE MODE */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.05)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "30px",
            padding: "35px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "30px",
                  marginBottom: "10px",
                }}
              >
                Приватный режим
              </div>

              <div
                style={{
                  opacity: 0.8,
                  lineHeight: "1.7",
                }}
              >
                Только приглашенные
                родственники смогут
                просматривать архив
              </div>
            </div>

            <button
              onClick={() =>
                setPrivateMode(
                  !privateMode
                )
              }
              style={{
                background:
                  privateMode
                    ? "#22c55e"
                    : "#ef4444",

                border: "none",

                padding:
                  "16px 26px",

                borderRadius:
                  "16px",

                color: "white",

                fontWeight:
                  "bold",

                cursor:
                  "pointer",
              }}
            >
              {privateMode
                ? "ВКЛ"
                : "ВЫКЛ"}
            </button>
          </div>
        </div>

        {/* INVITE */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.05)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "30px",
            padding: "35px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              color: "#ffe600",
              marginBottom: "24px",
            }}
          >
            Пригласить родственника
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
            }}
          >
            <input
              type="email"
              placeholder="Введите email..."
              value={inviteEmail}
              onChange={(e) =>
                setInviteEmail(
                  e.target.value
                )
              }
              style={{
                flex: 1,
                padding: "18px",
                borderRadius: "18px",
                border: "none",
                background:
                  "rgba(255,255,255,0.08)",
                color: "white",
                fontSize: "18px",
              }}
            />

            <button
              onClick={
                inviteMember
              }
              style={{
                background:
                  "#ffe600",
                border: "none",
                padding:
                  "18px 28px",
                borderRadius:
                  "18px",
                fontWeight:
                  "bold",
                cursor:
                  "pointer",
              }}
            >
              Пригласить
            </button>
          </div>
        </div>

        {/* MEMBERS */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.05)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "30px",
            padding: "35px",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              color: "#ffe600",
              marginBottom: "30px",
            }}
          >
            Участники семьи
          </div>

          <div
            style={{
              display: "flex",
              flexDirection:
                "column",
              gap: "16px",
            }}
          >
            {members.map(
              (
                member,
                index
              ) => (
                <div
                  key={index}
                  style={{
                    background:
                      "rgba(255,255,255,0.06)",
                    padding:
                      "18px 22px",
                    borderRadius:
                      "18px",
                  }}
                >
                  {member}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}