"use client";

import { useState }
from "react";

type Message = {
  id: number;
  author: string;
  text: string;
};

export default function FamilyChatPage() {
  const [messages,
  setMessages] =
    useState<Message[]>([
      {
        id: 1,
        author:
          "Александр",
        text:
          "Нашел старые фотографии деда 🔥",
      },

      {
        id: 2,
        author:
          "Мария",
        text:
          "Добавьте их в архив семьи",
      },
    ]);

  const [text,
  setText] =
    useState("");

  function sendMessage() {
    if (!text) return;

    setMessages([
      ...messages,

      {
        id:
          Date.now(),

        author:
          "Вы",

        text,
      },
    ]);

    setText("");
  }

  return (
    <div
      style={{
        height: "100vh",

        display: "flex",

        flexDirection:
          "column",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          padding:
            "24px 40px",

          borderBottom:
            "1px solid rgba(255,255,255,0.08)",

          fontSize:
            "36px",

          color:
            "#ffe600",

          fontWeight:
            "bold",
        }}
      >
        Семейный чат
      </div>

      {/* CHAT */}

      <div
        style={{
          flex: 1,

          overflow:
            "auto",

          padding:
            "40px",

          display:
            "flex",

          flexDirection:
            "column",

          gap: "20px",
        }}
      >
        {messages.map(
          (msg) => (
            <div
              key={msg.id}
              style={{
                background:
                  "rgba(255,255,255,0.05)",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                borderRadius:
                  "24px",

                padding:
                  "20px",

                maxWidth:
                  "700px",
              }}
            >
              <div
                style={{
                  color:
                    "#ffe600",

                  marginBottom:
                    "10px",

                  fontWeight:
                    "bold",
                }}
              >
                {
                  msg.author
                }
              </div>

              <div
                style={{
                  lineHeight:
                    1.7,

                  fontSize:
                    "18px",
                }}
              >
                {msg.text}
              </div>
            </div>
          )
        )}
      </div>

      {/* INPUT */}

      <div
        style={{
          padding:
            "24px 40px",

          borderTop:
            "1px solid rgba(255,255,255,0.08)",

          display:
            "flex",

          gap: "20px",
        }}
      >
        <input
          value={text}
          onChange={(e) =>
            setText(
              e.target.value
            )
          }
          placeholder="Напишите сообщение..."
          style={{
            flex: 1,

            padding:
              "20px",

            borderRadius:
              "18px",

            border:
              "none",

            background:
              "rgba(255,255,255,0.08)",

            color:
              "white",

            fontSize:
              "18px",
          }}
        />

        <button
          onClick={
            sendMessage
          }
          style={{
            background:
              "#ffe600",

            border:
              "none",

            padding:
              "0 34px",

            borderRadius:
              "18px",

            fontWeight:
              "bold",

            cursor:
              "pointer",
          }}
        >
          Отправить
        </button>
      </div>
    </div>
  );
}