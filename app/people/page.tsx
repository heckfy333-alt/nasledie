async function getPeople() {
  const response = await fetch("http://localhost:3000/api/people", {
    cache: "no-store",
  });

  return response.json();
}

export default async function PeoplePage() {
  const people = await getPeople();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#070b14",
        color: "white",
        padding: "40px",
      }}
    >
      <h1
        style={{
          color: "#ffd700",
          fontSize: "42px",
          marginBottom: "30px",
        }}
      >
        Люди
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {people.map((person: any) => (
          <a
            href={`/person/${person.id}`}
            key={person.id}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "20px",
              textDecoration: "none",
              color: "white",
              transition: "0.3s",
            }}
          >
            {person.photo && (
              <img
                src={person.photo}
                alt={person.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  marginBottom: "15px",
                }}
              />
            )}

            <h2
              style={{
                color: "#ffd700",
                marginBottom: "10px",
              }}
            >
              {person.name}
            </h2>

            <p
              style={{
                opacity: 0.8,
                marginBottom: "10px",
              }}
            >
              {person.birthPlace}
            </p>

            <p
              style={{
                lineHeight: 1.6,
              }}
            >
              {person.bio}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}