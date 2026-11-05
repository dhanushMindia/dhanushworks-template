import Link from 'next/link';

export function EditorialHome({ data }: { data: any }) {
  const { profile, recentJournals = [] } = data;
  const latestJournal = recentJournals[0];

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1a1917] font-serif pt-12 pb-24 px-6 md:px-16 lg:px-24">
      <header className="max-w-6xl mx-auto border-b-2 border-[#1a1917] pb-8 mb-16 text-center">
        <div className="text-xs uppercase tracking-widest text-[#5c5a53] mb-3 font-sans">
          {profile?.tagline || "Independent Research & Public Policy Review"}
        </div>
        <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-[#1a1917] mb-4 font-serif">
          {profile?.name || "Research Monograph"}
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-[#5c5a53] italic leading-relaxed">
          {profile?.bio || "Systematic empirical investigation into public economics, fiscal policy, and quantitative analysis."}
        </p>
        <div className="mt-6 flex justify-center gap-6 font-sans text-xs uppercase tracking-widest text-[#8c3030]">
          <Link href="/journal" className="hover:underline">Field Journal →</Link>
          {profile?.email && <a href={`mailto:${profile.email}`} className="hover:underline">Contact</a>}
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-16">
        {latestJournal && (
          <section className="border border-[#e4dccf] bg-[#f2eee3]/50 p-8 md:p-12 space-y-6">
            <div className="flex items-center justify-between font-sans text-xs uppercase tracking-widest text-[#8c3030]">
              <span>Latest Research Field Note</span>
              <span>WEEK {String(latestJournal.weekNumber).padStart(2, '0')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-[#1a1917] font-serif leading-tight">
              <Link href="/journal" className="hover:underline">{latestJournal.title}</Link>
            </h2>
            <p className="text-base text-[#5c5a53] leading-relaxed italic">
              {latestJournal.focus}
            </p>
            <div>
              <Link href="/journal" className="text-xs uppercase tracking-widest text-[#8c3030] font-sans font-semibold underline underline-offset-4">
                Examine full journal archive &rarr;
              </Link>
            </div>
          </section>
        )}

        {profile?.currentFocus && profile.currentFocus.length > 0 && (
          <section className="border-y border-[#1a1917] py-8 space-y-4 text-center">
            <h3 className="text-xs uppercase tracking-widest text-[#5c5a53] font-sans">Current Research Focus & Directives</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {profile.currentFocus.map((f: string) => (
                <span key={f} className="text-xs font-sans px-3 py-1 border border-[#e4dccf] bg-[#f2eee3] text-[#1a1917]">
                  {f}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export function EditorialJournalArchive({ data }: { data: any }) {
  const { entries = [] } = data;
  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1a1917] font-serif py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b-2 border-[#1a1917] pb-8 text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#8c3030] font-sans">Continuous Chronology</span>
          <h1 className="text-5xl font-normal tracking-tight">Research Field Journal</h1>
          <p className="text-sm text-[#5c5a53] italic">Weekly empirical logs, institutional findings, and working notes.</p>
        </header>

        <div className="space-y-12">
          {entries.map((entry: any) => (
            <article key={entry.id} className="border-b border-[#e4dccf] pb-12 space-y-4">
              <div className="flex items-center justify-between font-sans text-xs uppercase tracking-widest text-[#5c5a53]">
                <span className="font-bold text-[#8c3030]">WEEK {String(entry.weekNumber).padStart(2, '0')}</span>
                <span>{new Date(entry.startDate).toLocaleDateString()} — {new Date(entry.endDate).toLocaleDateString()}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-[#1a1917]">{entry.title}</h2>
              {entry.focus && <p className="text-base text-[#5c5a53] leading-relaxed">{entry.focus}</p>}
              {entry.workCompleted && (
                <div className="text-sm text-[#1a1917] bg-[#f2eee3]/40 p-4 border border-[#e4dccf]">
                  <strong className="font-sans text-xs uppercase block text-[#8c3030] mb-1">Methodology & Execution</strong>
                  <p className="whitespace-pre-wrap">{entry.workCompleted}</p>
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
