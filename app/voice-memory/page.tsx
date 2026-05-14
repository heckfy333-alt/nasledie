"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export default function VoiceMemoryPage() {
  const mediaRecorderRef =
    useRef<any>(null);

  const chunksRef =
    useRef<any[]>([]);

  const [recording,
  setRecording] =
    useState(false);

  const [audioUrl,
  setAudioUrl] =
    useState("");

  async function startRecording() {
    const stream =
      await navigator.mediaDevices.getUserMedia(
        {
          audio: true,
        }
      );

    const mediaRecorder =
      new MediaRecorder(stream);

    mediaRecorderRef.current =
      mediaRecorder;

    chunksRef.current = [];

    mediaRecorder.ondataavailable =
      (event) => {
        if (
          event.data.size > 0
        ) {
          chunksRef.current.push(
            event.data
          );
        }
      };

    mediaRecorder.onstop =
      () => {
        const blob =
          new Blob(
            chunksRef.current,
            {
              type:
                "audio/webm",
            }
          );

        const url =
          URL.createObjectURL(
            blob
          );

        setAudioUrl(url);
      };

    mediaRecorder.start();

    setRecording(true);
  }

  function stopRecording() {
    mediaRecorderRef.current.stop();

    setRecording(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1a1f4d 0%, #050816 60%)",
        color: "white",
      }}
    >
      <div
        style={{
          padding: "30px 50px",
          borderBottom:
            "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#ffe600",
            textDecoration: "none",
            fontSize: "42px",
            fontWeight: "bold",
          }}
        >
          НАСЛЕДИЕ
        </Link>
      </div>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "70px 30px",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            color: "#ffe600",
            marginBottom: "30px",
          }}
        >
          Голос памяти
        </h1>

        <div
          style={{
            fontSize: "24px",
            opacity: 0.8,
            lineHeight: "1.7",
            marginBottom: "50px",
          }}
        >
          Сохраните голосовые
          воспоминания семьи
          для будущих поколений.
        </div>

        <div
          style={{
            background:
              "rgba(255,255,255,0.05)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "30px",
            padding: "50px",
            textAlign: "center",
          }}
        >
          {!recording ? (
            <button
              onClick={
                startRecording
              }
              style={{
                background:
                  "#22c55e",
                border: "none",
                padding:
                  "22px 40px",
                borderRadius:
                  "20px",
                color: "white",
                fontSize: "22px",
                fontWeight:
                  "bold",
                cursor:
                  "pointer",
              }}
            >
              Начать запись
            </button>
          ) : (
            <button
              onClick={
                stopRecording
              }
              style={{
                background:
                  "#ef4444",
                border: "none",
                padding:
                  "22px 40px",
                borderRadius:
                  "20px",
                color: "white",
                fontSize: "22px",
                fontWeight:
                  "bold",
                cursor:
                  "pointer",
              }}
            >
              Остановить запись
            </button>
          )}

          {audioUrl && (
            <div
              style={{
                marginTop: "50px",
              }}
            >
              <audio
                controls
                src={audioUrl}
                style={{
                  width: "100%",
                }}
              />

              <div
                style={{
                  marginTop: "20px",
                  color: "#86efac",
                  fontSize: "20px",
                }}
              >
                Голосовое
                воспоминание
                сохранено
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}