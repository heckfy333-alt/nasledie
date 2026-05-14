"use client";

import Link from "next/link";

const events = [
  {
    year: "1947",
    title: "Рождение",
    description:
      "Родился в деревне Новая Заря",
  },

  {
    year: "1965",
    title: "Армия",
    description:
      "Проходил военную службу",
  },

  {
    year: "1971",
    title: "Свадьба",
    description:
      "Создание семьи",
  },

  {
    year: "1975",
    title: "Рождение сына",
    description:
      "Первый ребенок в семье",
  },

  {
    year: "1988",
    title: "Переезд",
    description:
      "Переезд в город",
  },

  {
    year: "2005",
    title: "Пенсия",
    description:
      "Завершение трудовой деятельности",
  },
];

export default function TimelinePage() {
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
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "70px 30px",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            color: "#ffe600",
            marginBottom: "70px",
          }}
        >
          Линия жизни
        </h1>

        <div
          style={{
            position: "relative",
            marginLeft: "30px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "18px",
              top: 0,
              bottom: 0,
              width: "4px",
              background:
                "rgba(255,230,0,0.4)",
            }}
          />

          {events.map(
            (event, index) => (
              <div
                key={index}
                style={{
                  position:
                    "relative",
                  marginBottom:
                    "60px",
                  paddingLeft:
                    "70px",
                }}
              >
                <div
                  style={{
                    position:
                      "absolute",
                    left: "0",
                    top: "10px",
                    width: "40px",
                    height: "40px",
                    borderRadius:
                      "50%",
                    background:
                      "#ffe600",
                    boxShadow:
                      "0 0 20px rgba(255,230,0,0.6)",
                  }}
                />

                <div
                  style={{
                    background:
                      "rgba(255,255,255,0.05)",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                    borderRadius:
                      "24px",
                    padding:
                      "30px",
                  }}
                >
                  <div
                    style={{
                      color:
                        "#ffe600",
                      fontSize:
                        "28px",
                      fontWeight:
                        "bold",
                      marginBottom:
                        "14px",
                    }}
                  >
                    {event.year}
                  </div>

                  <div
                    style={{
                      fontSize:
                        "32px",
                      marginBottom:
                        "16px",
                    }}
                  >
                    {event.title}
                  </div>

                  <div
                    style={{
                      opacity: 0.8,
                      lineHeight:
                        "1.7",
                      fontSize:
                        "20px",
                    }}
                  >
                    {
                      event.description
                    }
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}