import { NextResponse } from "next/server";

const videos = [
  {
    id: 1,
    personId: 1,
    title: "Семейное видео",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export async function GET() {
  return NextResponse.json(videos);
}