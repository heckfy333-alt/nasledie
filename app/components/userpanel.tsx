"use client";

import {
  signOut,
  useSession,
} from "next-auth/react";

export default function UserPanel() {
  const { data } =
    useSession();

  if (!data?.user)
    return null;

  return (
    <div
      style={{
        position: "fixed",

        top: 20,

        right: 20,

        background:
          "rgba(0,0,0,0.6)",

        padding: "14px",

        borderRadius:
          "14px",

        color: "white",

        zIndex: 9999,
      }}
    >
      <div>
        👤 {data.user.name}
      </div>

      <div
        style={{
          fontSize: "12px",

          opacity: 0.7,

          marginBottom:
            "10px",
        }}
      >
        {data.user.email}
      </div>

      <button
        onClick={() =>
          signOut()
        }
        style={{
          background:
            "#facc15",

          border: "none",

          padding:
            "8px 12px",

          borderRadius:
            "10px",

          cursor:
            "pointer",

          fontWeight:
            "bold",
        }}
      >
        Выйти
      </button>
    </div>
  );
}