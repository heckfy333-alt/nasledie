import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({
        success: false,
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = Date.now() + "-" + file.name;

    const uploadPath = path.join(
      process.cwd(),
      "public/uploads",
      fileName
    );

    await writeFile(uploadPath, buffer);

    return NextResponse.json({
      success: true,
      path: "/uploads/" + fileName,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
    });
  }
}