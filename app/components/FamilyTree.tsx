"use client";

import React from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
} from "reactflow";

import "reactflow/dist/style.css";

const nodes: Node[] = [
  {
    id: "1",
    position: { x: 250, y: 50 },
    data: {
      label: "Дедушка",
    },
    style: {
      background: "#111827",
      color: "white",
      border: "2px solid #facc15",
      borderRadius: 16,
      padding: 10,
      width: 160,
      textAlign: "center" as const,
      fontSize: 16,
      fontWeight: 700,
      boxShadow: "0 0 15px rgba(250,204,21,0.4)",
    },
  },

  {
    id: "2",
    position: { x: 100, y: 220 },
    data: {
      label: "Отец",
    },
    style: {
      background: "#1f2937",
      color: "white",
      border: "2px solid #38bdf8",
      borderRadius: 16,
      padding: 10,
      width: 160,
      textAlign: "center" as const,
      fontSize: 16,
      fontWeight: 700,
    },
  },

  {
    id: "3",
    position: { x: 400, y: 220 },
    data: {
      label: "Мать",
    },
    style: {
      background: "#1f2937",
      color: "white",
      border: "2px solid #f472b6",
      borderRadius: 16,
      padding: 10,
      width: 160,
      textAlign: "center" as const,
      fontSize: 16,
      fontWeight: 700,
    },
  },

  {
    id: "4",
    position: { x: 250, y: 420 },
    data: {
      label: "Ребёнок",
    },
    style: {
      background: "#065f46",
      color: "white",
      border: "2px solid #34d399",
      borderRadius: 16,
      padding: 10,
      width: 160,
      textAlign: "center" as const,
      fontSize: 16,
      fontWeight: 700,
    },
  },
];

const edges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },

  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
  },

  {
    id: "e2-4",
    source: "2",
    target: "4",
    animated: true,
  },

  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
  },
];

export default function FamilyTree() {
  return (
    <div
      style={{
        width: "100%",
        height: "700px",
        background: "#030712",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}