'use client';

import { useState, useEffect } from 'react';
import { themes } from '@/themes/registry';
import { ThemeWrapper } from '@/themes/ThemeWrapper';

export default function AdminAppearancePage() {
  const [selectedTheme, setSelectedTheme] = useState('editorial');
  const [activeTab, setActiveTab] = useState<'preview' | 'settings'>('preview');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Fetch current theme preference from profile API
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data?.theme) {
          setSelectedTheme(data.theme);
        }
      })
      .catch(() => {});
  }, []);

  const handleSaveTheme = async (themeId: string) => {
    setSelectedTheme(themeId);
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: themeId }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch {}
  };

  const sampleData = {
    profile: {
      name: "Dr. A. Vance",
      tagline: "Public Economics & Fiscal Policy",
      bio: "Quantitative empirical research on state liabilities, tax incidence, and economic resilience.",
    },
    featuredProjects: [
      {
        id: "proj-1",
        slug: "fiscal-resilience-index",
        title: "Subnational Fiscal Resilience Index",
        shortDescription: "An empirical examination of municipal bond yields, debt-to-revenue ratios, and fiscal stress indicators across 50 state jurisdictions.",
        topics: [{ topicId: "t1", topic: { name: "Public Finance" } }],
      }
    ],
    recentArticles: [],
    recentJournals: [
      {
        id: "j-1",
        weekNumber: 14,
        title: "Model Calibration & Tax Elasticity Estimation",
        focus: "Synthesizing state revenue regressions with instrumental variables.",
        startDate: new Date().toISOString(),
      }
    ],
    topics: [
      { id: "t1", name: "Public Finance", _count: { projects: 12, articles: 5 } },
      { id: "t2", name: "Labor Economics", _count: { projects: 8, articles: 3 } },
      { id: "t3", name: "Monetary Policy", _count: { projects: 6, articles: 4 } },
    ]
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-structural pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[var(--text-main)]">
            Appearance & Theme Registry
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Choose and preview the visual identity and typographic architecture for your portfolio.
          </p>
        </div>
        {saved && (
          <span className="text-xs font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-600 px-3 py-1.5 border border-emerald-500/20 rounded">
            Theme preference saved successfully
          </span>
        )}
      </div>

      {/* Theme selection cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.values(themes).map((theme) => {
          const isSelected = selectedTheme === theme.id;
          return (
            <div
              key={theme.id}
              onClick={() => handleSaveTheme(theme.id)}
              className={`cursor-pointer rounded-xl border p-6 transition-all flex flex-col justify-between ${
                isSelected
                  ? "border-black dark:border-white ring-2 ring-blue-500 bg-[var(--bg-secondary)] shadow-md"
                  : "border-structural hover:border-structural-strong bg-[var(--bg-primary)]"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest px-2.5 py-1 bg-[var(--bg-secondary)] border border-structural rounded">
                    {theme.badge}
                  </span>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[var(--text-main)]">{theme.name}</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">{theme.description}</p>
                </div>

                {/* Color Palette Preview */}
                <div className="flex items-center gap-2 pt-2">
                  <span className="w-5 h-5 rounded-full border border-black/10" style={{ backgroundColor: theme.colors.bgPrimary }} title="Primary BG" />
                  <span className="w-5 h-5 rounded-full border border-black/10" style={{ backgroundColor: theme.colors.bgSecondary }} title="Secondary BG" />
                  <span className="w-5 h-5 rounded-full border border-black/10" style={{ backgroundColor: theme.colors.accent }} title="Accent" />
                  <span className="w-5 h-5 rounded-full border border-black/10" style={{ backgroundColor: theme.colors.textMain }} title="Text Main" />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-structural flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--text-muted)]">Active: {isSelected ? "Yes" : "Click to apply"}</span>
                <span className="text-xs font-semibold text-[var(--text-main)] underline">Select &rarr;</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Theme Preview Section */}
      <div className="space-y-4 pt-6 border-t border-structural">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-serif font-bold text-[var(--text-main)]">Live Theme Preview</h2>
            <p className="text-xs text-[var(--text-muted)]">Showing homepage rendering under <strong className="uppercase">{selectedTheme}</strong> theme.</p>
          </div>
          <span className="text-xs font-mono bg-blue-500/10 text-blue-600 px-3 py-1 rounded border border-blue-500/20">
            Preview Mode: {selectedTheme}
          </span>
        </div>

        <div className="border-2 border-dashed border-structural rounded-2xl overflow-hidden bg-[var(--bg-secondary)]/20 p-4">
          <div className="border border-structural rounded-xl overflow-hidden shadow-2xl bg-white">
            <ThemeWrapper themeId={selectedTheme} viewType="home" data={sampleData} />
          </div>
        </div>
      </div>
    </div>
  );
}
