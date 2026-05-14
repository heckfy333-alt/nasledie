import { NextResponse } from "next/server";

const persons = [
  {
    id: 1,
    name: "Руслан",
    role: "Основатель семьи",
    image: "/photos/Ruslan.jpg",
    biography:
      "Создатель семьи и хранитель истории рода.",
  },

  {
    id: 2,
    name: "Александр",
    role: "Сын",
    image: "/photos/alex.jpg",
    biography:
      "Продолжатель семейной линии.",
  },

  {
    id: 3,
    name: "Ульяна",
    role: "Дочь",
    image: "/photos/ulyana.jpg",
    biography:
      "Свет семьи и память поколений.",
  },
];

export async function GET() {
  return NextResponse.json(persons);
}