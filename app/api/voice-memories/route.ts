import { prisma }
from "@/lib/prisma";

import { NextResponse }
from "next/server";

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const memory =
      await prisma.voiceMemory.create({
        data: {
          title:
            body.title,

          audioUrl:
            body.audioUrl,

          personId:
            body.personId,
        },
      });

    return NextResponse.json(
      memory
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Ошибка создания аудио",
      },
      {
        status: 500,
      }
    );
  }
}