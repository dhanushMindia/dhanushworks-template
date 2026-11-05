import Link from 'next/link';

export function MinimalHome({ data }: { data: any }) {
  const { profile, recentJournals = [] } = data;
  const latestJournals = recentJournals.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-black font-sans pt-16 pb-24 px-6 md:px-16 lg:px-24">
      {/* Hero Section */}
      <header className="max-w-4xl mx-auto border-b border-black pb-12 mb-16 space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
          {profile?.tagline || "Professional Portfolio & Journal"}
        </span>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight text-black">
          {profile?.name || "Portfolio"}
        </h1>
        <p className="text-base text-neutral-600 max-w-2xl leading-relaxed">
          {profile?.bio || "A clean, minimal space documenting projects, research notes, and journal entries."}
        </p>
        <div className="pt-2 flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-black">
          <Link href="/journal" className="hover:underline">Journal Archive &rarr;</Link>
          {profile?.email && <a href={`mailto:${profile.email}`} className="hover:underline">Email</a>}
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-16">
        {/* Profile Focus */}
        {profile?.currentFocus && profile.currentFocus.length > 0 && (
          <section className="border-t border-neutral-200 pt-8 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500">Focus Areas</h2>
            <div className="flex flex-wrap gap-2">
              {profile.currentFocus.map((f: string) => (
                <span key={f} className="text-xs font-mono px-2.5 py-1 bg-neutral-100 text-black border border-neutral-200">
                  {f}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Latest Three Journal Entries */}
        <section className="space-y-6 border-t border-neutral-200 pt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500">Recent Journal Entries</h2>
            <Link href="/journal" className="font-mono text-xs uppercase hover:underline">View All &rarr;</Link>
          </div>

          {latestJournals.length === 0 ? (
            <p className="text-sm text-neutral-500">No journal entries published yet.</p>
          ) : (
            <div className="space-y-6">
              {latestJournals.map((entry: any) => (
                <Link
                  key={entry.id}
                  href="/journal"
                  className="block p-6 border border-neutral-200 hover:border-black transition-colors space-y-2 group"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                    <span>WEEK {String(entry.weekNumber).padStart(2, '0')}</span>
                    <span>{new Date(entry.startDate).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-medium text-black group-hover:underline">{entry.title}</h3>
                  {entry.focus && <p className="text-sm text-neutral-600 line-clamp-2">{entry.focus}</p>}
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export function MinimalJournalArchive({ data }: { data: any }) {
  const { entries = [] } = data;
  return (
    <div className="min-h-screen bg-white text-black font-sans py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="border-b border-black pb-8 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Chronology</span>
          <h1 className="text-4xl font-light tracking-tight">Journal Archive</h1>
        </header>

        <div className="space-y-8">
          {entries.map((entry: any) => (
            <article key={entry.id} className="border-b border-neutral-200 pb-8 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
                <span>WEEK {String(entry.weekNumber).padStart(2, '0')}</span>
                <span>{new Date(entry.startDate).toLocaleDateString()}</span>
              </div>
              <h2 className="text-2xl font-medium text-black">{entry.title}</h2>
              {entry.focus && <p className="text-sm text-neutral-700 leading-relaxed">{entry.focus}</p>}
              {entry.workCompleted && (
                <div className="text-xs font-mono bg-neutral-50 p-4 border border-neutral-200 text-neutral-800 whitespace-pre-wrap">
                  {entry.workCompleted}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MinimalJournalDetail({ data }: { data: any }) {
  return <MinimalJournalArchive data={{ entries: [data] }} />;
}
