async function getEvents() {
  const res = await fetch(
    "http://localhost:3000/api/events",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function TimelinePage() {
  const events =
    await getEvents();

  return (
    <main
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(180deg,#020617,#000)",

        color: "white",

        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",

          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "64px",

            color: "#facc15",

            marginBottom: "60px",
          }}
        >
          Линия жизни
        </h1>

        <div
          style={{
            position: "relative",

            paddingLeft: "50px",
          }}
        >
          {/* LINE */}

          <div
            style={{
              position: "absolute",

              left: "18px",

              top: 0,

              bottom: 0,

              width: "4px",

              background:
                "#facc15",
            }}
          />

          {events.map(
            (event: any) => (
              <div
                key={event.id}
                style={{
                  position:
                    "relative",

                  marginBottom:
                    "50px",
                }}
              >
                {/* DOT */}

                <div
                  style={{
                    position:
                      "absolute",

                    left: "-40px",

                    top: "20px",

                    width: "18px",

                    height: "18px",

                    borderRadius:
                      "999px",

                    background:
                      "#facc15",
                  }}
                />

                {/* CARD */}

                <div
                  style={{
                    background:
                      "rgba(255,255,255,0.04)",

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
                        "#94a3b8",

                      marginBottom:
                        "12px",

                      fontSize:
                        "18px",
                    }}
                  >
                    {event.date}
                  </div>

                  <h2
                    style={{
                      color:
                        "#facc15",

                      fontSize:
                        "32px",

                      marginBottom:
                        "14px",
                    }}
                  >
                    {event.title}
                  </h2>

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
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}