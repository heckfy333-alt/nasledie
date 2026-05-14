async function getPeople() {
  try {
    const res = await fetch(
      "http://localhost:3000/api/people",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function BookPage() {
  const people =
    await getPeople();

  return (
    <main
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(180deg,#1e293b,#000)",

        color: "white",

        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",

          margin: "0 auto",
        }}
      >
        {/* COVER */}

        <div
          style={{
            textAlign: "center",

            marginBottom: "80px",
          }}
        >
          <h1
            style={{
              fontSize: "82px",

              color: "#facc15",

              marginBottom: "20px",
            }}
          >
            Книга рода
          </h1>

          <p
            style={{
              color: "#cbd5e1",

              fontSize: "24px",
            }}
          >
            История поколений
          </p>
        </div>

        {/* EMPTY */}

        {people.length === 0 && (
          <div
            style={{
              textAlign: "center",

              color: "#94a3b8",

              fontSize: "24px",
            }}
          >
            Пока нет людей в книге рода
          </div>
        )}

        {/* PEOPLE */}

        <div
          style={{
            display: "flex",

            flexDirection:
              "column",

            gap: "80px",
          }}
        >
          {people.map(
            (person: any) => (
              <section
                key={person.id}
                style={{
                  background:
                    "rgba(255,255,255,0.04)",

                  border:
                    "1px solid rgba(255,255,255,0.08)",

                  borderRadius:
                    "30px",

                  overflow:
                    "hidden",
                }}
              >
                {person.photo && (
                  <img
                    src={person.photo}
                    style={{
                      width:
                        "100%",

                      height:
                        "500px",

                      objectFit:
                        "cover",
                    }}
                  />
                )}

                <div
                  style={{
                    padding:
                      "40px",
                  }}
                >
                  <h2
                    style={{
                      fontSize:
                        "52px",

                      color:
                        "#facc15",

                      marginBottom:
                        "25px",
                    }}
                  >
                    {
                      person.name
                    }
                  </h2>

                  <div
                    style={{
                      display:
                        "flex",

                      flexDirection:
                        "column",

                      gap: "12px",

                      color:
                        "#cbd5e1",

                      marginBottom:
                        "30px",

                      fontSize:
                        "20px",
                    }}
                  >
                    <div>
                      🌍 Рождение:
                      {" "}
                      {
                        person.birthPlace ||
                        "Не указано"
                      }
                    </div>

                    <div>
                      ⚰️ Смерть:
                      {" "}
                      {
                        person.deathPlace ||
                        "Не указано"
                      }
                    </div>
                  </div>

                  <p
                    style={{
                      lineHeight:
                        2,

                      fontSize:
                        "20px",

                      color:
                        "#e2e8f0",
                    }}
                  >
                    {person.bio ||
                      "Биография пока не заполнена"}
                  </p>
                </div>
              </section>
            )
          )}
        </div>
      </div>
    </main>
  );
}