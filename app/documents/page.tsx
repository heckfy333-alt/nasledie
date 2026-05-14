"use client";

import Link from "next/link";

const documents = [
  {
    id: 1,
    title: "Свидетельство о рождении",
    description:
      "Архивный документ семьи",
    date: "1947",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  },

  {
    id: 2,
    title: "Военный билет",
    description:
      "Служба в армии",
    date: "1968",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
  },

  {
    id: 3,
    title: "Семейное письмо",
    description:
      "Письмо родственникам",
    date: "1981",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
  },
];

export default function DocumentsPage() {
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

        <div
          style={{
            display: "flex",
            gap: "15px",
          }}
        >
          {[
            ["Главная", "/"],
            ["Люди", "/people"],
            ["Древо", "/tree"],
            ["Карта", "/map"],
            ["Таймлайн", "/timeline"],
            ["Галерея", "/gallery"],
            ["Документы", "/documents"],
          ].map(([title, href]) => (
            <Link
              key={href}
              href={href}
              style={{
                color: "white",
                textDecoration:
                  "none",
                padding: "10px 18px",
                borderRadius: "14px",
                background:
                  "rgba(255,255,255,0.08)",
                border:
                  "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {title}
            </Link>
          ))}
        </div>
      </div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "50px 30px",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            color: "#ffe600",
            marginBottom: "50px",
          }}
        >
          Семейный архив
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(320px,1fr))",
            gap: "30px",
          }}
        >
          {documents.map((doc) => (
            <div
              key={doc.id}
              style={{
                background:
                  "rgba(255,255,255,0.05)",
                borderRadius: "28px",
                overflow: "hidden",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                transition:
                  "0.3s",
              }}
            >
              <img
                src={doc.image}
                alt={doc.title}
                style={{
                  width: "100%",
                  height: "260px",
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    color: "#ffe600",
                    fontSize: "28px",
                    fontWeight: "bold",
                    marginBottom: "14px",
                  }}
                >
                  {doc.title}
                </div>

                <div
                  style={{
                    opacity: 0.8,
                    lineHeight: "1.7",
                    marginBottom: "20px",
                  }}
                >
                  {doc.description}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      color: "#aaa",
                    }}
                  >
                    {doc.date}
                  </div>

                  <button
                    style={{
                      background:
                        "#ffe600",
                      border: "none",
                      padding:
                        "10px 18px",
                      borderRadius:
                        "12px",
                      fontWeight:
                        "bold",
                      cursor: "pointer",
                    }}
                  >
                    Открыть
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}