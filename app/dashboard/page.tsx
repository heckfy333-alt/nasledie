"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] =
    useState<any>(null);

  const [persons, setPersons] =
    useState<any[]>([]);

  const [events, setEvents] =
    useState<any[]>([]);

  const [comments, setComments] =
    useState<any[]>([]);

  useEffect(() => {
    const stored =
      localStorage.getItem("user");

    if (stored) {
      setUser(JSON.parse(stored));
    }

    loadData();
  }, []);

  const loadData =
    async () => {
      const personsRes =
        await fetch("/api/persons");

      const personsData =
        await personsRes.json();

      setPersons(personsData);

      const eventsRes =
        await fetch("/api/events");

      const eventsData =
        await eventsRes.json();

      setEvents(eventsData);

      const commentsRes =
        await fetch("/api/comments");

      const commentsData =
        await commentsRes.json();

      setComments(commentsData);
    };

  return (
    <div
      style={{
        minHeight: "100vh",

        background:
          "radial-gradient(circle at center, #0f172a 0%, #020617 100%)",

        color: "white",

        padding: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1400,

          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            marginBottom: 40,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 56,

                marginBottom: 10,
              }}
            >
              Dashboard
            </h1>

            <div
              style={{
                color:
                  "#94a3b8",

                fontSize: 20,
              }}
            >
              Добро пожаловать,{" "}
              {user?.name || "Гость"}
            </div>
          </div>

          <a
            href="/tree"

            style={{
              background:
                "#facc15",

              color: "#000",

              padding:
                "16px 28px",

              borderRadius: 14,

              textDecoration:
                "none",

              fontWeight:
                "bold",
            }}
          >
            Открыть древо
          </a>
        </div>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",

            gap: 25,

            marginBottom: 50,
          }}
        >
          <div
            style={{
              background:
                "#111827",

              border:
                "1px solid #334155",

              borderRadius: 30,

              padding: 30,
            }}
          >
            <div
              style={{
                color:
                  "#94a3b8",

                marginBottom: 10,
              }}
            >
              Людей в древе
            </div>

            <div
              style={{
                fontSize: 52,

                fontWeight:
                  "bold",

                color:
                  "#facc15",
              }}
            >
              {persons.length}
            </div>
          </div>

          <div
            style={{
              background:
                "#111827",

              border:
                "1px solid #334155",

              borderRadius: 30,

              padding: 30,
            }}
          >
            <div
              style={{
                color:
                  "#94a3b8",

                marginBottom: 10,
              }}
            >
              Событий жизни
            </div>

            <div
              style={{
                fontSize: 52,

                fontWeight:
                  "bold",

                color:
                  "#38bdf8",
              }}
            >
              {events.length}
            </div>
          </div>

          <div
            style={{
              background:
                "#111827",

              border:
                "1px solid #334155",

              borderRadius: 30,

              padding: 30,
            }}
          >
            <div
              style={{
                color:
                  "#94a3b8",

                marginBottom: 10,
              }}
            >
              Воспоминаний
            </div>

            <div
              style={{
                fontSize: 52,

                fontWeight:
                  "bold",

                color:
                  "#4ade80",
              }}
            >
              {comments.length}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "2fr 1fr",

            gap: 30,
          }}
        >
          <div
            style={{
              background:
                "#111827",

              border:
                "1px solid #334155",

              borderRadius: 30,

              padding: 30,
            }}
          >
            <h2
              style={{
                fontSize: 32,

                marginBottom: 30,

                color:
                  "#facc15",
              }}
            >
              Последние люди
            </h2>

            <div
              style={{
                display: "flex",

                flexDirection:
                  "column",

                gap: 20,
              }}
            >
              {persons
                .slice(-5)
                .reverse()
                .map((person) => (
                  <a
                    key={person.id}

                    href={`/person/${person.id}`}

                    style={{
                      display:
                        "flex",

                      gap: 20,

                      alignItems:
                        "center",

                      background:
                        "#0f172a",

                      padding: 20,

                      borderRadius: 20,

                      textDecoration:
                        "none",

                      color:
                        "white",
                    }}
                  >
                    <img
                      src={
                        person.image
                      }

                      style={{
                        width: 70,

                        height: 70,

                        borderRadius: 18,

                        objectFit:
                          "cover",
                      }}
                    />

                    <div>
                      <div
                        style={{
                          fontSize: 24,

                          fontWeight:
                            "bold",
                        }}
                      >
                        {
                          person.name
                        }
                      </div>

                      <div
                        style={{
                          color:
                            "#94a3b8",
                        }}
                      >
                        {
                          person.role
                        }
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",

              flexDirection:
                "column",

              gap: 25,
            }}
          >
            <a
              href="/tree"

              style={{
                background:
                  "#111827",

                border:
                  "1px solid #334155",

                borderRadius: 30,

                padding: 30,

                textDecoration:
                  "none",

                color: "white",
              }}
            >
              <div
                style={{
                  fontSize: 30,

                  marginBottom: 10,
                }}
              >
                🌳
              </div>

              <div
                style={{
                  fontSize: 24,

                  fontWeight:
                    "bold",

                  marginBottom: 10,
                }}
              >
                Семейное древо
              </div>

              <div
                style={{
                  color:
                    "#94a3b8",
                }}
              >
                Управление
                поколениями семьи
              </div>
            </a>

            <a
              href="/register"

              style={{
                background:
                  "#111827",

                border:
                  "1px solid #334155",

                borderRadius: 30,

                padding: 30,

                textDecoration:
                  "none",

                color: "white",
              }}
            >
              <div
                style={{
                  fontSize: 30,

                  marginBottom: 10,
                }}
              >
                👥
              </div>

              <div
                style={{
                  fontSize: 24,

                  fontWeight:
                    "bold",

                  marginBottom: 10,
                }}
              >
                Семейный доступ
              </div>

              <div
                style={{
                  color:
                    "#94a3b8",
                }}
              >
                Приглашение
                родственников
              </div>
            </a>

            <a
              href="/login"

              style={{
                background:
                  "#111827",

                border:
                  "1px solid #334155",

                borderRadius: 30,

                padding: 30,

                textDecoration:
                  "none",

                color: "white",
              }}
            >
              <div
                style={{
                  fontSize: 30,

                  marginBottom: 10,
                }}
              >
                🔐
              </div>

              <div
                style={{
                  fontSize: 24,

                  fontWeight:
                    "bold",

                  marginBottom: 10,
                }}
              >
                Безопасность
              </div>

              <div
                style={{
                  color:
                    "#94a3b8",
                }}
              >
                Управление
                аккаунтом
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}