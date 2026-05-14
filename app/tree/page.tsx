"use client";

import { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
} from "reactflow";

import "reactflow/dist/style.css";

type Person = {
  id: number;
  name: string;
  role: string;
  image: string;
  parentId?: number;
};

export default function TreePage() {
  const [people, setPeople] = useState<Person[]>([]);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [parentId, setParentId] = useState("");

  const loadPeople = async () => {
    const res = await fetch("/api/persons");
    const data = await res.json();

    setPeople(data);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const uploadImage = async (
    file: File
  ) => {
    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch(
      "/api/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    setImage(data.path);
  };

  const addPerson = async () => {
    if (!name) return;

    await fetch("/api/persons", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        role,
        image,
        parentId: parentId
          ? Number(parentId)
          : null,
      }),
    });

    setName("");
    setRole("");
    setImage("");
    setParentId("");

    loadPeople();
  };

  const nodes: Node[] = people.map((person) => {
    let position = {
      x: 500,
      y: 50,
    };

    if (person.parentId) {
      const children = people.filter(
        (p) => p.parentId === person.parentId
      );

      const childIndex = children.findIndex(
        (c) => c.id === person.id
      );

      position = {
        x: 200 + childIndex * 350,
        y: 500,
      };
    }

    return {
      id: String(person.id),

      position,

      data: {
        label: (
          <a
            href={`/person/${person.id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 220,
                borderRadius: 30,
                overflow: "hidden",

                background: "#111827",

                border: "3px solid #facc15",

                boxShadow:
                  "0 0 25px rgba(250,204,21,0.8)",
              }}
            >
              <img
                src={person.image}
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  padding: 15,
                  textAlign: "center",
                }}
              >
                <h2
                  style={{
                    color: "white",
                    margin: 0,
                    fontSize: 30,
                    fontWeight: "bold",
                  }}
                >
                  {person.name}
                </h2>

                <p
                  style={{
                    color: "#d1d5db",
                    marginTop: 8,
                  }}
                >
                  {person.role}
                </p>
              </div>
            </div>
          </a>
        ),
      },

      type: "default",
    };
  });

  const edges: Edge[] = people
    .filter((p) => p.parentId)
    .map((p) => ({
      id: `e${p.parentId}-${p.id}`,

      source: String(p.parentId),
      target: String(p.id),

      animated: true,

      style: {
        stroke: "#facc15",
        strokeWidth: 4,
      },
    }));

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",

        background:
          "radial-gradient(circle at center, #1e3a8a 0%, #020617 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: 10,

          top: 20,
          left: 20,

          background: "#111827",

          padding: 20,
          borderRadius: 20,

          border: "2px solid #facc15",

          width: 300,
        }}
      >
        <h2 style={{ color: "white" }}>
          Добавить человека
        </h2>

        <input
          placeholder="Имя"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            width: "100%",
            marginBottom: 10,
            padding: 10,
          }}
        />

        <input
          placeholder="Роль"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          style={{
            width: "100%",
            marginBottom: 10,
            padding: 10,
          }}
        />

        <input
          type="file"
          onChange={(e) => {
            const file =
              e.target.files?.[0];

            if (file) {
              uploadImage(file);
            }
          }}
          style={{
            width: "100%",
            marginBottom: 10,
            padding: 10,
            background: "white",
          }}
        />

        <input
          placeholder="ID родителя"
          value={parentId}
          onChange={(e) =>
            setParentId(e.target.value)
          }
          style={{
            width: "100%",
            marginBottom: 10,
            padding: 10,
          }}
        />

        <button
          onClick={addPerson}
          style={{
            width: "100%",
            padding: 12,

            background: "#facc15",

            border: "none",

            borderRadius: 10,

            fontWeight: "bold",

            cursor: "pointer",
          }}
        >
          Добавить
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}