export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [
    journalCount,
    mediaCount,
    recentJournalEntries,
  ] = await Promise.all([
    prisma.journalEntry.count(),
    prisma.mediaAsset.count(),
    prisma.journalEntry.findMany({
      take: 5,
      orderBy: { startDate: "desc" },
      select: {
        id: true,
        weekNumber: true,
        startDate: true,
        endDate: true,
        title: true,
        status: true,
        visibility: true,
      },
    }),
  ]);

  const stats = [
    {
      label: "Field Journal Records",
      value: journalCount,
      drafts: 0,
      href: "/admin/journal",
    },
    {
      label: "Archival Media",
      value: mediaCount,
      drafts: 0,
      href: "/admin/media",
    },
  ];

  return (
    <div className="space-y-12">
      <div className="border-b border-structural pb-6">
        <span className="type-metadata text-[var(--text-muted)]">Control Console</span>
        <h1 className="type-display text-4xl text-[var(--text-main)] mt-2 mb-2">
          System Ledger & Content Overview
        </h1>
        <p className="type-body text-base text-[var(--text-muted)]">
          Manage longitudinal research telemetry and archival media assets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="border border-structural hover:border-structural-strong bg-[var(--bg-secondary)]/20 p-6 transition-all group"
          >
            <p className="type-metadata text-[var(--text-muted)] mb-3">
              {stat.label}
            </p>
            <p className="font-serif text-4xl text-[var(--text-main)] mb-2 font-normal">
              {stat.value}
            </p>
            <p className="font-mono text-xs text-[var(--text-faint)]">
              All records synchronized
            </p>
          </Link>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="type-metadata text-[var(--text-muted)]">Direct Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/journal/new"
            className="border border-structural hover:border-structural-strong bg-[var(--bg-primary)] p-6 transition-all hover:bg-[var(--bg-secondary)]/30 group"
          >
            <p className="type-ui font-medium text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors mb-1">
              + New Field Record
            </p>
            <p className="type-metadata text-[var(--text-muted)]">Log longitudinal research week</p>
          </Link>
          <Link
            href="/admin/media"
            className="border border-structural hover:border-structural-strong bg-[var(--bg-primary)] p-6 transition-all hover:bg-[var(--bg-secondary)]/30 group"
          >
            <p className="type-ui font-medium text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors mb-1">
              + Upload Media Asset
            </p>
            <p className="type-metadata text-[var(--text-muted)]">Add archival attachment or document</p>
          </Link>
        </div>
      </div>

      {recentJournalEntries.length > 0 && (
        <div className="border border-structural bg-[var(--bg-secondary)]/10 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-structural pb-4">
            <h2 className="type-heading-2 text-xl text-[var(--text-main)]">
              Recent Operational Logs
            </h2>
            <Link
              href="/admin/journal"
              className="type-metadata text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              Examine Full Journal →
            </Link>
          </div>
          <div className="divide-y divide-structural">
            {recentJournalEntries.map((entry: any) => (
              <Link
                key={entry.id}
                href={`/admin/journal/${entry.id}`}
                className="flex items-center justify-between py-4 hover:bg-[var(--bg-secondary)]/40 px-3 -mx-3 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <span className="type-metadata font-bold text-[var(--text-main)]">
                    WK {entry.weekNumber}
                  </span>
                  <p className="type-ui text-sm text-[var(--text-main)]">
                    {entry.title || "Field Observation"}
                  </p>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {new Date(entry.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    —{" "}
                    {new Date(entry.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex gap-2">
                  <StatusBadge status={entry.status} />
                  <VisibilityBadge visibility={entry.visibility} />
                </div>
              </Link>
            ))}
          </div>
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
