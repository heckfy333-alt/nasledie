"use client";

import { useEffect,
useState }
from "react";

export default function MemoryCandlePage() {
  const [count,
  setCount] =
    useState(0);

  const [loading,
  setLoading] =
    useState(true);

  useEffect(() => {
    loadCandles();
  }, []);

  async function loadCandles() {
    const res =
      await fetch(
        "/api/person-full?id=1"
      );

    const data =
      await res.json();

    setCount(
      data.candles.length
    );

    setLoading(false);
  }

  async function lightCandle() {
    await fetch(
      "/api/candles",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          personId: 1,
        }),
      }
    );

    loadCandles();
  }

  if (loading) {
    return (
      <div
        style={{
          padding:
            "100px",
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

        display: "flex",

        flexDirection:
          "column",

        justifyContent:
          "center",

        alignItems:
          "center",

        textAlign:
          "center",

        padding:
          "40px",
      }}
    >
      <h1
        style={{
          fontSize: "72px",

          color: "#ffe600",

          marginBottom:
            "20px",
        }}
      >
        Свеча памяти
      </h1>

      <div
        style={{
          fontSize: "24px",

          opacity: 0.8,

          marginBottom:
            "50px",
        }}
      >
        Почтите память человека
      </div>

      {/* FLAME */}

      <div
        style={{
          width: "120px",

          height:
            "220px",

          borderRadius:
            "30px",

          background:
            "linear-gradient(180deg,#fff7ed,#e2e8f0)",

          position:
            "relative",

          marginBottom:
            "50px",
        }}
      >
        <div
          style={{
            position:
              "absolute",

            top: "-70px",

            left: "50%",

            transform:
              "translateX(-50%)",

            width: "50px",

            height:
              "70px",

            borderRadius:
              "50%",

            background:
              "radial-gradient(circle,#ffe600,#ff7b00)",

            boxShadow:
              "0 0 40px #ff9900",
          }}
        />
      </div>

      <button
        onClick={
          lightCandle
        }
        style={{
          background:
            "#ffe600",

          border:
            "none",

          padding:
            "22px 36px",

          borderRadius:
            "18px",

          fontWeight:
            "bold",

          fontSize:
            "22px",

          cursor:
            "pointer",

          marginBottom:
            "40px",
        }}
      >
        Зажечь свечу
      </button>

      <div
        style={{
          fontSize:
            "32px",

          color:
            "#93c5fd",
        }}
      >
        Свечей памяти:
        {" "}
        {count}
      </div>
    </div>
  );
}