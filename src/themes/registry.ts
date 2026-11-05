import { ThemeDefinition } from './types';

export const themes: Record<string, ThemeDefinition> = {
  editorial: {
    id: 'editorial',
    name: 'Editorial',
    description: 'Magazine-inspired composition with elegant serif typography, ivory backgrounds, and restrained accents.',
    badge: 'Sophisticated & Literary',
    colors: {
      bgPrimary: '#fbf9f5', // Ivory cream
      bgSecondary: '#f2eee3',
      textMain: '#1a1917',
      textMuted: '#5c5a53',
      accent: '#8c3030', // Deep burgundy
      border: '#e4dccf',
    },
    typography: {
      headingFont: 'font-serif',
      bodyFont: 'font-serif',
    },
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean modern sans-serif typography, monochromatic palette, generous whitespace, and crisp cards.',
    badge: 'Modern & Clean',
    colors: {
      bgPrimary: '#ffffff',
      bgSecondary: '#f8fafc',
      textMain: '#0f172a',
      textMuted: '#64748b',
      accent: '#0f172a',
      border: '#e2e8f0',
    },
    typography: {
      headingFont: 'font-sans',
      bodyFont: 'font-sans',
    },
  },
  creative: {
    id: 'creative',
    name: 'Creative',
    description: 'Expressive typography, strong visual hierarchy, bold accent colors, and asymmetric layouts.',
    badge: 'Vibrant & Bold',
    colors: {
      bgPrimary: '#0f172a', // Dark slate
      bgSecondary: '#1e293b',
      textMain: '#f8fafc',
      textMuted: '#94a3b8',
      accent: '#38bdf8', // Electric blue / cyan
      border: '#334155',
    },
    typography: {
      headingFont: 'font-sans font-extrabold',
      bodyFont: 'font-sans',
    },
  },
  academic: {
    id: 'academic',
    name: 'Academic',
    description: 'Structured, formal research-oriented presentation with rigorous information hierarchy and traditional polish.',
    badge: 'Rigorous & Scholarly',
    colors: {
      bgPrimary: '#f8fafc',
      bgSecondary: '#f1f5f9',
      textMain: '#1e293b',
      textMuted: '#475569',
      accent: '#1e40af', // Scholarly navy
      border: '#cbd5e1',
    },
    typography: {
      headingFont: 'font-serif',
      bodyFont: 'font-sans',
    },
  },
};

export function getTheme(id: string): ThemeDefinition {
  return themes[id] || themes.editorial;
}
