import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ProjectStatus, Visibility } from "@prisma/client";

export async function GET(request: NextRequest) {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] });
  }

  const searchTerm = query.trim();

  const visibilityFilter: any = isAuthenticated
    ? {}
    : { status: ProjectStatus.PUBLISHED, visibility: Visibility.PUBLIC };

  try {
    const journalEntries = await prisma.journalEntry.findMany({
      where: {
        ...visibilityFilter,
        OR: [
          { title: { contains: searchTerm, mode: "insensitive" } },
          { focus: { contains: searchTerm, mode: "insensitive" } },
          { workCompleted: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      take: 10,
    });

    const results = journalEntries.map((j) => ({
      type: "journal",
      id: j.id,
      title: j.title || `Week ${j.weekNumber}`,
      description: j.focus || j.workCompleted,
      href: `/journal#${j.weekNumber}`,
    }));

    return NextResponse.json({ results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
