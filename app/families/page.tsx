async function getFamilies() {
  const res = await fetch(
    "http://localhost:3000/api/families",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function FamiliesPage() {
  const families =
    await getFamilies();

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
          maxWidth: "1400px",

          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "64px",

            color: "#facc15",

            marginBottom: "50px",
          }}
        >
          Семьи
        </h1>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fill,minmax(320px,1fr))",

            gap: "30px",
          }}
        >
          {families.map(
            (family: any) => (
              <div
                key={family.id}
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
                <h2
                  style={{
                    color:
                      "#facc15",

                    fontSize:
                      "32px",

                    marginBottom:
                      "20px",
                  }}
                >
                  {family.name}
                </h2>

                <p
                  style={{
                    color:
                      "#cbd5e1",

                    lineHeight:
                      1.8,

                    marginBottom:
                      "20px",
                  }}
                >
                  {
                    family.description
                  }
                </p>

                <div
                  style={{
                    color:
                      "#94a3b8",

                    marginBottom:
                      "20px",
                  }}
                >
                  Участников:
                  {" "}
                  {
                    family.members
                      ?.length
                  }
                </div>

                <div
                  style={{
                    display: "flex",

                    flexWrap:
                      "wrap",

                    gap: "10px",
                  }}
                >
                  {family.members?.map(
                    (
                      person: any
                    ) => (
                      <div
                        key={
                          person.id
                        }
                        style={{
                          background:
                            "rgba(250,204,21,0.12)",

                          color:
                            "#facc15",

                          padding:
                            "8px 14px",

                          borderRadius:
                            "999px",
                        }}
                      >
                        {
                          person.name
                        }
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}