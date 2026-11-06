import Link from 'next/link';

export function AcademicHome({ data }: { data: any }) {
  const { profile, recentJournals = [] } = data;
  const latestJournals = recentJournals.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-serif selection:bg-blue-600 selection:text-white">
      {/* Academic Header */}
      <header className="border-b border-slate-200 bg-white py-6 px-6 md:px-16 lg:px-24 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="font-serif font-bold text-lg text-slate-900 tracking-tight">
            {profile?.name || "Alex Rivera"} <span className="font-mono text-xs font-normal text-blue-600 ml-2">RESEARCH PORTFOLIO</span>
          </div>
          <nav className="font-mono text-xs uppercase tracking-wider flex items-center gap-6 text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Overview</Link>
            <Link href="/journal" className="hover:text-blue-600 transition-colors">Field Journal</Link>
            {profile?.email && <a href={`mailto:${profile.email}`} className="hover:text-blue-600 transition-colors">Contact</a>}
          </nav>
        </div>
      </header>

      {/* Scholarly Hero */}
      <section className="max-w-5xl mx-auto py-20 px-6 md:px-16 space-y-8 border-b border-slate-200">
        <div className="space-y-4 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded border border-blue-200 inline-block">
            {profile?.tagline || "Design Engineer & Researcher"}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 font-serif leading-tight">
            Scholarly Dispatches & Empirical Field Notes
          </h1>
          <p className="text-lg text-slate-600 font-serif leading-relaxed">
            {profile?.bio || "Exploring systems architecture, interactive web graphics, and empirical research notes."}
          </p>
        </div>

        {/* Research Interests Grid */}
        {profile?.currentFocus && profile.currentFocus.length > 0 && (
          <div className="pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6">
            {profile.currentFocus.map((f: string) => (
              <div key={f} className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm space-y-1">
                <span className="font-mono text-[10px] text-blue-600 uppercase tracking-widest block">Research Interest</span>
                <h3 className="font-serif font-semibold text-slate-900 text-base">{f}</h3>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Main Journal Section */}
      <main className="max-w-5xl mx-auto py-16 px-6 md:px-16 space-y-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-slate-500">Recent Field Notes</h2>
          <Link href="/journal" className="font-mono text-xs text-blue-600 hover:underline uppercase">View All Archive &rarr;</Link>
        </div>

        {latestJournals.length === 0 ? (
          <p className="font-serif text-sm text-slate-500 italic">No field notes published yet.</p>
        ) : (
          <div className="space-y-6">
            {latestJournals.map((entry: any) => (
              <Link
                key={entry.id}
                href="/journal"
                className="block p-8 bg-white border border-slate-200 rounded-xl hover:border-blue-600 transition-all shadow-sm space-y-3 group"
              >
                <div className="flex items-center justify-between font-mono text-xs text-slate-500">
                  <span className="text-blue-700 font-bold">WEEK {String(entry.weekNumber).padStart(2, '0')}</span>
                  <span>{new Date(entry.startDate).toLocaleDateString()}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {entry.title}
                </h3>
                {entry.focus && (
                  <p className="font-serif text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {entry.focus}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export function AcademicJournalArchive({ data }: { data: any }) {
  const { entries = [] } = data;
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-serif py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="border-b border-slate-200 pb-8 space-y-3 bg-white p-8 rounded-xl shadow-sm">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-600">Chronological Repository</span>
          <h1 className="text-4xl font-bold font-serif tracking-tight text-slate-900">Academic Field Journal</h1>
          <p className="font-serif text-sm text-slate-600">Formal weekly progress reports, methodology logs, and outcomes.</p>
        </header>

        <div className="space-y-8">
          {entries.map((entry: any) => (
            <div key={entry.id} className="p-8 bg-white border border-slate-200 rounded-xl shadow-sm space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-slate-500 border-b border-slate-100 pb-3">
                <span className="text-blue-700 font-bold">WEEK {String(entry.weekNumber).padStart(2, '0')}</span>
                <span>{new Date(entry.startDate).toLocaleDateString()} &mdash; {new Date(entry.endDate).toLocaleDateString()}</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-slate-900">{entry.title}</h2>
              {entry.focus && <p className="font-serif text-sm text-slate-700 leading-relaxed">{entry.focus}</p>}
              {entry.workCompleted && (
                <div className="font-mono text-xs bg-slate-50 p-5 rounded-lg border border-slate-200 text-slate-800 whitespace-pre-wrap">
                  <strong className="block text-blue-700 mb-2 uppercase tracking-wider">Methodology & Work Completed</strong>
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
