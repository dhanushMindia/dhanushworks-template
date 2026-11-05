import Link from 'next/link';

export function CreativeHome({ data }: { data: any }) {
  const { profile, recentJournals = [] } = data;
  const latestJournals = recentJournals.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] font-sans pt-16 pb-24 px-6 md:px-16 lg:px-24">
      {/* Hero Section */}
      <header className="max-w-6xl mx-auto border-b border-[#334155] pb-12 mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] bg-[#38bdf8]/10 px-3 py-1 rounded-full border border-[#38bdf8]/20">
            {profile?.tagline || "Creative Studio & Portfolio"}
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white">
            {profile?.name || "Portfolio"}
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            {profile?.bio || "Building projects, exploring design systems, and sharing continuous updates."}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href="/journal"
            className="px-6 py-3 rounded-full bg-[#38bdf8] text-[#0f172a] font-bold text-sm hover:bg-[#7dd3fc] transition-all text-center"
          >
            Explore Journal &rarr;
          </Link>
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="px-6 py-3 rounded-full border border-[#334155] text-slate-300 hover:text-white hover:border-[#38bdf8] transition-all text-center text-sm font-mono"
            >
              Get in Touch
            </a>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* Focus Areas */}
        {profile?.currentFocus && profile.currentFocus.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profile.currentFocus.map((f: string) => (
              <div key={f} className="p-6 rounded-2xl border border-[#334155] bg-[#1e293b]/50 backdrop-blur-sm space-y-2">
                <h3 className="font-bold text-lg text-white">{f}</h3>
                <p className="text-xs font-mono text-[#38bdf8]">Active Focus</p>
              </div>
            ))}
          </section>
        )}

        {/* Latest Three Journal Entries */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#334155] pb-4">
            <h2 className="text-2xl font-black text-white">Recent Journal Entries</h2>
            <Link href="/journal" className="text-xs font-mono text-[#38bdf8] hover:underline">
              View All ({recentJournals.length}) &rarr;
            </Link>
          </div>

          {latestJournals.length === 0 ? (
            <p className="text-sm text-slate-400">No journal entries published yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestJournals.map((entry: any) => (
                <Link
                  key={entry.id}
                  href="/journal"
                  className="p-6 rounded-2xl border border-[#334155] bg-[#1e293b]/30 hover:border-[#38bdf8] transition-all space-y-4 group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#38bdf8]">
                      WEEK {String(entry.weekNumber).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                      {entry.title}
                    </h3>
                    {entry.focus && (
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {entry.focus}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[#38bdf8] pt-2 border-t border-[#334155]">
                    Read entry &rarr;
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export function CreativeJournalArchive({ data }: { data: any }) {
  const { entries = [] } = data;
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] font-sans py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b border-[#334155] pb-8 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#38bdf8]">Chronicle & Logs</span>
          <h1 className="text-5xl font-black tracking-tight">Journal Archive</h1>
        </header>

        <div className="space-y-8">
          {entries.map((entry: any) => (
            <div key={entry.id} className="p-8 rounded-2xl border border-[#334155] bg-[#1e293b]/30 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#38bdf8]">
                <span>WEEK {String(entry.weekNumber).padStart(2, '0')}</span>
                <span>{new Date(entry.startDate).toLocaleDateString()}</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{entry.title}</h2>
              {entry.focus && <p className="text-sm text-slate-300 leading-relaxed">{entry.focus}</p>}
              {entry.workCompleted && (
                <div className="text-xs font-mono bg-[#0f172a] p-4 rounded-xl border border-[#334155] text-slate-300 whitespace-pre-wrap">
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

export function CreativeJournalDetail({ data }: { data: any }) {
  return <CreativeJournalArchive data={{ entries: [data] }} />;
}
