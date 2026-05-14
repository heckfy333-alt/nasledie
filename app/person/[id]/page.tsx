"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(
  () => import("@/app/components/MemoryMap"),
  {
    ssr: false,
  }
);

export default function PersonPage(props: any) {
  const params = props.params;

  const [person, setPerson] = useState<any>(null);
  const [candles, setCandles] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  const [candleName, setCandleName] = useState("");

  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadPerson();
    loadCandles();
    loadEvents();
  }, []);

  async function loadPerson() {
    const res = await fetch("/api/persons");
    const data = await res.json();

    const found = data.find(
      (p: any) => p.id === Number(params.id)
    );

    setPerson(found);
  }

  async function loadCandles() {
    const res = await fetch("/api/candles");
    const data = await res.json();

    setCandles(data);
  }

  async function loadEvents() {
    const res = await fetch("/api/events");
    const data = await res.json();

    const filtered = data.filter(
      (e: any) => e.personId === Number(params.id)
    );

    setEvents(filtered);
  }

  async function addCandle() {
    if (!candleName) return;

    const res = await fetch("/api/candles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        author: candleName,
        personId: Number(params.id),
      }),
    });

    const newCandle = await res.json();

    setCandles([...candles, newCandle]);

    setCandleName("");
  }

  async function addEvent() {
    if (!year || !title) return;

    const res = await fetch("/api/events", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        personId: Number(params.id),
        year,
        title,
        description,
      }),
    });

    const newEvent = await res.json();

    setEvents([...events, newEvent]);

    setYear("");
    setTitle("");
    setDescription("");
  }

  if (!person) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#070b1a",
          color: "white",
          padding: "40px",
        }}
      >
        Загрузка...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at center, #182848 0%, #090a0f 100%)",
        padding: "40px",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <img
          src={person.photo}
          alt={person.name}
          style={{
            width: "220px",
            height: "220px",
            objectFit: "cover",
            borderRadius: "30px",
            border: "4px solid #ffe81f",
            boxShadow:
              "0 0 40px rgba(255,255,0,0.5)",
          }}
        />

        <div>
          <h1
            style={{
              fontSize: "72px",
              margin: 0,
              color: "#ffe81f",
              fontWeight: "900",
            }}
          >
            {person.name}
          </h1>

          <p
            style={{
              fontSize: "32px",
              opacity: 0.9,
              marginTop: "10px",
            }}
          >
            {person.role}
          </p>
        </div>
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: "30px",
          padding: "30px",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            color: "#ffcc33",
            fontSize: "48px",
          }}
        >
          Карта памяти
        </h2>

        <Map />
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: "30px",
          padding: "30px",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            color: "#ffe81f",
            fontSize: "48px",
            marginBottom: "30px",
          }}
        >
          Живая стена памяти
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {candles.map((candle: any) => (
            <div
              key={candle.id}
              style={{
                width: "140px",
                borderRadius: "24px",
                background:
                  "rgba(255,255,255,0.06)",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "42px" }}>
                🕯
              </div>

              <div
                style={{
                  marginTop: "10px",
                  color: "#ffcc33",
                  fontWeight: "700",
                }}
              >
                {candle.author}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <input
            value={candleName}
            onChange={(e) =>
              setCandleName(e.target.value)
            }
            placeholder="Ваше имя"
            style={{
              flex: 1,
              height: "70px",
              borderRadius: "20px",
              border: "none",
              padding: "0 25px",
              fontSize: "22px",
            }}
          />

          <button
            onClick={addCandle}
            style={{
              width: "240px",
              borderRadius: "20px",
              border: "none",
              background: "#ffe81f",
              fontWeight: "900",
              fontSize: "22px",
            }}
          >
            Зажечь свечу
          </button>
        </div>
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: "30px",
          padding: "30px",
        }}
      >
        <h2
          style={{
            color: "#ffcc33",
            fontSize: "48px",
            marginBottom: "30px",
          }}
        >
          История человека
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <input
            value={year}
            onChange={(e) =>
              setYear(e.target.value)
            }
            placeholder="Год"
            style={{
              height: "60px",
              borderRadius: "20px",
              border: "none",
              padding: "0 20px",
              fontSize: "20px",
            }}
          />

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Название события"
            style={{
              height: "60px",
              borderRadius: "20px",
              border: "none",
              padding: "0 20px",
              fontSize: "20px",
            }}
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Описание события"
            style={{
              height: "120px",
              borderRadius: "20px",
              border: "none",
              padding: "20px",
              fontSize: "20px",
            }}
          />

          <button
            onClick={addEvent}
            style={{
              height: "70px",
              borderRadius: "20px",
              border: "none",
              background: "#ffe81f",
              fontWeight: "900",
              fontSize: "22px",
              cursor: "pointer",
            }}
          >
            Добавить событие
          </button>
        </div>

        <div
          style={{
            borderLeft: "4px solid #ffe81f",
            paddingLeft: "30px",
          }}
        >
          {events.map((event: any) => (
            <div
              key={event.id}
              style={{
                marginBottom: "40px",
              }}
            >
              <div
                style={{
                  color: "#ffe81f",
                  fontSize: "28px",
                  fontWeight: "900",
                }}
              >
                {event.year}
              </div>

              <div
                style={{
                  marginTop: "10px",
                  fontSize: "26px",
                  fontWeight: "700",
                }}
              >
                {event.title}
              </div>

              <div
                style={{
                  marginTop: "10px",
                  fontSize: "20px",
                  color: "#ccc",
                  lineHeight: "32px",
                }}
              >
                {event.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}