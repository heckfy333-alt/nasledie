"use client";

import { useEffect, useState } from "react";

export default function PersonProfile({
  params,
}: any) {
  const [person, setPerson] = useState<any>(null);

  useEffect(() => {
    loadPerson();
  }, []);

  async function loadPerson() {
    const res = await fetch(
      "/api/people/" + params.id
    );

    const data = await res.json();

    setPerson(data);
  }

  if (!person) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          padding: "60px",
          fontSize: "40px",
        }}
      >
        Загрузка...
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(180deg,#020617,#0f172a,#111827)",

        color: "white",

        padding: "60px",
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

            marginBottom: "20px",
          }}
        >
          {person.name}
        </h1>

        {/* ДОКУМЕНТЫ */}

        <div
          style={{
            marginTop: "60px",
          }}
        >
          <h2
            style={{
              fontSize: "48px",

              color: "#facc15",

              marginBottom: "35px",
            }}
          >
            Архив документов
          </h2>

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit,minmax(300px,1fr))",

              gap: "25px",
            }}
          >
            {person.documents?.map(
              (doc: any) => (
                <div
                  key={doc.id}
                  style={{
                    background: "#0f172a",

                    border:
                      "1px solid rgba(250,204,21,0.2)",

                    borderRadius: "24px",

                    padding: "30px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "28px",

                      fontWeight: "bold",

                      marginBottom: "15px",
                    }}
                  >
                    {doc.title}
                  </div>

                  <p
                    style={{
                      color: "#cbd5e1",

                      lineHeight: 1.7,

                      marginBottom: "20px",
                    }}
                  >
                    {doc.description}
                  </p>

                  <a
                    href={doc.file}
                    target="_blank"
                    style={{
                      display: "inline-block",

                      background: "#facc15",

                      color: "black",

                      padding:
                        "14px 22px",

                      borderRadius: "14px",

                      textDecoration: "none",

                      fontWeight: "bold",
                    }}
                  >
                    Открыть документ
                  </a>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}