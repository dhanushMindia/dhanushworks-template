export type ThemeId = 'editorial' | 'minimal' | 'creative' | 'academic';

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  description: string;
  badge: string;
  colors: {
    bgPrimary: string;
    bgSecondary: string;
    textMain: string;
    textMuted: string;
    accent: string;
    border: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
  };
}
