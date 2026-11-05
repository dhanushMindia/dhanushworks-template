export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminJournalPage() {
  const entries = await prisma.journalEntry.findMany({
    orderBy: { startDate: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-[var(--text-main)] mb-2">
            Weekly Journal
          </h1>
          <p className="text-[var(--text-muted)]">
            {entries.length} entr{entries.length !== 1 ? "ies" : "y"}
          </p>
        </div>
        <Link
          href="/admin/journal/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + New Week
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="bg-[var(--bg-primary)] border border-structural rounded-lg p-12 text-center">
          <p className="text-[var(--text-muted)] mb-4">
            No journal entries yet
          </p>
          <Link
            href="/admin/journal/new"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            Log your first week →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <Link
              key={entry.id}
              href={`/admin/journal/${entry.id}`}
              className="block bg-[var(--bg-primary)] border border-structural rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-medium font-mono text-[var(--text-main)] mb-2">
                    {entry.title || `Week ${entry.weekNumber}`}{" "}
                    ({new Date(entry.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    —{" "}
                    {new Date(entry.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })})
                  </h3>
                  {entry.focus && (
                    <p className="text-sm text-[var(--text-muted)] line-clamp-2">
                      {entry.focus}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <StatusBadge status={entry.status} />
                  <VisibilityBadge visibility={entry.visibility} />
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                <span>
                  Updated{" "}
                  {new Date(entry.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isDraft = status === "DRAFT";
  return (
    <span
      className={`font-mono text-[10px] px-2 py-0.5 border uppercase tracking-wider ${
        isDraft
          ? "border-amber-500/40 text-amber-700 dark:text-amber-400 bg-amber-500/10"
          : "border-emerald-500/40 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10"
      }`}
    >
      {status}
    </span>
  );
}

function VisibilityBadge({ visibility }: { visibility: string }) {
  const isPrivate = visibility === "PRIVATE";
  return (
    <span
      className={`font-mono text-[10px] px-2 py-0.5 border uppercase tracking-wider ${
        isPrivate
          ? "border-purple-500/40 text-purple-700 dark:text-purple-400 bg-purple-500/10"
          : "border-blue-500/40 text-blue-700 dark:text-blue-400 bg-blue-500/10"
      }`}
    >
      {visibility}
    </span>
  );
}
