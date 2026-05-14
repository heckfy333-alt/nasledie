import { NextResponse } from "next/server";

const gallery = [
  {
    id: 1,
    personId: 1,
    image: "/photos/Ruslan.jpg",
  },

  {
    id: 2,
    personId: 2,
    image: "/photos/alex.jpg",
  },

  {
    id: 3,
    personId: 3,
    image: "/photos/ulyana.jpg",
  },
];

export async function GET() {
  return NextResponse.json(gallery);
}