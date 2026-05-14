import { NextResponse } from "next/server";

const timeline = [
  {
    id: 1,
    personId: 1,
    year: "1989",
    title: "Рождение",
    description: "Родился Руслан.",
  },

  {
    id: 2,
    personId: 1,
    year: "2018",
    title: "Основание семьи",
    description: "Создание семьи и начало новой истории рода.",
  },

  {
    id: 3,
    personId: 1,
    year: "2020",
    title: "Рождение Александра",
    description: "Появление сына Александра.",
  },

  {
    id: 4,
    personId: 1,
    year: "2023",
    title: "Рождение Ульяны",
    description: "Появление дочери Ульяны.",
  },
];

export async function GET() {
  return NextResponse.json(timeline);
}