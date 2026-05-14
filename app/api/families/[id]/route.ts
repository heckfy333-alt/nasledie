import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const family = await prisma.person.findMany();

    return NextResponse.json(family);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Ошибка получения семьи",
      },
      {
        status: 500,
      }
    );
  }
}