import Link from 'next/link';

export function EditorialHome({ data }: { data: any }) {
  const { profile, recentJournals = [] } = data;
  const latestJournals = recentJournals.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1a1917] font-serif pt-16 pb-24 px-6 md:px-16 lg:px-24">
      {/* Hero Section */}
      <header className="max-w-5xl mx-auto border-b-2 border-[#1a1917] pb-12 mb-16 text-center space-y-4">
        <div className="text-xs uppercase tracking-widest text-[#5c5a53] font-sans">
          {profile?.tagline || "Professional Portfolio & Journal"}
        </div>
        <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-[#1a1917] font-serif">
          {profile?.name || "Portfolio"}
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-[#5c5a53] italic leading-relaxed">
          {profile?.bio || "Welcome to my digital workspace. Exploring ideas, documenting projects, and sharing weekly journal logs."}
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-6 font-sans text-xs uppercase tracking-widest text-[#8c3030]">
          <Link href="/journal" className="hover:underline font-semibold">Explore Journal Archive →</Link>
          {profile?.email && <a href={`mailto:${profile.email}`} className="hover:underline">Contact</a>}
          {profile?.resumeUrl && <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">Resume</a>}
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-5xl mx-auto space-y-16">
        {/* Profile Introduction / Focus Areas */}
        {profile?.currentFocus && profile.currentFocus.length > 0 && (
          <section className="border border-[#e4dccf] bg-[#f2eee3]/40 p-8 md:p-10 space-y-6">
            <h3 className="font-sans text-xs uppercase tracking-widest text-[#5c5a53] font-semibold border-b border-[#e4dccf] pb-3">
              Core Focus & Areas of Practice
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.currentFocus.map((f: string) => (
                <span key={f} className="text-xs font-sans px-3 py-1.5 border border-[#e4dccf] bg-white text-[#1a1917]">
                  {f}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Latest Three Journal Entries */}
        <section className="space-y-8">
          <div className="flex items-baseline justify-between border-b border-[#1a1917] pb-4">
            <h2 className="text-2xl md:text-3xl font-serif text-[#1a1917]">Latest Journal Entries</h2>
            <Link href="/journal" className="font-sans text-xs uppercase tracking-widest text-[#8c3030] hover:underline">
              View All ({recentJournals.length}) &rarr;
            </Link>
          </div>

          {latestJournals.length === 0 ? (
            <p className="text-sm text-[#5c5a53] italic">No journal entries published yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestJournals.map((entry: any) => (
                <Link
                  key={entry.id}
                  href={`/journal`}
                  className="p-6 border border-[#e4dccf] bg-white hover:border-[#1a1917] transition-all space-y-3 flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-[#8c3030] block">
                      WEEK {String(entry.weekNumber).padStart(2, '0')}
                    </span>
                    <h3 className="font-serif text-xl text-[#1a1917] group-hover:underline">
                      {entry.title}
                    </h3>
                    {entry.focus && (
                      <p className="text-xs text-[#5c5a53] line-clamp-3 leading-relaxed">
                        {entry.focus}
                      </p>
                    )}
                  </div>
                  <span className="font-sans text-[11px] text-[#8c3030] pt-2 border-t border-[#f2eee3]">
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

export function EditorialJournalArchive({ data }: { data: any }) {
  const { entries = [] } = data;
  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1a1917] font-serif py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b-2 border-[#1a1917] pb-8 text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#8c3030] font-sans">Chronological Record</span>
          <h1 className="text-5xl font-normal tracking-tight">Journal Archive</h1>
          <p className="text-sm text-[#5c5a53] italic">Weekly reflections, notes, and project updates.</p>
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
                <div className="text-sm text-[#1a1917] bg-[#f2eee3]/40 p-5 border border-[#e4dccf] space-y-2">
                  <strong className="font-sans text-xs uppercase block text-[#8c3030]">Work Completed & Methodology</strong>
                  <p className="whitespace-pre-wrap leading-relaxed">{entry.workCompleted}</p>
                </div>
              )}
              {entry.reflection && (
                <div className="text-sm text-[#1a1917] bg-white p-5 border border-[#e4dccf] space-y-2">
                  <strong className="font-sans text-xs uppercase block text-[#5c5a53]">Reflections & Learnings</strong>
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

export function EditorialJournalDetail({ data }: { data: any }) {
  return <EditorialJournalArchive data={{ entries: [data] }} />;
}
