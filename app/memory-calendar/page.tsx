"use client";

const events = [
  {
    id: 1,
    title:
      "День рождения Александра",
    date: "17 ноября",
    type: "birthday",
  },

  {
    id: 2,
    title:
      "Годовщина памяти Марии",
    date: "4 марта",
    type: "memory",
  },

  {
    id: 3,
    title:
      "Семейный праздник",
    date: "12 июля",
    type: "holiday",
  },

  {
    id: 4,
    title:
      "Поминки дедушки",
    date: "22 декабря",
    type: "memorial",
  },
];

function getColor(type: string) {
  switch (type) {
    case "birthday":
      return "#22c55e";

    case "memory":
      return "#ef4444";

    case "holiday":
      return "#3b82f6";

    case "memorial":
      return "#f59e0b";

    default:
      return "#ffffff";
  }
}

export default function MemoryCalendarPage() {
  return (
    <div
      style={{
        padding: "70px 40px",
      }}
    >
      <h1
        style={{
          fontSize: "72px",
          color: "#ffe600",
          marginBottom: "20px",
        }}
      >
        Календарь памяти
      </h1>

      <div
        style={{
          fontSize: "24px",
          opacity: 0.8,
          marginBottom: "60px",
        }}
      >
        Важные даты семьи,
        дни памяти и праздники
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(340px,1fr))",
          gap: "30px",
        }}
      >
        {events.map(
          (event) => (
            <div
              key={event.id}
              style={{
                background:
                  "rgba(255,255,255,0.05)",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                borderRadius:
                  "30px",

                padding:
                  "30px",

                position:
                  "relative",

                overflow:
                  "hidden",
              }}
            >
              <div
                style={{
                  position:
                    "absolute",

                  top: 0,

                  left: 0,

                  width: "100%",

                  height: "6px",

                  background:
                    getColor(
                      event.type
                    ),
                }}
              />

              <div
                style={{
                  fontSize:
                    "30px",

                  color:
                    "#ffe600",

                  marginBottom:
                    "18px",

                  fontWeight:
                    "bold",
                }}
              >
                {event.title}
              </div>

              <div
                style={{
                  fontSize:
                    "22px",

                  opacity: 0.85,
                }}
              >
                {event.date}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}