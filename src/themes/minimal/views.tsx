import Link from 'next/link';

export function MinimalHome({ data }: { data: any }) {
  const { profile, recentJournals = [] } = data;
  const latestJournals = recentJournals.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Clean Grid Header */}
      <header className="border-b border-neutral-200 py-6 px-6 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="font-mono text-xs tracking-tight uppercase font-medium">
            {profile?.name || "Alex Rivera"} // PORTFOLIO
          </div>
          <nav className="flex items-center gap-8 font-mono text-xs text-neutral-600 uppercase">
            <Link href="/" className="hover:text-black transition-colors">Index</Link>
            <Link href="/journal" className="hover:text-black transition-colors">Journal</Link>
            {profile?.email && <a href={`mailto:${profile.email}`} className="hover:text-black transition-colors">Contact</a>}
          </nav>
        </div>
      </header>

      {/* Hero Grid */}
      <section className="max-w-5xl mx-auto py-24 px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-neutral-200">
        <div className="md:col-span-8 space-y-6">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block">
            {profile?.tagline || "Design Engineer & Researcher"}
          </span>
          <h1 className="text-4xl md:text-6xl font-normal tracking-tight text-black leading-tight">
            {profile?.bio || "Exploring systems architecture, interactive web graphics, and empirical research notes."}
          </h1>
        </div>

        <div className="md:col-span-4 border-l border-neutral-200 pl-8 space-y-6 flex flex-col justify-between font-mono text-xs">
          <div className="space-y-3">
            <span className="text-neutral-400 uppercase tracking-wider block">Directives</span>
            <ul className="space-y-2 text-neutral-800">
              {profile?.currentFocus?.map((f: string) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full" />
                  <span>{f}</span>
                </li>
              )) || <li>General Systems</li>}
            </ul>
          </div>
          <div className="pt-6 border-t border-neutral-100">
            <span className="text-neutral-400 uppercase tracking-wider block">Status</span>
            <span className="text-emerald-600 font-bold mt-1 block">● System Operational</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-20 px-6 md:px-12 space-y-16">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4 font-mono text-xs text-neutral-500 uppercase tracking-widest">
          <span>Recent Journal Entries</span>
          <Link href="/journal" className="hover:text-black transition-colors">View All &rarr;</Link>
        </div>

        {latestJournals.length === 0 ? (
          <p className="font-mono text-xs text-neutral-500">No entries published.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestJournals.map((entry: any) => (
              <Link
                key={entry.id}
                href="/journal"
                className="p-6 border border-neutral-200 bg-neutral-50/50 hover:bg-white hover:border-black transition-all space-y-4 group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider flex justify-between">
                    <span>WK {String(entry.weekNumber).padStart(2, '0')}</span>
                    <span>{new Date(entry.startDate).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-lg font-medium text-black group-hover:underline">
                    {entry.title}
                  </h3>
                  {entry.focus && (
                    <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                      {entry.focus}
                    </p>
                  )}
                </div>
                <div className="font-mono text-[10px] uppercase text-neutral-500 pt-3 border-t border-neutral-100">
                  Read &rarr;
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export function MinimalJournalArchive({ data }: { data: any }) {
  const { entries = [] } = data;
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans py-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-3xl mx-auto space-y-16">
        <header className="border-b border-neutral-200 pb-8 space-y-3 font-mono">
          <span className="text-xs text-neutral-400 uppercase tracking-widest">Archive Index</span>
          <h1 className="text-4xl font-normal text-black tracking-tight font-sans">Journal Entries</h1>
        </header>

        <div className="space-y-12 font-sans">
          {entries.map((entry: any) => (
            <article key={entry.id} className="border-b border-neutral-200 pb-12 space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
                <span>WEEK {String(entry.weekNumber).padStart(2, '0')}</span>
                <span>{new Date(entry.startDate).toLocaleDateString()}</span>
              </div>
              <h2 className="text-2xl font-medium text-black">{entry.title}</h2>
              {entry.focus && <p className="text-sm text-neutral-700 leading-relaxed">{entry.focus}</p>}
              {entry.workCompleted && (
                <div className="font-mono text-xs bg-neutral-50 p-5 border border-neutral-200 text-neutral-800 whitespace-pre-wrap">
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
