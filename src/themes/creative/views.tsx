import Link from 'next/link';

export function CreativeHome({ data }: { data: any }) {
  const { featuredProjects, recentArticles, recentJournals, topics, profile } = data;
  const leadProject = featuredProjects[0];

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] font-sans pt-12 pb-24 px-6 md:px-16 lg:px-24">
      {/* Creative Header */}
      <header className="max-w-6xl mx-auto border-b border-[#334155] pb-8 mb-16 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] bg-[#38bdf8]/10 px-3 py-1 rounded-full border border-[#38bdf8]/20">
            {profile?.tagline || "Creative Studio & Research"}
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#f8fafc] mt-3">
            {profile?.name || "Portfolio & Systems"}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto space-y-20">
        {leadProject && (
          <section className="relative overflow-hidden rounded-3xl border border-[#334155] bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-10 md:p-14 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-6 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#38bdf8]">Featured Artifact</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                <Link href={`/work/${leadProject.slug}`} className="hover:text-[#38bdf8] transition-colors">{leadProject.title}</Link>
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {leadProject.shortDescription}
              </p>
              <div>
                <Link href={`/work/${leadProject.slug}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#38bdf8] text-[#0f172a] font-bold text-sm hover:bg-[#7dd3fc] transition-all">
                  Explore Case Study &rarr;
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((t: any) => (
            <div key={t.id} className="p-6 rounded-2xl border border-[#334155] bg-[#1e293b]/50 backdrop-blur-sm space-y-3 hover:border-[#38bdf8] transition-colors">
              <h3 className="font-bold text-lg text-white">{t.name}</h3>
              <p className="text-xs font-mono text-[#38bdf8]">{t._count.projects} records indexed</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export function CreativeJournalArchive({ data }: { data: any }) {
  const { entries } = data;
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] font-sans py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b border-[#334155] pb-8 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#38bdf8]">Chronicle & Logs</span>
          <h1 className="text-5xl font-black tracking-tight">Creative Field Journal</h1>
        </header>

        <div className="space-y-8">
          {entries.map((entry: any) => (
            <div key={entry.id} className="p-8 rounded-2xl border border-[#334155] bg-[#1e293b]/30 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#38bdf8]">
                <span>WEEK {String(entry.weekNumber).padStart(2, '0')}</span>
                <span>{new Date(entry.startDate).toLocaleDateString()}</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{entry.title}</h2>
              {entry.focus && <p className="text-sm text-slate-300">{entry.focus}</p>}
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
