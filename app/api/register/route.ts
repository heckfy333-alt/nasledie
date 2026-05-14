import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {
  const body = await req.json();

  const exists =
    await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

  if (exists) {
    return NextResponse.json({
      error:
        "Пользователь уже существует",
    });
  }

  const user =
    await prisma.user.create({
      data: {
        email: body.email,

        password:
          body.password,

        name: body.name,
      },
    });

  return NextResponse.json(user);
}