import Link from 'next/link';

export function EditorialHome({ data }: { data: any }) {
  const { featuredProjects, recentArticles, recentJournals, topics, profile } = data;
  const leadProject = featuredProjects[0];
  const latestJournal = recentJournals[0];

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1a1917] font-serif pt-12 pb-24 px-6 md:px-16 lg:px-24">
      {/* Editorial Header / Masthead */}
      <header className="max-w-6xl mx-auto border-b-2 border-[#1a1917] pb-8 mb-16 text-center">
        <div className="text-xs uppercase tracking-widest text-[#5c5a53] mb-3">
          {profile?.tagline || "Independent Research & Public Policy Review"}
        </div>
        <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-[#1a1917] mb-4 font-serif">
          {profile?.name || "Research Monograph"}
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-[#5c5a53] italic leading-relaxed">
          {profile?.bio || "Systematic empirical investigation into public economics, fiscal policy, and quantitative analysis."}
        </p>
      </header>

      {/* Featured Lead Story / Dossier */}
      <main className="max-w-6xl mx-auto space-y-20">
        {leadProject && (
          <section className="border border-[#e4dccf] bg-[#f2eee3]/50 p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest px-3 py-1 bg-[#8c3030] text-[#fbf9f5] font-sans">
                Lead Investigation
              </span>
              <h2 className="text-3xl md:text-4xl text-[#1a1917] leading-tight font-serif hover:text-[#8c3030] transition-colors">
                <Link href={`/work/${leadProject.slug}`}>{leadProject.title}</Link>
              </h2>
              <p className="text-base text-[#5c5a53] leading-relaxed font-serif">
                {leadProject.shortDescription}
              </p>
              <div>
                <Link href={`/work/${leadProject.slug}`} className="text-xs uppercase tracking-widest text-[#8c3030] font-sans font-semibold underline underline-offset-4">
                  Read full dossier &rarr;
                </Link>
              </div>
            </div>
            <div className="md:col-span-5 border-l border-[#e4dccf] pl-0 md:pl-8 space-y-4">
              <div className="text-xs uppercase tracking-widest text-[#5c5a53]">Metadata</div>
              <div className="space-y-2 text-sm text-[#1a1917]">
                <p><strong>Domain:</strong> Public Finance</p>
                <p><strong>Status:</strong> Peer Verified</p>
                <p><strong>Records:</strong> {featuredProjects.length} Dossiers</p>
              </div>
            </div>
          </section>
        )}

        {/* Journal Section */}
        {latestJournal && (
          <section className="border-y border-[#1a1917] py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline">
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-widest text-[#8c3030] font-sans font-semibold">Field Note / Weekly Ledger</span>
              <div className="text-4xl md:text-5xl font-serif mt-2">WK {latestJournal.weekNumber}</div>
            </div>
            <div className="md:col-span-6 space-y-4">
              <h3 className="text-2xl md:text-3xl font-serif text-[#1a1917]">
                <Link href="/journal" className="hover:underline">{latestJournal.title}</Link>
              </h3>
              <p className="text-sm text-[#5c5a53] italic leading-relaxed">{latestJournal.focus}</p>
            </div>
            <div className="md:col-span-2 text-right">
              <Link href="/journal" className="text-xs uppercase tracking-widest text-[#1a1917] underline font-sans">
                Full Archive
              </Link>
            </div>
          </section>
        )}

        {/* Topics / Domains */}
        <section className="space-y-6">
          <div className="border-b border-[#1a1917] pb-2">
            <h3 className="text-xs uppercase tracking-widest text-[#5c5a53]">Research Taxonomy</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topics.map((t: any) => (
              <div key={t.id} className="border border-[#e4dccf] p-6 bg-[#fbf9f5]">
                <h4 className="font-serif text-xl text-[#1a1917] mb-2">{t.name}</h4>
                <p className="text-xs text-[#5c5a53] font-sans">{t._count.projects} projects / {t._count.articles} articles</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export function EditorialJournalArchive({ data }: { data: any }) {
  const { entries } = data;
  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1a1917] font-serif py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b-2 border-[#1a1917] pb-8 text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#8c3030] font-sans">Continuous Chronology</span>
          <h1 className="text-5xl font-normal font-serif">Research Journal & Field Ledger</h1>
          <p className="text-[#5c5a53] italic">Chronicle of weekly objectives, empirical execution, and analytical takeaways.</p>
        </header>

        <div className="space-y-16">
          {entries.map((entry: any) => (
            <article key={entry.id} className="border-b border-[#e4dccf] pb-12 space-y-6">
              <div className="flex items-baseline justify-between font-sans text-xs text-[#5c5a53]">
                <span className="uppercase tracking-widest font-semibold text-[#8c3030]">Week {String(entry.weekNumber).padStart(2, '0')}</span>
                <span>{new Date(entry.startDate).toLocaleDateString()}</span>
              </div>
              <h2 className="text-3xl font-serif text-[#1a1917]">
                <a href={`/journal#${entry.weekNumber}`} className="hover:text-[#8c3030]">{entry.title}</a>
              </h2>
              {entry.focus && (
                <div className="p-6 bg-[#f2eee3]/60 border-l-2 border-[#8c3030] space-y-2">
                  <div className="text-xs uppercase tracking-widest font-sans text-[#5c5a53]">Objective & Context</div>
                  <p className="text-sm font-serif leading-relaxed text-[#1a1917]">{entry.focus}</p>
                </div>
              )}
              {entry.workCompleted && (
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-widest font-sans text-[#5c5a53]">Execution & Methodology</div>
                  <p className="text-sm font-serif leading-relaxed text-[#5c5a53] whitespace-pre-wrap">{entry.workCompleted}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EditorialJournalDetail({ data }: { data: any }) {
  return <EditorialJournalArchive data={{ entries: [data] }} />;
}
