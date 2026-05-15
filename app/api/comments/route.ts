import { NextResponse } from "next/server";

import { apiError, currentUserId, readJson, toNumber } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const personId = toNumber(new URL(request.url).searchParams.get("personId"));
  const comments = await prisma.comment.findMany({
    where: personId ? { personId } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(comments);
}

export async function POST(request: Request) {
  const body = await readJson<Record<string, unknown>>(request);
  const personId = toNumber(body.personId);

  if (!personId || typeof body.text !== "string") {
    return apiError("Укажите personId и текст комментария");
  }

  const comment = await prisma.comment.create({
    data: {
      personId,
      userId: await currentUserId(),
      author: typeof body.author === "string" && body.author.trim() ? body.author.trim() : "Семья",
      text: body.text,
    },
  });

  return NextResponse.json(comment, { status: 201 });
}
