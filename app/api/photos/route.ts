import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const photos =
    await prisma.familyPhoto.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json(photos);
}

export async function POST(
  req: Request
) {
  const body = await req.json();

  const photo =
    await prisma.familyPhoto.create({
      data: {
        imageUrl:
          body.imageUrl,

        personId:
          body.personId,
      },
    });

  return NextResponse.json(photo);
}