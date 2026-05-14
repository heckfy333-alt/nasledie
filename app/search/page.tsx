"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

export default function SearchPage() {
  const [people,
  setPeople] =
    useState<any[]>([]);

  const [query,
  setQuery] =
    useState("");

  useEffect(() => {
    loadPeople();
  }, []);

  async function loadPeople() {
    try {
      const res = await fetch(
        "/api/people"
      );

      const data =
        await res.json();

      setPeople(data);
    } catch (error) {
      console.log(error);
    }
  }

  const filtered =
    people.filter(
      (person) =>
        person.name
          ?.toLowerCase()
          .includes(
            query.toLowerCase()
          )
    );

  return (
    <main
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(180deg,#020617,#000)",

        padding:
          "40px 20px",

        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",

          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "72px",

            color: "#facc15",

            marginBottom:
              "40px",
          }}
        >
          Поиск по роду
        </h1>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Введите имя..."
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
          style={{
            width: "100%",

            padding:
              "22px",

            borderRadius:
              "22px",

            border:
              "1px solid rgba(255,255,255,0.08)",

            background:
              "rgba(255,255,255,0.05)",

            color: "white",

            fontSize: "22px",

            outline: "none",

            marginBottom:
              "50px",
          }}
        />

        {/* RESULTS */}

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",

            gap: "30px",
          }}
        >
          {filtered.map(
            (person) => (
              <Link
                href={`/person/${person.id}`}
                key={person.id}
                style={{
                  textDecoration:
                    "none",
                }}
              >
                <div
                  style={{
                    background:
                      "rgba(255,255,255,0.05)",

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    borderRadius:
                      "28px",

                    overflow:
                      "hidden",

                    transition:
                      "0.25s",
                  }}
                >
                  {person.photo && (
                    <img
                      src={
                        person.photo
                      }
                      style={{
                        width:
                          "100%",

                        height:
                          "280px",

                        objectFit:
                          "cover",
                      }}
                    />
                  )}

                  <div
                    style={{
                      padding:
                        "24px",
                    }}
                  >
                    <div
                      style={{
                        color:
                          "#facc15",

                        fontSize:
                          "32px",

                        fontWeight:
                          "bold",

                        marginBottom:
                          "14px",
                      }}
                    >
                      {
                        person.name
                      }
                    </div>

                    <div
                      style={{
                        color:
                          "#cbd5e1",

                        fontSize:
                          "18px",

                        lineHeight:
                          1.6,
                      }}
                    >
                      {person.bio
                        ?.slice(
                          0,
                          120
                        ) ||
                        "Нет биографии"}
                      ...
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>

        {/* EMPTY */}

        {filtered.length ===
          0 && (
          <div
            style={{
              marginTop:
                "50px",

              color:
                "#94a3b8",

              fontSize:
                "24px",

              textAlign:
                "center",
            }}
          >
            Никого не найдено
          </div>
        )}
      </div>
    </main>
  );
}