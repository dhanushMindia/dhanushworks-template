import Link from 'next/link';

export function MinimalHome({ data }: { data: any }) {
  const { featuredProjects, recentArticles, recentJournals, topics, profile } = data;
  const leadProject = featuredProjects[0];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pt-12 pb-24 px-6 md:px-16 lg:px-24">
      {/* Header */}
      <header className="max-w-5xl mx-auto border-b border-slate-200 pb-8 mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-slate-500 font-mono">
            {profile?.tagline || "Portfolio & Research"}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mt-1">
            {profile?.name || "Professional Record"}
          </h1>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/work" className="hover:text-slate-900 transition-colors">Work</Link>
          <Link href="/journal" className="hover:text-slate-900 transition-colors">Journal</Link>
          <Link href="/research" className="hover:text-slate-900 transition-colors">Research</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto space-y-16">
        {leadProject && (
          <section className="border border-slate-200 rounded-2xl p-8 bg-slate-50/50 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-3 py-1 bg-slate-900 text-white rounded-full">Featured Project</span>
              <span className="text-xs text-slate-500 font-mono">ID: {leadProject.slug}</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              <Link href={`/work/${leadProject.slug}`} className="hover:text-blue-600 transition-colors">{leadProject.title}</Link>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed max-w-3xl">
              {leadProject.shortDescription}
            </p>
            <div>
              <Link href={`/work/${leadProject.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:gap-3 transition-all">
                View project details &rarr;
              </Link>
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((t: any) => (
            <div key={t.id} className="p-6 border border-slate-200 rounded-xl bg-white space-y-3">
              <h3 className="font-semibold text-slate-900 text-lg">{t.name}</h3>
              <p className="text-xs font-mono text-slate-500">{t._count.projects} projects / {t._count.articles} articles</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export function MinimalJournalArchive({ data }: { data: any }) {
  const { entries } = data;
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b border-slate-200 pb-6 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Chronicle</span>
          <h1 className="text-4xl font-bold tracking-tight">Journal & Activity Logs</h1>
        </header>

        <div className="space-y-8">
          {entries.map((entry: any) => (
            <div key={entry.id} className="p-6 border border-slate-200 rounded-xl bg-slate-50/50 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="font-semibold text-slate-900">WEEK {String(entry.weekNumber).padStart(2, '0')}</span>
                <span>{new Date(entry.startDate).toLocaleDateString()}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{entry.title}</h2>
              {entry.focus && <p className="text-sm text-slate-600">{entry.focus}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MinimalJournalDetail({ data }: { data: any }) {
  return <MinimalJournalArchive data={{ entries: [data] }} />;
}
