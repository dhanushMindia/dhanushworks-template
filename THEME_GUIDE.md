# Dhanushworks Portfolio Template — Theme Architecture & Customization Guide

The Dhanushworks Portfolio Template features a modular, theme-agnostic architecture (`src/themes/`) that enables you to instantly switch your professional portfolio's visual identity between four distinctive aesthetic directions while preserving all your core content, CMS data, and database records.

---

## Available Themes

1. **Editorial (`editorial`)**
   - **Vibe:** Sophisticated, literary, and academic review.
   - **Characteristics:** Ivory cream backgrounds (`#fbf9f5`), deep burgundy accents (`#8c3030`), serif typography across headings and body, hairline structural borders, and magazine-inspired mastheads.
   - **Best For:** Researchers, policy analysts, essayists, and quantitative economists.

2. **Minimal (`minimal`)**
   - **Vibe:** Modern, clean, and understated.
   - **Characteristics:** Crisp white backgrounds, neutral slate text, clean sans-serif typography, generous whitespace, and precise border cards.
   - **Best For:** Software engineers, systems architects, and technical writers.

3. **Creative (`creative`)**
   - **Vibe:** Bold, vibrant, and expressive studio.
   - **Characteristics:** Dark slate background (`#0f172a`), electric cyan accents (`#38bdf8`), high-contrast typography, glowing gradient highlights, and asymmetric layout cards.
   - **Best For:** Designers, creative technologists, and experimental builders.

4. **Academic (`academic`)**
   - **Vibe:** Rigorous, scholarly, and formal.
   - **Characteristics:** Light grey-blue background (`#f8fafc`), scholarly navy accents (`#1e40af`), formal serif headings paired with clean sans-serif body text, and structured metadata tables.
   - **Best For:** Academics, university fellows, and empirical researchers.

---

## How It Works

- **Central Registry (`src/themes/registry.ts`)**: Defines theme metadata, color palettes, typography tokens, and configuration definitions for each theme ID.
- **Theme Views (`src/themes/[theme-name]/views.tsx`)**: Dedicated layout views for Homepage, Journal Archive, and Single Journal Detail per theme.
- **Theme Wrapper (`src/themes/ThemeWrapper.tsx`)**: Resolves the active theme and renders the appropriate view components dynamically.
- **Admin Appearance Screen (`/admin/appearance`)**: Allows administrators to preview all four themes live and apply their preferred visual identity with a single click.

---

## Customizing or Adding a New Theme

1. Add your new theme definition to `src/themes/registry.ts`.
2. Create a new directory under `src/themes/my-theme/views.tsx` implementing `Home`, `JournalArchive`, and `JournalDetail` views.
3. Register the views in `src/themes/ThemeWrapper.tsx`.
4. Select your new theme in `/admin/appearance`.
