import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, props: any) {
  const params = await props.params;

  await prisma.person.delete({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.redirect(
    new URL("/people", req.url)
  );
}