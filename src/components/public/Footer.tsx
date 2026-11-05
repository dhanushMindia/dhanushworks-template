import Link from "next/link";
import { prisma } from "@/lib/prisma";

export async function Footer() {
  let profile = null;
  try {
    profile = await prisma.profile.findFirst();
  } catch {}

  const currentYear = new Date().getFullYear();
  const siteName = profile?.name || "Portfolio";
  const email = profile?.email;
  const linkedin = profile?.linkedinUrl;

  return (
    <footer className="border-t border-structural py-12 px-6 md:px-12 lg:px-24 bg-[var(--bg-primary)]">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-serif text-lg text-[var(--text-main)]">{siteName}</span>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            &copy; {currentYear} {siteName}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--text-main)] transition-colors">Home</Link>
          <Link href="/journal" className="hover:text-[var(--text-main)] transition-colors">Journal</Link>
          {email && (
            <a href={`mailto:${email}`} className="hover:text-[var(--text-main)] transition-colors">Email</a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-main)] transition-colors">LinkedIn</a>
          )}
        </div>
      </div>
    </footer>
  );
}
