import { NextResponse } from "next/server";

import { apiError, currentUserId, readJson, toNullableDate, toNumber } from "@/lib/api";
import { prisma } from "@/lib/prisma";

type PersonPayload = {
  name?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  photo?: string;
  biography?: string;
  bio?: string;
  birthDate?: string;
  deathDate?: string;
  birthPlace?: string;
  deathPlace?: string;
  city?: string;
  birthLat?: number | string;
  birthLng?: number | string;
  deathLat?: number | string;
  deathLng?: number | string;
  fatherId?: number | string;
  motherId?: number | string;
  isPublic?: boolean;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  const people = await prisma.person.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { birthPlace: { contains: query, mode: "insensitive" } },
            { deathPlace: { contains: query, mode: "insensitive" } },
            { biography: { contains: query, mode: "insensitive" } },
          ],
        }
      : undefined,
    include: {
      _count: {
        select: {
          events: true,
          memories: true,
          candles: true,
          photos: true,
          voiceMemories: true,
          documents: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(people);
}

export async function POST(request: Request) {
  try {
    const body = await readJson<PersonPayload>(request);
    const ownerId = await currentUserId();
    const name = body.name?.trim() || [body.firstName, body.lastName].filter(Boolean).join(" ").trim();

    if (!name) {
      return apiError("Укажите имя человека");
    }

    const person = await prisma.person.create({
      data: {
        name,
        firstName: body.firstName?.trim() || null,
        lastName: body.lastName?.trim() || null,
        role: body.role?.trim() || null,
        photo: body.photo?.trim() || null,
        biography: body.biography?.trim() || null,
        bio: body.bio?.trim() || body.biography?.trim() || null,
        birthDate: toNullableDate(body.birthDate),
        deathDate: toNullableDate(body.deathDate),
        birthPlace: body.birthPlace?.trim() || null,
        deathPlace: body.deathPlace?.trim() || null,
        city: body.city?.trim() || body.birthPlace?.trim() || null,
        birthLat: toNumber(body.birthLat),
        birthLng: toNumber(body.birthLng),
        deathLat: toNumber(body.deathLat),
        deathLng: toNumber(body.deathLng),
        fatherId: toNumber(body.fatherId),
        motherId: toNumber(body.motherId),
        isPublic: Boolean(body.isPublic),
        ownerId,
      },
    });

    return NextResponse.json(person, { status: 201 });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Не удалось создать страницу", 500);
  }
}
