import { prisma } from "@/lib/prisma";

import { NextRequest,
NextResponse }
from "next/server";

export async function GET(
  req: NextRequest
) {
  try {
    const search =
      req.nextUrl.searchParams.get(
        "q"
      );

    if (!search) {
      return NextResponse.json(
        []
      );
    }

    const people =
      await prisma.person.findMany({
        where: {
          OR: [
            {
              name: {
                contains:
                  search,
              },
            },

            {
              birthPlace: {
                contains:
                  search,
              },
            },
          ],
        },
      });

    return NextResponse.json(
      people
    );
  } catch (error) {
    return NextResponse.json(
      [],
      { status: 200 }
    );
  }
}