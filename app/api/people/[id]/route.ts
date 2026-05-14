import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: any
) {
  try {
    const id = Number(
      context.params.id
    );

    const person =
      await prisma.person.findUnique({
        where: {
          id,
        },
      });

    return NextResponse.json(
      person
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Ошибка сервера",
      },
      {
        status: 500,
      }
    );
  }
}