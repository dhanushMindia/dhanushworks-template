import Link from 'next/link';

export function CreativeHome({ data }: { data: any }) {
  const { profile, recentJournals = [] } = data;
  const latestJournals = recentJournals.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-[#38bdf8] selection:text-[#090d16] relative overflow-hidden">
      {/* Background ambient glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#818cf8]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <header className="relative max-w-7xl mx-auto pt-24 pb-16 px-6 md:px-12 lg:px-16 border-b border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#38bdf8]">
                {profile?.tagline || "Quantitative Finance & Systems Architecture"}
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white font-sans leading-[1.05]">
              {profile?.name || "Dhanush Mendu"}
            </h1>

            <p className="text-slate-400 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
              {profile?.bio || "Engineering high-throughput algorithmic systems, public economic research frameworks, and modern digital interfaces."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3.5 shrink-0">
            <Link
              href="/journal"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#818cf8] text-[#090d16] font-extrabold text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-[#38bdf8]/20 text-center flex items-center justify-center gap-2 group"
            >
              Explore Journal Archive
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 text-slate-200 hover:text-white transition-all text-center text-sm font-mono tracking-wider uppercase"
              >
                Direct Contact
              </a>
            )}
          </div>
        </div>

        {/* Live Metrics / Quick Stats Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-12 border-t border-slate-800/60 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <span className="text-slate-500 uppercase block mb-1">Primary Domain</span>
            <span className="text-slate-200 font-bold text-sm">Quantitative Finance</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <span className="text-slate-500 uppercase block mb-1">Architecture</span>
            <span className="text-slate-200 font-bold text-sm">Distributed Systems</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <span className="text-slate-500 uppercase block mb-1">Status</span>
            <span className="text-[#38bdf8] font-bold text-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" /> Active Research
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <span className="text-slate-500 uppercase block mb-1">Theme System</span>
            <span className="text-slate-200 font-bold text-sm">Obsidian & Neon v2</span>
          </div>
        </div>
      </header>

      {/* Main Content Layout - Bento Grid */}
      <main className="max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-16 space-y-20">
        {/* Core Focus Areas */}
        {profile?.currentFocus && profile.currentFocus.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
                // Core Focus & Methodologies
              </h2>
              <span className="text-xs font-mono text-slate-600">01 / CAPABILITIES</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {profile.currentFocus.map((f: string, idx: number) => (
                <div
                  key={f}
                  className="p-6 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/80 hover:border-[#38bdf8]/50 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-slate-700 group-hover:text-[#38bdf8] transition-colors">
                    0{idx + 1}
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center mb-6 text-[#38bdf8]">
                    ◆
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2 group-hover:text-[#38bdf8] transition-colors">
                    {f}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Rigorous analysis and engineering execution focused on optimal performance and scale.
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Latest Journal Entries - Bento Cards */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Recent Journal Entries</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-[#38bdf8] font-mono text-xs">
                {recentJournals.length} PUBLISHED
              </span>
            </div>
            <Link
              href="/journal"
              className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] hover:text-white transition-colors flex items-center gap-1"
            >
              View Full Archive &rarr;
            </Link>
          </div>

          {latestJournals.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40">
              <p className="text-sm text-slate-400 font-mono">No journal entries published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestJournals.map((entry: any) => (
                <Link
                  key={entry.id}
                  href="/journal"
                  className="p-8 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950 hover:border-[#38bdf8] transition-all space-y-6 group flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] px-3 py-1 rounded-md bg-[#38bdf8]/10 border border-[#38bdf8]/20">
                        WK {String(entry.weekNumber).padStart(2, '0')}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {new Date(entry.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#38bdf8] transition-colors leading-snug">
                      {entry.title}
                    </h3>

                    {entry.focus && (
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {entry.focus}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-[#38bdf8]">
                    <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read dispatch &rarr;
                    </span>
                    <span className="text-slate-600">ENCRYPTED</span>
                  </div>
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
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans py-20 px-6 md:px-12 lg:px-16 relative">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="border-b border-slate-800 pb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[#38bdf8] font-mono text-xs uppercase tracking-widest">
            Chronicle & Research Logs
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white">Journal Archive</h1>
          <p className="text-slate-400 text-sm md:text-base font-mono">
            Chronological documentation of quantitative models, architectural decisions, and weekly findings.
          </p>
        </header>

        <div className="space-y-8">
          {entries.map((entry: any) => (
            <article
              key={entry.id}
              className="p-8 md:p-10 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-md space-y-6 shadow-2xl hover:border-slate-700 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <span className="px-3 py-1 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/20 font-mono text-xs text-[#38bdf8] uppercase tracking-wider font-bold">
                  WEEK {String(entry.weekNumber).padStart(2, '0')}
                </span>
                <span className="font-mono text-xs text-slate-500">
                  {new Date(entry.startDate).toLocaleDateString()} &mdash; {new Date(entry.endDate).toLocaleDateString()}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{entry.title}</h2>

              {entry.focus && (
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  {entry.focus}
                </p>
              )}

              {entry.workCompleted && (
                <div className="p-6 rounded-2xl bg-[#090d16] border border-slate-800/90 space-y-3 font-mono text-xs text-slate-300">
                  <span className="text-[#38bdf8] uppercase tracking-widest block font-bold text-[10px]">
                    // Work Completed & Execution
                  </span>
                  <p className="whitespace-pre-wrap leading-relaxed">{entry.workCompleted}</p>
                </div>
              )}

              {entry.reflection && (
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-3 text-xs text-slate-300">
                  <span className="text-slate-400 uppercase tracking-widest block font-mono text-[10px] font-bold">
                    // Synthesis & Reflections
                  </span>
                  <p className="whitespace-pre-wrap leading-relaxed">{entry.reflection}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CreativeJournalDetail({ data }: { data: any }) {
  return <CreativeJournalArchive data={{ entries: [data] }} />;
}
