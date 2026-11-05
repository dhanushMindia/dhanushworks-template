"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/profile", label: "Site Config" },
  { href: "/admin/appearance", label: "Appearance" },
  { href: "/admin/journal", label: "Journal" },
  { href: "/admin/media", label: "Media" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors border ${
              isActive
                ? "bg-[var(--bg-secondary)] border-structural-strong text-[var(--text-main)] font-bold"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-structural"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
