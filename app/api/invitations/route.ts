import { NextResponse } from "next/server";

import { apiError, currentUserId, readJson, toNumber } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const email = new URL(request.url).searchParams.get("email")?.trim();
  const invitations = await prisma.invitation.findMany({
    where: email ? { email } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(invitations);
}

export async function POST(request: Request) {
  const body = await readJson<Record<string, unknown>>(request);

  if (typeof body.email !== "string" || !body.email.includes("@")) {
    return apiError("Укажите email приглашённого родственника");
  }

  const invitation = await prisma.invitation.create({
    data: {
      email: body.email.trim().toLowerCase(),
      personId: toNumber(body.personId),
      senderId: await currentUserId(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    },
  });

  return NextResponse.json(invitation, { status: 201 });
}
