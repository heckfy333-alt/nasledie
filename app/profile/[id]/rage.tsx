async function getPerson(id: string) {
  const res = await fetch(
    "http://localhost:3000/api/person/" +
      id,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function PersonPage({
  params,
}: any) {
  const person =
    await getPerson(params.id);

  return (
    <main
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(180deg,#020617,#000000)",

        color: "white",

        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",

          margin: "0 auto",
        }}
      >
        {/* HERO */}

        <div
          style={{
            display: "flex",

            gap: "50px",

            flexWrap: "wrap",

            marginBottom: "60px",
          }}
        >
          {/* PHOTO */}

          <div>
            {person.photo ? (
              <img
                src={person.photo}
                style={{
                  width: "320px",

                  height: "420px",

                  objectFit:
                    "cover",

                  borderRadius:
                    "30px",

                  border:
                    "2px solid rgba(255,255,255,0.1)",
                }}
              />
            ) : (
              <div
                style={{
                  width: "320px",

                  height: "420px",

                  borderRadius:
                    "30px",

                  background:
                    "#111827",
                }}
              />
            )}
          </div>

          {/* INFO */}

          <div
            style={{
              flex: 1,
            }}
          >
            <h1
              style={{
                fontSize: "72px",

                color: "#facc15",

                marginBottom: "20px",
              }}
            >
              {person.name}
            </h1>

            <div
              style={{
                display: "flex",

                flexDirection:
                  "column",

                gap: "18px",

                fontSize: "22px",

                color: "#cbd5e1",

                marginBottom:
                  "35px",
              }}
            >
              <div>
                🌍 Рождение:{" "}
                {
                  person.birthPlace
                }
              </div>

              <div>
                ⚰️ Смерть:{" "}
                {
                  person.deathPlace
                }
              </div>

              {person.family && (
                <div>
                  👨‍👩‍👧 Семья:{" "}
                  {
                    person.family
                      .surname
                  }
                </div>
              )}
            </div>

            <div
              style={{
                background:
                  "rgba(255,255,255,0.04)",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                borderRadius:
                  "24px",

                padding: "30px",

                lineHeight: 1.9,

                color: "#d1d5db",

                fontSize: "18px",
              }}
            >
              {person.bio}
            </div>
          </div>
        </div>

        {/* EVENTS */}

        <section
          style={{
            marginBottom: "70px",
          }}
        >
          <h2
            style={{
              fontSize: "48px",

              color: "#facc15",

              marginBottom: "35px",
            }}
          >
            События жизни
          </h2>

          <div
            style={{
              display: "flex",

              flexDirection:
                "column",

              gap: "25px",
            }}
          >
            {person.events.map(
              (event: any) => (
                <div
                  key={event.id}
                  style={{
                    background:
                      "rgba(255,255,255,0.04)",

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    borderRadius:
                      "24px",

                    padding:
                      "25px",
                  }}
                >
                  <h3
                    style={{
                      color:
                        "#facc15",

                      fontSize:
                        "30px",

                      marginBottom:
                        "12px",
                    }}
                  >
                    {event.title}
                  </h3>

                  <div
                    style={{
                      color:
                        "#94a3b8",

                      marginBottom:
                        "12px",
                    }}
                  >
                    {event.date}
                  </div>

                  <p
                    style={{
                      lineHeight:
                        1.8,

                      color:
                        "#d1d5db",
                    }}
                  >
                    {
                      event.description
                    }
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* MEMORY */}

        <section>
          <h2
            style={{
              fontSize: "48px",

              color: "#facc15",

              marginBottom: "35px",
            }}
          >
            Архив памяти
          </h2>

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fill,minmax(280px,1fr))",

              gap: "25px",
            }}
          >
            {person.memories.map(
              (memory: any) => (
                <div
                  key={memory.id}
                  style={{
                    background:
                      "rgba(255,255,255,0.04)",

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    borderRadius:
                      "24px",

                    overflow:
                      "hidden",
                  }}
                >
                  <img
                    src={memory.image}
                    style={{
                      width:
                        "100%",

                      height:
                        "260px",

                      objectFit:
                        "cover",
                    }}
                  />

                  <div
                    style={{
                      padding:
                        "20px",
                    }}
                  >
                    <div
                      style={{
                        color:
                          "#e2e8f0",
                      }}
                    >
                      {
                        memory.title
                      }
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </main>
  );
}