import Link from 'next/link';

const date = (value?: string | Date) => value ? new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date pending';

function Masthead({ name }: { name?: string }) {
  return <header className="border-y-2 border-[#171411] px-5 py-4 md:px-10"><div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5"><Link href="/" className="font-serif text-xl font-black italic tracking-tight md:text-2xl">{name || 'Research Review'}</Link><nav className="flex items-center gap-5 font-sans text-[10px] font-bold uppercase tracking-[.18em] md:gap-8"><Link href="/" className="hover:text-[#a52b2b]">Front page</Link><Link href="/journal" className="hover:text-[#a52b2b]">The archive</Link><Link href="/admin" className="hidden hover:text-[#a52b2b] sm:block">Editor</Link></nav></div></header>;
}

export function EditorialHome({ data }: { data: any }) {
  const { profile, recentJournals = [] } = data;
  const entries = recentJournals.slice(0, 3);
  const focus = profile?.currentFocus || [];

  return <div className="min-h-screen bg-[#f3f0e8] text-[#171411] selection:bg-[#a52b2b] selection:text-white">
    <Masthead name={profile?.name} />
    <main className="mx-auto max-w-[1440px] px-5 md:px-10">
      <section className="grid border-b border-[#171411] lg:grid-cols-12">
        <div className="flex min-h-[490px] flex-col justify-between py-10 lg:col-span-8 lg:pr-12 lg:py-16">
          <div className="flex items-center gap-3 font-sans text-[10px] font-bold uppercase tracking-[.2em] text-[#a52b2b]"><span className="h-px w-9 bg-[#a52b2b]" />Issue / ongoing inquiry</div>
          <div className="max-w-4xl py-12 lg:py-16"><p className="mb-5 font-sans text-xs font-semibold uppercase tracking-[.18em] text-[#655e54]">{profile?.tagline || 'Independent research journal'}</p><h1 className="font-serif text-5xl leading-[.94] tracking-[-.055em] md:text-7xl lg:text-[6.7rem]">{profile?.bio || 'A field journal for careful work and public ideas.'}</h1></div>
          <div className="flex items-end justify-between border-t border-[#bcb5a8] pt-4 font-sans text-xs text-[#655e54]"><span>Published notes, working methods, and evidence.</span><Link href="/journal" className="font-bold uppercase tracking-wider text-[#a52b2b]">Read the archive ↗</Link></div>
        </div>
        <aside className="relative overflow-hidden bg-[#a52b2b] px-7 py-10 text-[#fff9ee] lg:col-span-4 lg:px-10 lg:py-16">
          <div className="absolute -right-12 top-8 h-40 w-40 rounded-full border-[18px] border-[#e7b863]" /><div className="absolute -bottom-16 -left-14 h-52 w-52 rounded-full border border-[#fff9ee]/50" />
          <div className="relative flex h-full flex-col justify-between"><p className="font-sans text-[10px] font-bold uppercase tracking-[.22em]">Editor’s desk</p><div><p className="mb-5 font-serif text-3xl leading-tight">Current lines of inquiry</p><ol className="space-y-4 border-t border-[#fff9ee]/45 pt-5 font-sans text-sm">{focus.length ? focus.slice(0, 4).map((item: string, i: number) => <li key={item} className="grid grid-cols-[2rem_1fr] gap-2"><span className="font-mono text-xs text-[#e7b863]">0{i + 1}</span><span>{item}</span></li>) : <li>Research program in formation.</li>}</ol></div><p className="font-sans text-[10px] uppercase tracking-[.18em] text-[#e7b863]">CSPR / research review</p></div>
        </aside>
      </section>

      <section className="py-14 md:py-20"><div className="mb-10 flex items-end justify-between border-b-2 border-[#171411] pb-3"><div><p className="font-sans text-[10px] font-bold uppercase tracking-[.2em] text-[#a52b2b]">From the notebook</p><h2 className="mt-2 font-serif text-4xl italic md:text-5xl">Latest dispatches</h2></div><Link href="/journal" className="font-sans text-xs font-bold uppercase tracking-wider hover:text-[#a52b2b]">All issues →</Link></div>
      {entries.length ? <div className="grid gap-x-10 gap-y-10 md:grid-cols-12">{entries.map((entry: any, i: number) => <Link key={entry.id} href="/journal" className={`${i === 0 ? 'md:col-span-7 md:row-span-2 bg-[#ddd5c3]' : 'md:col-span-5'} group border-t-4 border-[#171411] p-6 transition-colors hover:bg-[#e7dfcf] md:p-8`}><div className="flex justify-between font-sans text-[10px] font-bold uppercase tracking-[.17em] text-[#a52b2b]"><span>Issue {String(entry.weekNumber).padStart(2, '0')}</span><span>{date(entry.startDate)}</span></div><h3 className={`${i === 0 ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'} mt-12 font-serif leading-[1.02] tracking-tight group-hover:underline`}>{entry.title}</h3>{entry.focus && <p className="mt-5 max-w-xl font-serif text-base leading-relaxed text-[#655e54]">{entry.focus}</p>}<p className="mt-10 font-sans text-[10px] font-bold uppercase tracking-[.18em]">Open story ↗</p></Link>)}</div> : <p className="font-serif text-xl italic text-[#655e54]">The next dispatch is being prepared.</p>}</section>
    </main>
    <footer className="bg-[#171411] px-5 py-7 text-[#f3f0e8] md:px-10"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 font-sans text-[10px] uppercase tracking-[.16em] md:flex-row"><span>{profile?.name || 'Research Review'} — CSPR</span><div className="flex gap-5">{profile?.email && <a href={`mailto:${profile.email}`} className="hover:text-[#e7b863]">Contact</a>}<Link href="/admin" className="hover:text-[#e7b863]">Admin</Link></div></div></footer>
  </div>;
}

export function EditorialJournalArchive({ data }: { data: any }) {
  const { entries = [], profile } = data;
  return <div className="min-h-screen bg-[#f3f0e8] text-[#171411]"><Masthead name={profile?.name} /><main className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-20"><div className="grid border-b-2 border-[#171411] pb-10 lg:grid-cols-12"><div className="lg:col-span-8"><p className="font-sans text-[10px] font-bold uppercase tracking-[.22em] text-[#a52b2b]">Complete publication record</p><h1 className="mt-4 font-serif text-6xl italic tracking-tight md:text-8xl">The Archive</h1></div><p className="self-end pt-6 font-serif text-xl leading-relaxed text-[#655e54] lg:col-span-4">A chronological library of research notes, process, and outcomes.</p></div><div className="divide-y-2 divide-[#171411]">{entries.length ? entries.map((entry: any, i: number) => <article key={entry.id} className="grid gap-6 py-8 md:grid-cols-12 md:py-12"><div className="font-sans text-xs font-bold uppercase tracking-wider text-[#a52b2b] md:col-span-2">No. {String(entry.weekNumber).padStart(2, '0')}<br /><span className="font-normal text-[#655e54]">{date(entry.startDate)}</span></div><div className="md:col-span-7"><h2 className="font-serif text-3xl leading-none md:text-5xl">{entry.title}</h2>{entry.focus && <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-[#655e54]">{entry.focus}</p>}</div><div className="self-end font-sans text-[10px] font-bold uppercase tracking-widest md:col-span-3">{entry.workCompleted ? 'Research note filed' : 'Entry filed'}</div>{i % 3 === 0 && <div className="hidden bg-[#a52b2b] md:col-start-11 md:block" />}</article>) : <p className="py-16 font-serif text-xl italic text-[#655e54]">No published issues yet.</p>}</div></main></div>;
}

export function EditorialJournalDetail({ data }: { data: any }) { return <EditorialJournalArchive data={{ entries: [data] }} />; }
