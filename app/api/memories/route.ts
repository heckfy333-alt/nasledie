import { MemoryKind } from "@prisma/client";
import { NextResponse } from "next/server";

import { apiError, currentUserId, readJson, toNumber } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const personId = toNumber(new URL(request.url).searchParams.get("personId"));
  const memories = await prisma.memory.findMany({
    where: personId ? { personId } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(memories);
}

export async function POST(request: Request) {
  const body = await readJson<Record<string, unknown>>(request);
  const personId = toNumber(body.personId);

  if (!personId || typeof body.title !== "string") {
    return apiError("Укажите personId и title");
  }

  const kind =
    typeof body.kind === "string" && body.kind in MemoryKind
      ? (body.kind as MemoryKind)
      : MemoryKind.STORY;

  const memory = await prisma.memory.create({
    data: {
      personId,
      authorId: await currentUserId(),
      title: body.title,
      content: typeof body.content === "string" ? body.content : "",
      mediaUrl: typeof body.mediaUrl === "string" ? body.mediaUrl : null,
      kind,
    },
  });

  return NextResponse.json(memory, { status: 201 });
}
