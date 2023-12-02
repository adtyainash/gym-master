import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function GET(request: { url: string | URL }) {
  try {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("q");

    let queryOptions = {};
    if (searchQuery) {
      queryOptions = {
        where: {
          OR: [
            { className: { contains: searchQuery, mode: "insensitive" } },
            { instructorName: { contains: searchQuery, mode: "insensitive" } },
          ],
        },
      };
    }

    const classes = await db.gymClass.findMany({
      ...queryOptions,
      include: {
        equipments: true,
      },
    });

    return NextResponse.json(classes);
  } catch (error) {
    console.error("Error fetching records", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
