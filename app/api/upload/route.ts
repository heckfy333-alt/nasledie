import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "audio/mpeg",
  "audio/wav",
  "application/pdf",
]);

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
    }

    if (!allowedTypes.has(file.type)) {
      return NextResponse.json({ error: "Тип файла не поддерживается" }, { status: 415 });
    }

    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: "Файл больше 25 МБ" }, { status: 413 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extension = path.extname(file.name).toLowerCase();
    const filename = `${crypto.randomUUID()}${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
      name: file.name,
      type: file.type,
      size: file.size,
    });
  } catch {
    return NextResponse.json({ error: "Не удалось загрузить файл" }, { status: 500 });
  }
}
