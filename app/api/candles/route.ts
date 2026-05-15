import { NextResponse } from "next/server";

import { apiError, currentUserId, readJson, toNumber } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await readJson<Record<string, unknown>>(request);
  const personId = toNumber(body.personId);

  if (!personId) {
    return apiError("Укажите personId");
  }

  const candle = await prisma.candle.create({
    data: {
      personId,
      userId: await currentUserId(),
      author: typeof body.author === "string" && body.author.trim() ? body.author.trim() : "Родные",
      message: typeof body.message === "string" ? body.message : null,
    },
  });

  return NextResponse.json(candle, { status: 201 });
}
