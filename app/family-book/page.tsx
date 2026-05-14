"use client";

import Link from "next/link";

const people = [
  {
    id: 1,
    name: "Александр Петров",
    years: "1947 — 2021",
    bio:
      "Инженер, отец и хранитель семейных традиций.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },

  {
    id: 2,
    name: "Мария Петрова",
    years: "1950 — 2018",
    bio:
      "Любимая мама и бабушка семьи.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
];

export default function FamilyBookPage() {
  function exportPDF() {
    window.print();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#111827,#000)",
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

        <button
          onClick={exportPDF}
          style={{
            background: "#ffe600",
            border: "none",
            padding: "16px 28px",
            borderRadius: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Экспорт PDF
        </button>
      </div>

      {/* COVER */}

      <div
        style={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            fontSize: "92px",
            color: "#ffe600",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          КНИГА РОДА
        </div>

        <div
          style={{
            fontSize: "32px",
            opacity: 0.8,
          }}
        >
          История поколений семьи
        </div>
      </div>

      {/* PEOPLE */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "50px 30px 100px",
        }}
      >
        {people.map(
          (person) => (
            <div
              key={person.id}
              style={{
                marginBottom: "80px",
                background:
                  "rgba(255,255,255,0.04)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                borderRadius: "32px",
                overflow: "hidden",
              }}
            >
              <img
                src={person.image}
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  padding: "40px",
                }}
              >
                <div
                  style={{
                    fontSize: "54px",
                    color: "#ffe600",
                    marginBottom: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {person.name}
                </div>

                <div
                  style={{
                    fontSize: "24px",
                    opacity: 0.8,
                    marginBottom: "30px",
                  }}
                >
                  {person.years}
                </div>

                <div
                  style={{
                    fontSize: "24px",
                    lineHeight: "1.9",
                  }}
                >
                  {person.bio}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}