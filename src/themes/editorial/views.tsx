import Link from 'next/link';

export function EditorialHome({ data }: { data: any }) {
  const { profile, recentJournals = [] } = data;
  const latestJournals = recentJournals.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#2c2825] font-serif selection:bg-[#d97757] selection:text-white">
      {/* Magazine Masthead */}
      <header className="border-b-2 border-[#2c2825] py-8 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8c6d53]">
            Issue No. 01 &bull; {new Date().getFullYear()}
          </div>
          <div className="font-serif text-3xl md:text-4xl tracking-tight italic">
            {profile?.name || "Alex Rivera"}
          </div>
          <div className="font-sans text-xs uppercase tracking-widest flex items-center gap-6">
            <Link href="/journal" className="hover:text-[#d97757] transition-colors">Journal Archive</Link>
            {profile?.email && <a href={`mailto:${profile.email}`} className="hover:text-[#d97757] transition-colors">Contact</a>}
          </div>
        </div>
      </header>

      {/* Hero Editorial Spread */}
      <section className="max-w-6xl mx-auto py-20 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-[#e6e2d6]">
        <div className="lg:col-span-7 space-y-6">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#d97757] block">
            {profile?.tagline || "Design Engineer & Researcher"}
          </span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.08] text-[#1f1b18]">
            Chronicles of form, code, and investigation.
          </h1>
          <p className="text-lg text-[#5e554b] font-serif leading-relaxed italic max-w-xl">
            {profile?.bio || "Exploring systems architecture, interactive web graphics, and empirical research notes."}
          </p>
        </div>

        <div className="lg:col-span-5 bg-[#eee8dc] p-8 md:p-10 border border-[#dcd6c8] space-y-6 shadow-sm">
          <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-[#2c2825] font-semibold border-b border-[#dcd6c8] pb-3">
            Editorial Directives
          </h3>
          <ul className="space-y-4 font-sans text-xs text-[#5e554b]">
            {profile?.currentFocus?.map((f: string, i: number) => (
              <li key={f} className="flex items-center justify-between border-b border-[#e2dccf] pb-2">
                <span>0{i + 1}. {f}</span>
                <span className="text-[#d97757] font-mono">ACTIVE</span>
              </li>
            )) || (
              <li className="italic">No current directives loaded.</li>
            )}
          </ul>
        </div>
      </section>

      {/* Journal Dispatch Feed */}
      <main className="max-w-6xl mx-auto py-20 px-6 md:px-12 space-y-16">
        <div className="flex items-baseline justify-between border-b border-[#2c2825] pb-4">
          <h2 className="text-3xl font-normal italic">Selected Dispatches</h2>
          <Link href="/journal" className="font-sans text-xs uppercase tracking-widest text-[#d97757] hover:underline">
            View All Archive &rarr;
          </Link>
        </div>

        {latestJournals.length === 0 ? (
          <p className="font-sans text-sm text-[#5e554b] italic">No dispatches published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestJournals.map((entry: any) => (
              <Link
                key={entry.id}
                href="/journal"
                className="group bg-white p-8 border border-[#e2dccf] hover:border-[#2c2825] transition-all space-y-4 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="font-sans text-[10px] uppercase tracking-widest text-[#d97757] flex justify-between">
                    <span>WEEK {String(entry.weekNumber).padStart(2, '0')}</span>
                    <span>{new Date(entry.startDate).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-[#1f1b18] group-hover:underline leading-snug">
                    {entry.title}
                  </h3>
                  {entry.focus && (
                    <p className="font-serif text-sm text-[#5e554b] line-clamp-3 leading-relaxed">
                      {entry.focus}
                    </p>
                  )}
                </div>
                <div className="font-sans text-xs uppercase tracking-wider text-[#d97757] pt-4 border-t border-[#f2ede4]">
                  Read Essay &rarr;
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export function EditorialJournalArchive({ data }: { data: any }) {
  const { entries = [] } = data;
  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#2c2825] font-serif py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="border-b-2 border-[#2c2825] pb-10 text-center space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#d97757]">Complete Chronology</span>
          <h1 className="text-5xl md:text-6xl font-light italic">The Editorial Journal</h1>
          <p className="font-serif text-sm text-[#5e554b] italic max-w-lg mx-auto">
            Essays, field notes, and architectural logs published weekly.
          </p>
        </header>

        <div className="space-y-16">
          {entries.map((entry: any) => (
            <article key={entry.id} className="border-b border-[#e2dccf] pb-16 space-y-6">
              <div className="flex items-center justify-between font-sans text-xs uppercase tracking-widest text-[#8c6d53]">
                <span className="font-bold text-[#d97757]">WEEK {String(entry.weekNumber).padStart(2, '0')}</span>
                <span>{new Date(entry.startDate).toLocaleDateString()} &mdash; {new Date(entry.endDate).toLocaleDateString()}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1f1b18]">{entry.title}</h2>
              {entry.focus && <p className="font-serif text-base text-[#5e554b] leading-relaxed italic">{entry.focus}</p>}
              {entry.workCompleted && (
                <div className="bg-white p-6 border border-[#e2dccf] space-y-2 font-sans text-xs text-[#2c2825]">
                  <strong className="uppercase tracking-widest text-[#d97757] block font-mono">Execution Notes</strong>
                  <p className="whitespace-pre-wrap leading-relaxed font-sans">{entry.workCompleted}</p>
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
