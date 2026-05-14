"use client";

import { useEffect,
useState }
from "react";

export default function GalleryPage() {
  const [people, setPeople] =
    useState<any[]>([]);

  const [selected,
  setSelected] =
    useState<any>(null);

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

  const photos = people.filter(
    (p) => p.photo
  );

  return (
    <main
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(180deg,#020617,#000)",

        padding:
          "40px 30px",

        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "1600px",

          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "72px",

            color: "#facc15",

            marginBottom:
              "50px",
          }}
        >
          Семейная галерея
        </h1>

        {/* GRID */}

        <div
          style={{
            columns: "4 280px",

            columnGap:
              "24px",
          }}
        >
          {photos.map(
            (person) => (
              <div
                key={person.id}
                style={{
                  breakInside:
                    "avoid",

                  marginBottom:
                    "24px",

                  cursor:
                    "pointer",

                  position:
                    "relative",
                }}
                onClick={() =>
                  setSelected(
                    person
                  )
                }
              >
                <img
                  src={
                    person.photo
                  }
                  style={{
                    width: "100%",

                    borderRadius:
                      "24px",

                    display:
                      "block",

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    boxShadow:
                      "0 0 40px rgba(250,204,21,0.12)",
                  }}
                />

                <div
                  style={{
                    position:
                      "absolute",

                    left: 0,

                    right: 0,

                    bottom: 0,

                    padding:
                      "20px",

                    borderRadius:
                      "0 0 24px 24px",

                    background:
                      "linear-gradient(180deg,transparent,rgba(0,0,0,0.85))",
                  }}
                >
                  <div
                    style={{
                      color:
                        "#facc15",

                      fontSize:
                        "24px",

                      fontWeight:
                        "bold",
                    }}
                  >
                    {
                      person.name
                    }
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* MODAL */}

      {selected && (
        <div
          onClick={() =>
            setSelected(
              null
            )
          }
          style={{
            position:
              "fixed",

            inset: 0,

            background:
              "rgba(0,0,0,0.92)",

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            zIndex: 999,
          }}
        >
          <div
            style={{
              maxWidth: "90%",

              maxHeight:
                "90%",
            }}
          >
            <img
              src={
                selected.photo
              }
              style={{
                width: "100%",

                maxHeight:
                  "80vh",

                objectFit:
                  "contain",

                borderRadius:
                  "24px",
              }}
            />

            <div
              style={{
                marginTop:
                  "20px",

                textAlign:
                  "center",

                fontSize:
                  "32px",

                color:
                  "#facc15",
              }}
            >
              {selected.name}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}