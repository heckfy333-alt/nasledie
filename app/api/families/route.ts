import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const families = await prisma.person.findMany();

    return NextResponse.json(families);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Ошибка получения семей",
      },
      {
        status: 500,
      }
    );
  }
}