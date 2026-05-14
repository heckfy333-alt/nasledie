import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const events =
    await prisma.event.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

  return NextResponse.json(events);
}

export async function POST(
  req: Request
) {
  const body = await req.json();

  const event =
    await prisma.event.create({
      data: {
        year: body.year,

        title: body.title,

        description:
          body.description,

        personId:
          body.personId,
      },
    });

  return NextResponse.json(event);
}