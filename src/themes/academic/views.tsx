import Link from 'next/link';

export function AcademicHome({ data }: { data: any }) {
  const { featuredProjects, recentArticles, recentJournals, topics, profile } = data;
  const leadProject = featuredProjects[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans pt-12 pb-24 px-6 md:px-16 lg:px-24">
      {/* Academic Header */}
      <header className="max-w-5xl mx-auto border-b border-[#cbd5e1] pb-8 mb-16 space-y-3">
        <div className="text-xs uppercase tracking-widest text-[#1e40af] font-mono">
          {profile?.tagline || "Academic Research Monograph & Repository"}
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#1e293b]">
          {profile?.name || "Scholarly Portfolio"}
        </h1>
        <p className="max-w-3xl text-sm md:text-base text-[#475569] font-sans leading-relaxed">
          {profile?.bio || "Peer-reviewed research and empirical analysis in public economics, state policy, and quantitative methods."}
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto space-y-16">
        {leadProject && (
          <section className="border border-[#cbd5e1] rounded-lg p-8 bg-white shadow-sm space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-[#1e40af]">
              <span>PRIMARY RESEARCH DOSSIER</span>
              <span>ID: {leadProject.slug}</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#1e293b] tracking-tight">
              <Link href={`/work/${leadProject.slug}`} className="hover:text-[#1e40af] transition-colors">{leadProject.title}</Link>
            </h2>
            <p className="text-[#475569] text-sm md:text-base leading-relaxed font-sans">
              {leadProject.shortDescription}
            </p>
            <div>
              <Link href={`/work/${leadProject.slug}`} className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#1e40af] hover:underline">
                Read Publication &rarr;
              </Link>
            </div>
          </section>
        )}

        <section className="space-y-6">
          <div className="border-b border-[#cbd5e1] pb-2">
            <h3 className="text-xs uppercase tracking-widest text-[#475569] font-mono">Research Fields & Taxonomy</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topics.map((t: any) => (
              <div key={t.id} className="p-6 border border-[#cbd5e1] rounded-lg bg-white space-y-2">
                <h4 className="font-serif font-bold text-lg text-[#1e293b]">{t.name}</h4>
                <p className="text-xs font-mono text-[#1e40af]">{t._count.projects} projects / {t._count.articles} articles</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export function AcademicJournalArchive({ data }: { data: any }) {
  const { entries } = data;
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b border-[#cbd5e1] pb-6 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#1e40af]">Scholarly Chronicle</span>
          <h1 className="text-4xl font-serif font-bold tracking-tight">Research & Project Ledger</h1>
        </header>

        <div className="space-y-8">
          {entries.map((entry: any) => (
            <div key={entry.id} className="p-8 border border-[#cbd5e1] rounded-lg bg-white space-y-4 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-[#1e40af]">
                <span className="font-bold">WEEK {String(entry.weekNumber).padStart(2, '0')}</span>
                <span>{new Date(entry.startDate).toLocaleDateString()}</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#1e293b]">{entry.title}</h2>
              {entry.focus && <p className="text-sm text-[#475569] leading-relaxed">{entry.focus}</p>}
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
