import { NextResponse } from "next/server";

import { apiError, readJson, toNumber } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const personId = toNumber(new URL(request.url).searchParams.get("personId"));
  const documents = await prisma.document.findMany({
    where: personId ? { personId } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(documents);
}

export async function POST(request: Request) {
  const body = await readJson<Record<string, unknown>>(request);
  const personId = toNumber(body.personId);

  if (!personId || typeof body.title !== "string" || typeof body.fileUrl !== "string") {
    return apiError("Укажите personId, title и fileUrl");
  }

  const document = await prisma.document.create({
    data: {
      personId,
      title: body.title,
      fileUrl: body.fileUrl,
      fileType: typeof body.fileType === "string" ? body.fileType : null,
    },
  });

  return NextResponse.json(document, { status: 201 });
}
