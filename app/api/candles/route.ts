import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const candles =
    await prisma.candle.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json(candles);
}

export async function POST(
  req: Request
) {
  const body = await req.json();

  const candle =
    await prisma.candle.create({
      data: {
        author: body.author,

        personId:
          body.personId,
      },
    });

  return NextResponse.json(candle);
}