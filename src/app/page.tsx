export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";
import { ThemeWrapper } from "@/themes/ThemeWrapper";

export default async function HomePage() {
  let profile = null;
  let recentJournals: any[] = [];

  try {
    [profile, recentJournals] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.journalEntry.findMany({
        where: {
          status: "PUBLISHED",
          visibility: "PUBLIC",
        },
        orderBy: {
          weekNumber: "desc",
        },
        take: 6,
      }),
    ]);
  } catch {
    // Fallback for uninitialized database
  }

  const themeId = profile?.theme || 'editorial';

  const data = {
    profile,
    recentJournals,
  };

  return <ThemeWrapper themeId={themeId} viewType="home" data={data} />;
}
