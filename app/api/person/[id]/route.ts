import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const person = await prisma.person.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        events: true,
        memories: true,
        comments: true,
        candles: true,
      },
    });

    return NextResponse.json(person);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Ошибка получения человека",
      },
      {
        status: 500,
      }
    );
  }
}