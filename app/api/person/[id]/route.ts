import { NextResponse } from "next/server";

import { apiError, readJson, toNullableDate, toNumber } from "@/lib/api";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const person = await prisma.person.findUnique({
    where: { id: Number(id) },
    include: {
      events: true,
      memories: true,
      comments: true,
      candles: true,
      photos: true,
      voiceMemories: true,
      documents: true,
      father: { select: { id: true, name: true } },
      mother: { select: { id: true, name: true } },
    },
  });

  if (!person) {
    return apiError("Страница памяти не найдена", 404);
  }

  return NextResponse.json(person);
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await readJson<Record<string, unknown>>(request);

  const person = await prisma.person.update({
    where: { id: Number(id) },
    data: {
      name: typeof body.name === "string" ? body.name : undefined,
      role: typeof body.role === "string" ? body.role : undefined,
      photo: typeof body.photo === "string" ? body.photo : undefined,
      biography: typeof body.biography === "string" ? body.biography : undefined,
      bio: typeof body.bio === "string" ? body.bio : undefined,
      birthDate: body.birthDate === undefined ? undefined : toNullableDate(body.birthDate),
      deathDate: body.deathDate === undefined ? undefined : toNullableDate(body.deathDate),
      birthPlace: typeof body.birthPlace === "string" ? body.birthPlace : undefined,
      deathPlace: typeof body.deathPlace === "string" ? body.deathPlace : undefined,
      birthLat: body.birthLat === undefined ? undefined : toNumber(body.birthLat),
      birthLng: body.birthLng === undefined ? undefined : toNumber(body.birthLng),
      fatherId: body.fatherId === undefined ? undefined : toNumber(body.fatherId),
      motherId: body.motherId === undefined ? undefined : toNumber(body.motherId),
    },
  });

  return NextResponse.json(person);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  await prisma.person.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
