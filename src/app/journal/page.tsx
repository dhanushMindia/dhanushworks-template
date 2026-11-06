export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";
import { ThemeWrapper } from "@/themes/ThemeWrapper";

export default async function JournalPage() {
  let entries: any[] = [];
  let profile: any = null;

  try {
    [entries, profile] = await Promise.all([
      prisma.journalEntry.findMany({
        where: { status: "PUBLISHED", visibility: "PUBLIC" },
        orderBy: { startDate: "desc" },
        include: { attachments: true },
      }),
      prisma.profile.findFirst(),
    ]);
  } catch {
    // The themed public archive remains available during initial setup.
  }

  return (
    <ThemeWrapper
      themeId={profile?.theme || "editorial"}
      viewType="journal-archive"
      data={{ entries, profile }}
    />
  );
}
