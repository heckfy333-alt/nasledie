"use client";

import { useEffect, useState }
from "react";

export default function MemoryPage({
  params,
}: any) {
  const [person, setPerson] =
    useState<any>(null);

  const [author, setAuthor] =
    useState("");

  const [text, setText] =
    useState("");

  const [photoTitle, setPhotoTitle] =
    useState("");

  const [photoUrl, setPhotoUrl] =
    useState("");

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

  async function addComment() {
    await fetch("/api/comments", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        author,
        text,

        personId: person.id,
      }),
    });

    setAuthor("");

    setText("");

    loadPerson();
  }

  async function addPhoto() {
    await fetch("/api/gallery", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        title: photoTitle,

        image: photoUrl,

        personId: person.id,
      }),
    });

    setPhotoTitle("");

    setPhotoUrl("");

    loadPerson();
  }

  if (!person) {
    return (
      <main
        style={{
          minHeight: "100vh",

          background: "black",

          color: "white",

          padding: "40px",
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
        <h1
          style={{
            fontSize: "72px",

            color: "#facc15",

            marginBottom: "20px",
          }}
        >
          {person.name}
        </h1>

        {/* BIO */}

        <div style={cardStyle}>
          <h2 style={titleStyle}>
            Биография
          </h2>

          <p style={textStyle}>
            {person.bio ||
              "Биография пока пустая"}
          </p>
        </div>

        {/* TIMELINE */}

        <div
          style={{
            marginBottom: "60px",
          }}
        >
          <h2 style={titleStyle}>
            Хронология жизни
          </h2>

          <div
            style={{
              display: "flex",

              flexDirection: "column",

              gap: "25px",
            }}
          >
            {person.events.map(
              (event: any) => (
                <div
                  key={event.id}
                  style={timelineCard}
                >
                  <div
                    style={{
                      color:
                        "#facc15",

                      marginBottom:
                        "12px",
                    }}
                  >
                    {event.date}
                  </div>

                  <h3
                    style={{
                      fontSize:
                        "28px",

                      marginBottom:
                        "12px",
                    }}
                  >
                    {event.title}
                  </h3>

                  <p style={textStyle}>
                    {
                      event.description
                    }
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* GALLERY */}

        <div style={cardStyle}>
          <h2 style={titleStyle}>
            Галерея памяти
          </h2>

          {/* FORM */}

          <div
            style={{
              display: "flex",

              flexDirection: "column",

              gap: "20px",

              marginBottom: "40px",
            }}
          >
            <input
              placeholder="Название фото"

              value={photoTitle}

              onChange={(e) =>
                setPhotoTitle(
                  e.target.value
                )
              }

              style={inputStyle}
            />

            <input
              placeholder="Ссылка на фото"

              value={photoUrl}

              onChange={(e) =>
                setPhotoUrl(
                  e.target.value
                )
              }

              style={inputStyle}
            />

            <button
              onClick={addPhoto}
              style={buttonStyle}
            >
              Добавить фото
            </button>
          </div>

          {/* GRID */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fill,minmax(280px,1fr))",

              gap: "25px",
            }}
          >
            {person.memories.map(
              (photo: any) => (
                <div
                  key={photo.id}
                  style={{
                    background:
                      "rgba(255,255,255,0.04)",

                    borderRadius:
                      "24px",

                    overflow:
                      "hidden",

                    border:
                      "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <img
                    src={photo.image}
                    style={{
                      width: "100%",

                      height: "280px",

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
                          "#facc15",

                        fontSize:
                          "20px",
                      }}
                    >
                      {
                        photo.title
                      }
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* COMMENTS */}

        <div
          style={{
            ...cardStyle,

            marginTop: "60px",
          }}
        >
          <h2 style={titleStyle}>
            Воспоминания семьи
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
              placeholder="Ваше имя"

              value={author}

              onChange={(e) =>
                setAuthor(
                  e.target.value
                )
              }

              style={inputStyle}
            />

            <textarea
              placeholder="Ваше воспоминание"

              value={text}

              onChange={(e) =>
                setText(
                  e.target.value
                )
              }

              style={{
                ...inputStyle,

                minHeight: "180px",
              }}
            />

            <button
              onClick={addComment}
              style={buttonStyle}
            >
              Сохранить память
            </button>
          </div>

          <div
            style={{
              display: "flex",

              flexDirection: "column",

              gap: "25px",
            }}
          >
            {person.comments.map(
              (comment: any) => (
                <div
                  key={comment.id}
                  style={timelineCard}
                >
                  <div
                    style={{
                      color:
                        "#facc15",

                      marginBottom:
                        "12px",

                      fontSize:
                        "20px",
                    }}
                  >
                    {
                      comment.author
                    }
                  </div>

                  <p style={textStyle}>
                    {comment.text}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

const cardStyle = {
  background:
    "rgba(255,255,255,0.04)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  borderRadius: "30px",

  padding: "35px",

  marginBottom: "60px",
};

const timelineCard = {
  background:
    "rgba(255,255,255,0.03)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  borderRadius: "24px",

  padding: "25px",
};

const titleStyle = {
  fontSize: "42px",

  color: "#facc15",

  marginBottom: "30px",
};

const textStyle = {
  color: "#d1d5db",

  lineHeight: 1.9,

  fontSize: "18px",
};

const inputStyle = {
  background: "#0f172a",

  color: "white",

  border: "1px solid #334155",

  borderRadius: "18px",

  padding: "18px",

  fontSize: "18px",
};

const buttonStyle = {
  background: "#facc15",

  color: "black",

  border: "none",

  borderRadius: "20px",

  padding: "18px 24px",

  fontSize: "20px",

  fontWeight: "bold",

  cursor: "pointer",
};