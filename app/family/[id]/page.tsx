"use client";

import dynamic from "next/dynamic";

const FamilyTree = dynamic(
  () => import("@/app/components/FamilyTree"),
  {
    ssr: false,
  }
);

export default function FamilyPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #182848 0%, #070b1a 70%)",
        padding: 40,
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: 72,
          color: "#ffe81f",
          marginBottom: 40,
          fontWeight: "900",
        }}
      >
        Семейное древо
      </h1>

      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: 30,
          padding: 30,
          border:
            "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <FamilyTree />
      </div>
    </div>
  );
}