import { NextResponse } from "next/server";

let comments = [
  {
    id: 1,
    personId: 1,
    author: "Александр",
    text: "Помним тебя ❤️",
    createdAt: new Date(),
  },
];

export async function GET() {
  return NextResponse.json(comments);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newComment = {
    id: comments.length + 1,
    personId: body.personId,
    author: body.author,
    text: body.text,
    createdAt: new Date(),
  };

  comments.push(newComment);

  return NextResponse.json(newComment);
}