"use client";

import ReactFlow, {
  Background,
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  type Edge,
  type Node,
  type NodeProps,
} from "reactflow";

type Person = {
  id: number;
  name: string;
  role: string | null;
  photo: string | null;
  birthPlace: string | null;
  fatherId: number | null;
  motherId: number | null;
};

type FamilyNodeData = {
  person: Person;
};

const nodeTypes = {
  family: FamilyNode,
};

function FamilyNode({ data }: NodeProps<FamilyNodeData>) {
  const { person } = data;

  return (
    <div className="relative w-[230px] rounded-xl border border-yellow-100/35 bg-[#08090d]/90 p-4 text-center text-white shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur">
      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !border !border-yellow-100 !bg-yellow-300"
      />
      <img
        src={
          person.photo ||
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop"
        }
        alt={person.name}
        className="mx-auto h-20 w-20 rounded-full border-2 border-yellow-200 object-cover"
      />
      <h3 className="mt-3 text-lg font-bold leading-tight text-yellow-100">{person.name}</h3>
      <p className="mt-1 min-h-5 text-xs text-white/55">
        {person.role || person.birthPlace || "Родовая линия"}
      </p>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !border !border-yellow-100 !bg-yellow-300"
      />
    </div>
  );
}

function buildTreeLayout(people: Person[]) {
  const peopleById = new Map(people.map((person) => [person.id, person]));
  const childrenByPrimaryParent = new Map<number, Person[]>();
  const generationById = new Map<number, number>();
  const positionById = new Map<number, { x: number; y: number }>();
  const visited = new Set<number>();

  for (const person of people) {
    const primaryParentId =
      person.fatherId && peopleById.has(person.fatherId)
        ? person.fatherId
        : person.motherId && peopleById.has(person.motherId)
          ? person.motherId
          : null;

    if (primaryParentId) {
      const children = childrenByPrimaryParent.get(primaryParentId) || [];
      children.push(person);
      childrenByPrimaryParent.set(primaryParentId, children);
    }
  }

  const getGeneration = (person: Person, stack = new Set<number>()): number => {
    const cached = generationById.get(person.id);
    if (cached !== undefined) {
      return cached;
    }

    if (stack.has(person.id)) {
      return 0;
    }

    stack.add(person.id);

    const parentGenerations = [person.fatherId, person.motherId]
      .filter((id): id is number => Boolean(id && peopleById.has(id)))
      .map((id) => getGeneration(peopleById.get(id)!, stack) + 1);

    stack.delete(person.id);

    const generation = parentGenerations.length ? Math.max(...parentGenerations) : 0;
    generationById.set(person.id, generation);
    return generation;
  };

  for (const person of people) {
    getGeneration(person);
  }

  const roots = people.filter((person) => {
    const hasKnownParent =
      Boolean(person.fatherId && peopleById.has(person.fatherId)) ||
      Boolean(person.motherId && peopleById.has(person.motherId));

    return !hasKnownParent;
  });

  let nextLeaf = 0;
  const horizontalGap = 300;
  const verticalGap = 250;

  const placeSubtree = (person: Person): number => {
    if (visited.has(person.id)) {
      return positionById.get(person.id)?.x ?? nextLeaf * horizontalGap;
    }

    visited.add(person.id);

    const children = childrenByPrimaryParent.get(person.id) || [];
    const childCenters = children.map(placeSubtree);
    const generation = generationById.get(person.id) || 0;
    const x = childCenters.length
      ? (Math.min(...childCenters) + Math.max(...childCenters)) / 2
      : nextLeaf++ * horizontalGap;

    positionById.set(person.id, {
      x,
      y: generation * verticalGap,
    });

    return x;
  };

  for (const root of roots) {
    placeSubtree(root);
  }

  const unvisitedByGeneration = new Map<number, Person[]>();

  for (const person of people) {
    if (!positionById.has(person.id)) {
      const generation = generationById.get(person.id) || 0;
      const group = unvisitedByGeneration.get(generation) || [];
      group.push(person);
      unvisitedByGeneration.set(generation, group);
    }
  }

  for (const [generation, group] of unvisitedByGeneration) {
    group.forEach((person) => {
      positionById.set(person.id, {
        x: nextLeaf++ * horizontalGap,
        y: generation * verticalGap,
      });
    });
  }

  return positionById;
}

export default function TreeClient({ people }: { people: Person[] }) {
  const positions = buildTreeLayout(people);

  const nodes: Node<FamilyNodeData>[] = people.map((person) => ({
    id: String(person.id),
    type: "family",
    position: positions.get(person.id) || { x: 0, y: 0 },
    data: {
      person,
    },
  }));

  const edges: Edge[] = people.flatMap((person) => {
    const result: Edge[] = [];

    if (person.fatherId) {
      result.push({
        id: `father-${person.fatherId}-${person.id}`,
        source: String(person.fatherId),
        target: String(person.id),
        type: "smoothstep",
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#f8df9b" },
        style: {
          stroke: "#f8df9b",
          strokeWidth: 3,
          strokeDasharray: "10 8",
        },
      });
    }

    if (person.motherId) {
      result.push({
        id: `mother-${person.motherId}-${person.id}`,
        source: String(person.motherId),
        target: String(person.id),
        type: "smoothstep",
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#d6ad52" },
        style: {
          stroke: "#d6ad52",
          strokeWidth: 3,
          strokeDasharray: "6 8",
        },
      });
    }

    return result;
  });

  if (people.length === 0) {
    return (
      <div className="grid min-h-[520px] place-items-center rounded-xl border border-white/10 bg-black/50 p-8 text-center text-white/64">
        <div>
          <h2 className="text-2xl font-bold text-yellow-100">Дерево пока пустое</h2>
          <p className="mt-3 max-w-md leading-7">
            Добавьте первого человека, затем укажите родителей в карточках семьи, чтобы появились ветви поколений.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-180px)] min-h-[680px] overflow-hidden rounded-xl border border-yellow-100/15 bg-[radial-gradient(circle_at_top,#17130b_0%,#050507_55%)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultEdgeOptions={{
          type: "smoothstep",
        }}
        proOptions={{ hideAttribution: true }}
      >
        <MiniMap
          nodeColor="#d6ad52"
          maskColor="rgba(0,0,0,.58)"
          pannable
          zoomable
        />
        <Controls />
        <Background color="rgba(248,223,155,.22)" gap={30} />
      </ReactFlow>
    </div>
  );
}
