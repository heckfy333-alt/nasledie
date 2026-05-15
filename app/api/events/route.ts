import { NextResponse } from "next/server";

import { apiError, readJson, toNullableDate, toNumber } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const personId = toNumber(new URL(request.url).searchParams.get("personId"));
  const events = await prisma.event.findMany({
    where: personId ? { personId } : undefined,
    orderBy: [{ happenedAt: "asc" }, { createdAt: "asc" }],
  });

  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const body = await readJson<Record<string, unknown>>(request);
  const personId = toNumber(body.personId);

  if (!personId || typeof body.title !== "string") {
    return apiError("Укажите personId и title");
  }

  const event = await prisma.event.create({
    data: {
      personId,
      title: body.title,
      description: typeof body.description === "string" ? body.description : "",
      year: typeof body.year === "string" ? body.year : null,
      happenedAt: toNullableDate(body.happenedAt),
      place: typeof body.place === "string" ? body.place : null,
      lat: toNumber(body.lat),
      lng: toNumber(body.lng),
    },
  });

  return NextResponse.json(event, { status: 201 });
}
