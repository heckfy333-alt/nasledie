"use client";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
} from "reactflow";

import "reactflow/dist/style.css";

type Person = {
  id: number;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  bio: string | null;
  city: string | null;
};

export default function TreeClient({
  people,
}: {
  people: Person[];
}) {
  const nodes: Node[] = people.map((person, index) => ({
    id: String(person.id),

    position: {
      x: (index % 4) * 350 + 100,
      y: Math.floor(index / 4) * 350 + 100,
    },

    data: {
      label: (
        <div
          style={{
            background: "#111827ee",
            border: "2px solid #facc15",
            borderRadius: "24px",
            padding: "20px",
            width: "220px",
            textAlign: "center",
            color: "white",
            boxShadow: "0 0 25px rgba(0,0,0,0.5)",
          }}
        >
          <img
            src={
              person.photo ||
              "https://i.pinimg.com/736x/cc/b9/86/ccb986269179af31175041c1669ae861.jpg"
            }
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "999px",
              objectFit: "cover",
              margin: "0 auto",
              border: "4px solid #facc15",
            }}
          />

          <h2
            style={{
              color: "#facc15",
              fontSize: "28px",
              marginTop: "18px",
              fontWeight: "bold",
            }}
          >
            {person.firstName}
          </h2>

          <p>
            {person.city || "Не указан город"}
          </p>

          <p
            style={{
              color: "#ccc",
              marginTop: "8px",
            }}
          >
            {person.bio || "Нет описания"}
          </p>
        </div>
      ),
    },
  }));

  const edges: Edge[] = [];

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2070)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.7)",
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: 999,
            left: "40px",
            top: "30px",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: "56px",
              color: "#facc15",
              fontWeight: "bold",
            }}
          >
            Семейное древо
          </h1>

          <p
            style={{
              fontSize: "22px",
              marginTop: "10px",
            }}
          >
            Реальные данные из базы
          </p>
        </div>

        <div
          style={{
            width: "100%",
            height: "100vh",
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            defaultViewport={{
              x: 0,
              y: 0,
              zoom: 0.7,
            }}
            fitView={false}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}