import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message: "Invitations API временно отключен",
  });
}

export async function GET() {
  return NextResponse.json([]);
}