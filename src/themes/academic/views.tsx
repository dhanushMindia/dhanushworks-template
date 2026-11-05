import Link from 'next/link';

export function AcademicHome({ data }: { data: any }) {
  const { profile, recentJournals = [] } = data;
  const latestJournal = recentJournals[0];

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#111827] font-serif pt-12 pb-24 px-6 md:px-16 lg:px-24">
      <header className="max-w-4xl mx-auto border-b border-[#e5e7eb] pb-8 mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-[#6b7280]">
          {profile?.tagline || "Academic Research & Publications"}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111827] mt-2 font-serif">
          {profile?.name || "Scholarly Portfolio"}
        </h1>
        <p className="mt-3 text-base text-[#4b5563] leading-relaxed max-w-2xl font-serif">
          {profile?.bio || "Empirical research, working papers, and field telemetry."}
        </p>
      </header>

      <main className="max-w-4xl mx-auto space-y-12">
        {latestJournal && (
          <section className="border border-[#e5e7eb] p-8 rounded-none bg-white space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#6b7280]">
              <span>RESEARCH LOG</span>
              <span>WEEK {String(latestJournal.weekNumber).padStart(2, '0')}</span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-[#111827]">
              <Link href="/journal" className="hover:underline">{latestJournal.title}</Link>
            </h2>
            <p className="text-sm text-[#4b5563] font-serif leading-relaxed">
              {latestJournal.focus}
            </p>
            <div>
              <Link href="/journal" className="text-xs font-mono text-blue-600 hover:underline">
                View Full Field Journal &rarr;
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export function AcademicJournalArchive({ data }: { data: any }) {
  const { entries = [] } = data;
  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#111827] font-serif py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="border-b border-[#e5e7eb] pb-6 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#6b7280]">Scholarly Record</span>
          <h1 className="text-4xl font-bold font-serif tracking-tight">Research Field Journal</h1>
        </header>

        <div className="space-y-6">
          {entries.map((entry: any) => (
            <div key={entry.id} className="p-6 border border-[#e5e7eb] bg-white space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#6b7280]">
                <span>WEEK {String(entry.weekNumber).padStart(2, '0')}</span>
                <span>{new Date(entry.startDate).toLocaleDateString()}</span>
              </div>
              <h2 className="text-xl font-bold font-serif text-[#111827]">{entry.title}</h2>
              {entry.focus && <p className="text-sm text-[#4b5563]">{entry.focus}</p>}
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
