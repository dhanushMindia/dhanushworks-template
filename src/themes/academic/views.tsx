import Link from 'next/link';

export function AcademicHome({ data }: { data: any }) {
  const { profile, recentJournals = [] } = data;
  const latestJournals = recentJournals.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#111827] font-serif pt-16 pb-24 px-6 md:px-16 lg:px-24">
      {/* Hero Section */}
      <header className="max-w-4xl mx-auto border-b border-[#e5e7eb] pb-12 mb-16 space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#6b7280]">
          {profile?.tagline || "Academic Research & Portfolio"}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#111827] font-serif">
          {profile?.name || "Scholarly Portfolio"}
        </h1>
        <p className="text-base text-[#4b5563] leading-relaxed max-w-2xl font-serif">
          {profile?.bio || "Empirical research, working papers, and weekly field notes."}
        </p>
        <div className="pt-2 flex items-center gap-6 font-mono text-xs text-blue-600">
          <Link href="/journal" className="hover:underline uppercase tracking-wider">Journal Archive &rarr;</Link>
          {profile?.email && <a href={`mailto:${profile.email}`} className="hover:underline uppercase tracking-wider">Contact</a>}
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-16">
        {/* Focus / Directives */}
        {profile?.currentFocus && profile.currentFocus.length > 0 && (
          <section className="border-t border-[#e5e7eb] pt-8 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#6b7280]">Research Focus</h2>
            <div className="flex flex-wrap gap-2">
              {profile.currentFocus.map((f: string) => (
                <span key={f} className="text-xs font-mono px-3 py-1 bg-white border border-[#e5e7eb] text-[#111827]">
                  {f}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Latest Three Journal Entries */}
        <section className="space-y-6 border-t border-[#e5e7eb] pt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#6b7280]">Recent Field Notes</h2>
            <Link href="/journal" className="font-mono text-xs uppercase text-blue-600 hover:underline">View All &rarr;</Link>
          </div>

          {latestJournals.length === 0 ? (
            <p className="text-sm text-[#4b5563] italic">No journal entries published yet.</p>
          ) : (
            <div className="space-y-6">
              {latestJournals.map((entry: any) => (
                <Link
                  key={entry.id}
                  href="/journal"
                  className="block p-6 border border-[#e5e7eb] bg-white hover:border-[#111827] transition-colors space-y-2 group"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#6b7280]">
                    <span>WEEK {String(entry.weekNumber).padStart(2, '0')}</span>
                    <span>{new Date(entry.startDate).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-[#111827] group-hover:underline">{entry.title}</h3>
                  {entry.focus && <p className="text-sm text-[#4b5563] line-clamp-2">{entry.focus}</p>}
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export function AcademicJournalArchive({ data }: { data: any }) {
  const { entries = [] } = data;
  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#111827] font-serif py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="border-b border-[#e5e7eb] pb-8 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#6b7280]">Scholarly Record</span>
          <h1 className="text-4xl font-bold font-serif tracking-tight">Research Field Journal</h1>
        </header>

        <div className="space-y-8">
          {entries.map((entry: any) => (
            <div key={entry.id} className="p-6 border border-[#e5e7eb] bg-white space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#6b7280]">
                <span>WEEK {String(entry.weekNumber).padStart(2, '0')}</span>
                <span>{new Date(entry.startDate).toLocaleDateString()}</span>
              </div>
              <h2 className="text-xl font-bold font-serif text-[#111827]">{entry.title}</h2>
              {entry.focus && <p className="text-sm text-[#4b5563] leading-relaxed">{entry.focus}</p>}
              {entry.workCompleted && (
                <div className="text-xs font-mono bg-[#fcfbf9] p-4 border border-[#e5e7eb] text-[#4b5563] whitespace-pre-wrap">
                  {entry.workCompleted}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AcademicJournalDetail({ data }: { data: any }) {
  return <AcademicJournalArchive data={{ entries: [data] }} />;
}
