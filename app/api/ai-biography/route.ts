import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const text = `
${body.name} оставил след в истории своей семьи.

Родился в ${body.birthPlace || "неизвестном месте"}.

На протяжении жизни происходили важные события,
которые сформировали судьбу человека и память о нем.

${body.bio || ""}

Память о человеке сохранена в цифровом архиве «Наследие».
`;

  return NextResponse.json({
    biography: text,
  });
}