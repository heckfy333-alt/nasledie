"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function AddMemoryContent() {
  const searchParams = useSearchParams();

  const personId = searchParams.get("personId");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#070b1a",
        color: "white",
        padding: "40px",
      }}
    >
      <h1>Добавление памяти</h1>

      <p>Person ID: {personId}</p>
    </div>
  );
}

export default function AddMemoryPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <AddMemoryContent />
    </Suspense>
  );
}